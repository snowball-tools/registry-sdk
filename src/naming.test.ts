import assert from 'assert';
import path from 'path';

import { Account } from './account';
import { Registry } from './index';
import { ensureUpdatedConfig, getConfig, getLaconic2Config } from './testing/helper';
import { DENOM } from './constants';

const WATCHER_YML_PATH = path.join(__dirname, './testing/data/watcher.yml');
const { fee: laconic2Fee } = getLaconic2Config();

jest.setTimeout(5 * 60 * 1000);

const { chainId, restEndpoint, gqlEndpoint, privateKey, fee } = getConfig();

const namingTests = () => {
  let registry: Registry;

  let bondId: string;
  let watcher: any;
  let watcherId: string;

  beforeAll(async () => {
    registry = new Registry(gqlEndpoint, restEndpoint, chainId);

    // Create bond.
    bondId = await registry.getNextBondId(privateKey);
    await registry.createBond({ denom: DENOM, amount: '20000' }, privateKey, laconic2Fee);

    // TODO: Implement set record
    // Create watcher.
    // watcher = await ensureUpdatedConfig(WATCHER_YML_PATH);
    // const result = await registry.setRecord(
    //   {
    //     privateKey,
    //     bondId,
    //     record: watcher.record
    //   },
    //   privateKey,
    //   fee
    // );

    // watcherId = result.data.id;
  });

  describe('Authority tests', () => {
    test('Reserve authority.', async () => {
      const authorityName = `laconic-${Date.now()}`;
      await registry.reserveAuthority({ name: authorityName }, privateKey, laconic2Fee);
    });

    describe('With authority reserved', () => {
      let authorityName: string;
      let crn: string;

      beforeAll(async () => {
        authorityName = `laconic-${Date.now()}`;
        crn = `crn://${authorityName}/app/test`;

        await registry.reserveAuthority({ name: authorityName }, privateKey, laconic2Fee);
      });

      test('Lookup authority.', async () => {
        const [record] = await registry.lookupAuthorities([authorityName]);

        expect(record).toBeDefined();
        expect(record.ownerAddress).not.toBe('');
        expect(record.ownerPublicKey).not.toBe('');
        expect(Number(record.height)).toBeGreaterThan(0);
      });

      test('Lookup non existing authority', async () => {
        const [record] = await registry.lookupAuthorities(['does-not-exist']);

        expect(record.ownerAddress).toBe('');
        expect(record.ownerPublicKey).toBe('');
        expect(Number(record.height)).toBe(0);
      });

      // TODO: Implement parse error response
      xtest('Reserve already reserved authority', async () => {
        await expect(registry.reserveAuthority({ name: authorityName }, privateKey, laconic2Fee))
          .rejects.toThrow('Name already reserved.');
      });

      test('Reserve sub-authority.', async () => {
        const subAuthority = `echo.${authorityName}`;
        await registry.reserveAuthority({ name: subAuthority }, privateKey, laconic2Fee);

        const [record] = await registry.lookupAuthorities([subAuthority]);
        expect(record).toBeDefined();
        expect(record.ownerAddress).not.toBe('');
        expect(record.ownerPublicKey).not.toBe('');
        expect(Number(record.height)).toBeGreaterThan(0);
      });

      test('Reserve sub-authority with different owner.', async () => {
        // Create another account, send tx to set public key on the account.
        const mnenonic1 = Account.generateMnemonic();
        const otherAccount1 = await Account.generateFromMnemonic(mnenonic1);
        await otherAccount1.init();
        await registry.sendCoins({ denom: DENOM, amount: '10000', destinationAddress: otherAccount1.address }, privateKey, laconic2Fee);

        const mnenonic2 = Account.generateMnemonic();
        const otherAccount2 = await Account.generateFromMnemonic(mnenonic2);
        await otherAccount2.init();
        await registry.sendCoins({ denom: DENOM, amount: '10000', destinationAddress: otherAccount2.address }, otherAccount1.getPrivateKey(), laconic2Fee);

        const subAuthority = `halo.${authorityName}`;
        await registry.reserveAuthority({ name: subAuthority, owner: otherAccount1.address }, privateKey, laconic2Fee);

        const [record] = await registry.lookupAuthorities([subAuthority]);
        expect(record).toBeDefined();
        expect(record.ownerAddress).toBeDefined();
        expect(record.ownerAddress).toBe(otherAccount1.address);
        expect(record.ownerPublicKey).toBeDefined();
        expect(Number(record.height)).toBeGreaterThan(0);
      });

      // TODO: Implement set record
      xtest('Set name for unbonded authority', async () => {
        assert(watcherId);
        await expect(registry.setName({ crn, cid: watcherId }, privateKey, fee))
          .rejects.toThrow('Authority bond not found.');
      });

      test('Set authority bond', async () => {
        await registry.setAuthorityBond({ name: authorityName, bondId }, privateKey, laconic2Fee);
      });
    });
  });

  // TODO: Implement set record
  xdescribe('Naming tests', () => {
    let authorityName: string;
    let otherAuthorityName: string;
    let otherPrivateKey: string;
    let otherAccount: Account;

    beforeAll(async () => {
      authorityName = `laconic-${Date.now()}`;
      await registry.reserveAuthority({ name: authorityName }, privateKey, laconic2Fee);
      await registry.setAuthorityBond({ name: authorityName, bondId }, privateKey, laconic2Fee);

      // Create another account.
      const mnenonic = Account.generateMnemonic();
      otherAccount = await Account.generateFromMnemonic(mnenonic);
      await registry.sendCoins({ denom: 'aphoton', amount: '1000000000', destinationAddress: otherAccount.formattedCosmosAddress }, privateKey, laconic2Fee);

      otherAuthorityName = `other-${Date.now()}`;
      otherPrivateKey = otherAccount.privateKey.toString('hex');
    });

    test('Set name', async () => {
      const crn = `crn://${authorityName}/app/test1`;

      await registry.setName({ crn, cid: watcherId }, privateKey, fee);

      // Query records should return it (some CRN points to it).
      const [record] = await registry.queryRecords({ type: 'WebsiteRegistrationRecord', version: watcher.record.version });
      expect(record).toBeDefined();
      expect(record.names).toHaveLength(1);

      await registry.deleteName({ crn }, privateKey, fee);
    });

    describe('With name set', () => {
      let crn: string;

      beforeAll(async () => {
        crn = `crn://${authorityName}/app/test2`;
        await registry.setName({ crn, cid: watcherId }, privateKey, fee);
      });

      afterAll(async () => {
        await registry.deleteName({ crn }, privateKey, fee);
      });

      test('Lookup name', async () => {
        const records = await registry.lookupNames([crn]);
        expect(records).toBeDefined();
        expect(records).toHaveLength(1);

        const [{ latest, history }] = records;
        expect(latest).toBeDefined();
        expect(latest.id).toBeDefined();
        expect(latest.id).toBe(watcherId);
        expect(latest.height).toBeDefined();
        expect(history).toBeUndefined();
      });

      test('Resolve name', async () => {
        const records = await registry.resolveNames([crn]);
        expect(records).toBeDefined();
        expect(records).toHaveLength(1);

        const [{ attributes }] = records;
        expect(attributes).toEqual(watcher.record);
      });

      test('Lookup name with history', async () => {
        const updatedWatcher = await ensureUpdatedConfig(WATCHER_YML_PATH);
        const result = await registry.setRecord(
          {
            privateKey,
            bondId,
            record: updatedWatcher.record
          },
          privateKey,
          fee
        );

        const updatedWatcherId = result.data.id;
        await registry.setName({ crn, cid: updatedWatcherId }, privateKey, fee);

        const records = await registry.lookupNames([crn], true);
        expect(records).toHaveLength(1);

        const [{ latest, history }] = records;
        expect(latest).toBeDefined();
        expect(latest.id).toBeDefined();
        expect(latest.id).toBe(updatedWatcherId);
        expect(latest.height).toBeDefined();
        expect(history).toBeDefined();
        expect(history).toHaveLength(1);

        const [oldRecord] = history;
        expect(oldRecord).toBeDefined();
        expect(oldRecord.id).toBeDefined();
        expect(oldRecord.id).toBe(watcherId);
        expect(oldRecord.height).toBeDefined();
      });

      test('Delete name', async () => {
        await registry.deleteName({ crn }, privateKey, fee);

        let records = await registry.lookupNames([crn], true);
        expect(records).toBeDefined();
        expect(records).toHaveLength(1);

        const [{ latest }] = records;
        expect(latest).toBeDefined();
        expect(latest.id).toBeDefined();
        expect(latest.id).toBe('');
        expect(latest.height).toBeDefined();

        // Query records should NOT return it (no CRN points to it).
        records = await registry.queryRecords({ type: 'WebsiteRegistrationRecord', version: watcher.record.version });
        expect(records).toBeDefined();
        expect(records).toHaveLength(0);

        // Query all records should return it (all: true).
        records = await registry.queryRecords({ type: 'WebsiteRegistrationRecord', version: watcher.record.version }, true);
        expect(records).toBeDefined();
        expect(records).toHaveLength(1);
      });

      test('Delete already deleted name', async () => {
        await registry.deleteName({ crn }, privateKey, fee);
        await registry.deleteName({ crn }, privateKey, fee);

        const records = await registry.lookupNames([crn], true);
        expect(records).toBeDefined();
        expect(records).toHaveLength(1);

        const [{ latest }] = records;
        expect(latest).toBeDefined();
        expect(latest.id).toBeDefined();
        expect(latest.id).toBe('');
        expect(latest.height).toBeDefined();
      });
    });

    test('Set name without reserving authority', async () => {
      await expect(registry.setName({ crn: 'crn://not-reserved/app/test', cid: watcherId }, privateKey, fee))
        .rejects.toThrow('Name authority not found.');
    });

    test('Set name for non-owned authority', async () => {
      await registry.sendCoins({ denom: 'aphoton', amount: '1000000000', destinationAddress: otherAccount.formattedCosmosAddress }, privateKey, laconic2Fee);

      // Other account reserves an authority.
      await registry.reserveAuthority({ name: otherAuthorityName }, otherPrivateKey, laconic2Fee);

      // Try setting name under other authority.
      await expect(registry.setName({ crn: `crn://${otherAuthorityName}/app/test`, cid: watcherId }, privateKey, fee)).rejects.toThrow('Access denied.');
    });

    test('Delete name for non-owned authority.', async () => {
      const otherBondId = await registry.getNextBondId(otherPrivateKey);
      await registry.createBond({ denom: 'aphoton', amount: '10000' }, otherPrivateKey, laconic2Fee);
      await registry.setAuthorityBond({ name: otherAuthorityName, bondId: otherBondId }, otherPrivateKey, laconic2Fee);
      await registry.setName({ crn: `crn://${otherAuthorityName}/app/test`, cid: watcherId }, otherPrivateKey, fee);

      // Try deleting name under other authority.
      await expect(registry.deleteName({ crn: `crn://${otherAuthorityName}/app/test` }, privateKey, fee)).rejects.toThrow('Access denied.');
    });

    // TODO: Check later for empty records
    test('Lookup non existing name', async () => {
      const records = await registry.lookupNames(['crn://not-reserved/app/test']);
      expect(records).toBeDefined();
      expect(records).toHaveLength(1);
      const [record] = records;
      expect(record).toBeNull();
    });

    test('Resolve non existing name', async () => {
      const records = await registry.resolveNames(['crn://not-reserved/app/test']);
      expect(records).toBeDefined();
      expect(records).toHaveLength(1);
      const [record] = records;
      expect(record).toBeNull();
    });
  });
};

if (process.env.TEST_AUCTIONS_ENABLED) {
  // Required as jest complains if file has no tests.
  test('skipping naming tests', () => {});
} else {
  describe('Naming', namingTests);
}
