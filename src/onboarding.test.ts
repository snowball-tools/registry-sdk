import { Wallet } from 'ethers';

import { Registry, Account } from './index';
import { getConfig } from './testing/helper';

const { chainId, rpcEndpoint, gqlEndpoint, privateKey, fee } = getConfig();

jest.setTimeout(90 * 1000);

const onboardingTests = () => {
  let registry: Registry;

  beforeAll(async () => {
    registry = new Registry(gqlEndpoint, rpcEndpoint, chainId);
  });

  test('Onboard participant.', async () => {
    const mnenonic = Account.generateMnemonic();
    let wallet = Wallet.fromMnemonic(mnenonic);

    const ethPayload = {
      address: wallet.address,
      msg: 'Message signed by ethereum private key'
    };

    const message = JSON.stringify(ethPayload);

    const ethSignature = await wallet.signMessage(message);

    await registry.onboardParticipant({
      ethPayload,
      ethSignature,
      message: 'Message signed by cosmos private key'
    }, privateKey, fee);

    // TODO: Verify participant getting stored in state
  });
};

describe('Onboarding', onboardingTests);
