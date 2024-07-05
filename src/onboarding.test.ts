import { Wallet } from 'ethers';

import { DirectSecp256k1Wallet } from '@cosmjs/proto-signing';

import { Registry, Account } from './index';
import { getConfig } from './testing/helper';

const { chainId, rpcEndpoint, gqlEndpoint, privateKey, fee } = getConfig();

jest.setTimeout(90 * 1000);

const onboardingTests = () => {
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
      ethSignature
    }, privateKey, fee);
  });

  describe('With participants enrolled', () => {
    test('Query participants.', async () => {
      const account = new Account(Buffer.from(privateKey, 'hex'));
      const cosmosAccount = await DirectSecp256k1Wallet.fromKey(account._privateKey, 'laconic');
      const [cosmosWallet] = await cosmosAccount.getAccounts();

      const expectedParticipants = [
        {
          cosmos_address: cosmosWallet.address,
          ethereum_address: ethWallet.address
        }
      ];
      const participants = await registry.getParticipants();
      expect(participants).toEqual(expectedParticipants);
    });
  });
};

describe('Onboarding', onboardingTests);
