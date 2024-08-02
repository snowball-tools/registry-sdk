import { Wallet } from 'ethers';

import { DirectSecp256k1Wallet, AccountData as CosmosAccount } from '@cosmjs/proto-signing';

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
  let cosmosWallet: CosmosAccount;
  let expectedParticipants: Participant[] = [];

  beforeAll(async () => {
    registry = new Registry(gqlEndpoint, rpcEndpoint, chainId);

    const mnemonic = Account.generateMnemonic();
    ethWallet = Wallet.fromMnemonic(mnemonic);

    const accountWallet = await DirectSecp256k1Wallet.fromKey(Buffer.from(privateKey, 'hex'), 'laconic');
    [cosmosWallet] = await accountWallet.getAccounts();

    expectedParticipants = [
      {
        cosmosAddress: cosmosWallet.address,
        nitroAddress: ethWallet.address,
        role: DUMMY_ROLE,
        kycId: DUMMY_KYC_ID
      }
    ];
  });

  test('Onboard participant.', async () => {
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
    const participants = await registry.getParticipants();
    expect(participants).toEqual(expectedParticipants);
  });

  test('Query participant by address.', async () => {
    const participant = await registry.getParticipantByAddress(cosmosWallet.address);
    expect(participant).toEqual(expectedParticipants[0]);
  });

  test('Query participant by Nitro address.', async () => {
    const participant = await registry.getParticipantByNitroAddress(ethWallet.address);
    expect(participant).toEqual(expectedParticipants[0]);
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
