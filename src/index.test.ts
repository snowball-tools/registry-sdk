import { Account } from './account';
import { DENOM } from './constants';
import { Registry } from './index';
import { getConfig, getLaconic2Config } from './testing/helper';

const { chainId, restEndpoint, gqlEndpoint, privateKey } = getConfig();
const { fee } = getLaconic2Config();

jest.setTimeout(90 * 1000);

const registryTests = () => {
  let registry: Registry;

  beforeAll(async () => {
    registry = new Registry(gqlEndpoint, restEndpoint, chainId);
  });

  test('Get account info.', async () => {
    const account = new Account(Buffer.from(privateKey, 'hex'));
    await account.init();
    const accounts = await registry.getAccounts([account.address]);
    expect(accounts).toHaveLength(1);
    const [accountObj] = accounts;
    expect(accountObj.address).toBe(account.address);
    expect(accountObj.pubKey).toBe(account.encodedPubkey);
    expect(accountObj.number).toBe('0');
    expect(accountObj.sequence).toBeDefined();
    expect(accountObj.balance).toHaveLength(1);
    const [{ type, quantity }] = accountObj.balance;
    expect(type).toBe(DENOM);
    expect(quantity).toBeDefined();
  });

  test('Get account balance.', async () => {
    const mnenonic1 = Account.generateMnemonic();
    const otherAccount = await Account.generateFromMnemonic(mnenonic1);
    await otherAccount.init();
    await registry.sendCoins({ denom: DENOM, amount: '10000', destinationAddress: otherAccount.address }, privateKey, fee);

    const [accountObj] = await registry.getAccounts([otherAccount.address]);
    expect(accountObj).toBeDefined();
    expect(accountObj.address).toBe(otherAccount.address);
    const [{ type, quantity }] = accountObj.balance;
    expect(type).toBe(DENOM);
    expect(quantity).toBe('10000');
  });
};

describe('Registry', registryTests);
