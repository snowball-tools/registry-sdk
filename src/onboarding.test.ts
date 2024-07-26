import { Wallet } from 'ethers';

import { DirectSecp256k1Wallet } from '@cosmjs/proto-signing';

import { Registry, Account } from './index';
import { getConfig } from './testing/helper';
import { Participant } from './proto/cerc/onboarding/v1/onboarding';

const { chainId, rpcEndpoint, gqlEndpoint, privateKey, fee } = getConfig();

jest.setTimeout(90 * 1000);

const DUMMY_ROLE = 'validator';
const DUMMY_KYC_ID = 'dummyKycId';

const onboardingEnabledTests = () => {
  let registry: Registry;
  let ethWallet: Wallet;

  beforeAll(async () => {
    registry = new Registry(gqlEndpoint, rpcEndpoint, chainId);
  });

  test('Onboard participant.', async () => {
    const mnemonic = Account.generateMnemonic();
    ethWallet = Wallet.fromMnemonic(mnemonic);

    const ethPayload = {
      address: ethWallet.address,
      msg: 'Message signed by ethereum private key'
    };

    const message = JSON.stringify(ethPayload);
    const ethSignature = await ethWallet.signMessage(message);

    await registry.onboardParticipant({
      ethPayload,
      ethSignature,
      role: DUMMY_ROLE,
      kycId: DUMMY_KYC_ID
    }, privateKey, fee);
  });

  test('Query participants.', async () => {
    const account = new Account(Buffer.from(privateKey, 'hex'));
    const cosmosAccount = await DirectSecp256k1Wallet.fromKey(account._privateKey, 'laconic');
    const [cosmosWallet] = await cosmosAccount.getAccounts();

    const expectedParticipants: Participant[] = [
      {
        cosmosAddress: cosmosWallet.address,
        nitroAddress: ethWallet.address,
        role: DUMMY_ROLE,
        kycId: DUMMY_KYC_ID
      }
    ];
    const participants = await registry.getParticipants();
    expect(participants).toEqual(expectedParticipants);
  });
};

const onboardingDisabledTests = () => {
  let registry: Registry;
  let ethWallet: Wallet;

  beforeAll(async () => {
    registry = new Registry(gqlEndpoint, rpcEndpoint, chainId);
  });

  test('Error on onboarding attempt.', async () => {
    const errorMsg = 'Validator onboarding is disabled: invalid request';
    const mnemonic = Account.generateMnemonic();
    ethWallet = Wallet.fromMnemonic(mnemonic);

    const ethPayload = {
      address: ethWallet.address,
      msg: 'Message signed by ethereum private key'
    };

    const message = JSON.stringify(ethPayload);
    const ethSignature = await ethWallet.signMessage(message);

    try {
      await registry.onboardParticipant({
        ethPayload,
        ethSignature,
        role: DUMMY_ROLE,
        kycId: DUMMY_KYC_ID
      }, privateKey, fee);
    } catch (error: any) {
      expect(error.toString()).toContain(errorMsg);
    }
  });

  test('No participants onboarded.', async () => {
    const expectedParticipants: Participant[] = [];
    const participants = await registry.getParticipants();
    expect(participants).toMatchObject(expectedParticipants);
  });
};

if (process.env.ONBOARDING_ENABLED !== '1') {
  describe('Onboarding disabled', onboardingDisabledTests);
} else {
  /**
    Running this test requires participants onboarding enabled. In laconicd repo run:

    ONBOARDING_ENABLED=true ./init.sh

    Run test:

    yarn test:onboarding
    */
  describe('Onboarding enabled', onboardingEnabledTests);
}
