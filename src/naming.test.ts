import assert from 'assert';
import path from 'path';

import { Account } from './account';
import { Registry } from './index';
import { ensureUpdatedConfig, getConfig } from './testing/helper';
import { DENOM } from './constants';

const WATCHER_YML_PATH = path.join(__dirname, './testing/data/watcher.yml');

jest.setTimeout(5 * 60 * 1000);

const { chainId, rpcEndpoint, gqlEndpoint, privateKey, fee } = getConfig();

const namingTests = () => {
  let registry: Registry;

  let bondId: string;
  let watcher: any;
  let watcherId: string;

  const mnenonic1 = Account.generateMnemonic();
  let otherAccount1: Account;

  const mnenonic2 = Account.generateMnemonic();
  let otherAccount2: Account;

  beforeAll(async () => {
    registry = new Registry(gqlEndpoint, rpcEndpoint, chainId);

    // Create bond.
    bondId = await registry.getNextBondId(privateKey);
    await registry.createBond({ denom: DENOM, amount: '2000000' }, privateKey, fee);

    // Create watcher.
    watcher = await ensureUpdatedConfig(WATCHER_YML_PATH);
    const result = await registry.setRecord(
      {
        privateKey,
        bondId,
        record: watcher.record
      },
      privateKey,
      fee
    );

    watcherId = result.id;

    otherAccount1 = await Account.generateFromMnemonic(mnenonic1);
    await otherAccount1.init();

    otherAccount2 = await Account.generateFromMnemonic(mnenonic2);
    await otherAccount2.init();
  });

  describe('Authority tests', () => {
    test('Reserve authority.', async () => {
      const authorityName = `laconic-${Date.now()}`;
      await registry.reserveAuthority({ name: authorityName }, privateKey, fee);
    });

    describe('With authority reserved', () => {
      let authorityName: string;
      let lrn: string;

      beforeAll(async () => {
        authorityName = `laconic-${Date.now()}`;
        lrn = `lrn://${authorityName}/app/test`;

        await registry.reserveAuthority({ name: authorityName }, privateKey, fee);
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
        expect(record).toBe(null);
      });

      test('Reserve already reserved authority', async () => {
        await expect(registry.reserveAuthority({ name: authorityName }, privateKey, fee))
          .rejects.toThrow('Name already reserved.');
      });

      test('Reserve sub-authority.', async () => {
        const subAuthority = `echo.${authorityName}`;
        await registry.reserveAuthority({ name: subAuthority }, privateKey, fee);

        const [record] = await registry.lookupAuthorities([subAuthority]);
        expect(record).toBeDefined();
        expect(record.ownerAddress).not.toBe('');
        expect(record.ownerPublicKey).not.toBe('');
        expect(Number(record.height)).toBeGreaterThan(0);
      });

      test('Reserve sub-authority with different owner.', async () => {
        // Create another account, send tx to set public key on the account.
        await registry.sendCoins({ denom: DENOM, amount: '1000000000', destinationAddress: otherAccount1.address }, privateKey, fee);
        await registry.sendCoins({ denom: DENOM, amount: '1000', destinationAddress: otherAccount2.address }, otherAccount1.getPrivateKey(), fee);

        const subAuthority = `halo.${authorityName}`;
        await registry.reserveAuthority({ name: subAuthority, owner: otherAccount1.address }, privateKey, fee);

        const [record] = await registry.lookupAuthorities([subAuthority]);
        expect(record).toBeDefined();
        expect(record.ownerAddress).toBeDefined();
        expect(record.ownerAddress).toBe(otherAccount1.address);
        expect(record.ownerPublicKey).toBeDefined();
        expect(Number(record.height)).toBeGreaterThan(0);
      });

      test('Set name for unbonded authority', async () => {
        assert(watcherId);
        await expect(registry.setName({ lrn, cid: watcherId }, privateKey, fee))
          .rejects.toThrow('Authority bond not found.');
      });

      test('Set authority bond', async () => {
        await registry.setAuthorityBond({ name: authorityName, bondId }, privateKey, fee);
      });

      test('List authorities.', async () => {
        const authorities = await registry.getAuthorities();

        expect(authorities.length).toBeDefined();
      });

      test('List authorities by owner.', async () => {
        const authority1 = await registry.getAuthorities(otherAccount1._address);
        const authority2 = await registry.getAuthorities(otherAccount2._address);

        expect(authority1).toBeDefined();
        expect(authority2).toBeDefined();
      });
    });
  });

  describe('Naming tests', () => {
    let authorityName: string;
    let otherAuthorityName: string;
    let otherPrivateKey: string;
    let otherAccount: Account;

    beforeAll(async () => {
      authorityName = `laconic-${Date.now()}`;
      await registry.reserveAuthority({ name: authorityName }, privateKey, fee);
      await registry.setAuthorityBond({ name: authorityName, bondId }, privateKey, fee);

      // Create another account.
      const mnenonic = Account.generateMnemonic();
      otherAccount = await Account.generateFromMnemonic(mnenonic);
      await otherAccount.init();
      await registry.sendCoins({ denom: DENOM, amount: '1000000000', destinationAddress: otherAccount.address }, privateKey, fee);

      otherAuthorityName = `other-${Date.now()}`;
      otherPrivateKey = otherAccount.privateKey.toString('hex');
    });

    test('Set name', async () => {
      const lrn = `lrn://${authorityName}/app/test1`;

      await registry.setName({ lrn, cid: watcherId }, privateKey, fee);

      // Query records should return it (some lrn points to it).
      const [record] = await registry.queryRecords({ type: 'WebsiteRegistrationRecord', version: watcher.record.version });
      expect(record).toBeDefined();
      expect(record.names).toHaveLength(1);

      await registry.deleteName({ lrn }, privateKey, fee);
    });

    describe('With name set', () => {
      let lrn: string;

      beforeAll(async () => {
        lrn = `lrn://${authorityName}/app/test2`;
        await registry.setName({ lrn, cid: watcherId }, privateKey, fee);
      });

      afterAll(async () => {
        await registry.deleteName({ lrn }, privateKey, fee);
      });

      test('Lookup name', async () => {
        const records = await registry.lookupNames([lrn]);
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
        const records = await registry.resolveNames([lrn]);
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

        const updatedWatcherId = result.id;
        await registry.setName({ lrn, cid: updatedWatcherId }, privateKey, fee);

        const records = await registry.lookupNames([lrn], true);
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
        await registry.deleteName({ lrn }, privateKey, fee);

        let records = await registry.lookupNames([lrn], true);
        expect(records).toBeDefined();
        expect(records).toHaveLength(1);

        const [{ latest }] = records;
        expect(latest).toBeDefined();
        expect(latest.id).toBeDefined();
        expect(latest.id).toBe('');
        expect(latest.height).toBeDefined();

        // Query records should NOT return it (no LRN points to it).
        records = await registry.queryRecords({ type: 'WebsiteRegistrationRecord', version: watcher.record.version });
        expect(records).toBeDefined();
        expect(records).toHaveLength(0);

        // Query all records should return it (all: true).
        records = await registry.queryRecords({ type: 'WebsiteRegistrationRecord', version: watcher.record.version }, true);
        expect(records).toBeDefined();
        expect(records).toHaveLength(1);
      });

      test('Delete already deleted name', async () => {
        await registry.deleteName({ lrn }, privateKey, fee);
        await registry.deleteName({ lrn }, privateKey, fee);

        const records = await registry.lookupNames([lrn], true);
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
      await expect(registry.setName({ lrn: 'lrn://not-reserved/app/test', cid: watcherId }, privateKey, fee))
        .rejects.toThrow('Name authority not found.');
    });

    test('Set name for non-owned authority', async () => {
      await registry.sendCoins({ denom: DENOM, amount: '1000000000', destinationAddress: otherAccount.address }, privateKey, fee);

      // Other account reserves an authority.
      await registry.reserveAuthority({ name: otherAuthorityName }, otherPrivateKey, fee);

      // Try setting name under other authority.
      await expect(registry.setName({ lrn: `lrn://${otherAuthorityName}/app/test`, cid: watcherId }, privateKey, fee)).rejects.toThrow('Access denied.');
    });

    test('Delete name for non-owned authority.', async () => {
      const otherBondId = await registry.getNextBondId(otherPrivateKey);
      await registry.createBond({ denom: DENOM, amount: '1000000' }, otherPrivateKey, fee);
      await registry.setAuthorityBond({ name: otherAuthorityName, bondId: otherBondId }, otherPrivateKey, fee);
      await registry.setName({ lrn: `lrn://${otherAuthorityName}/app/test`, cid: watcherId }, otherPrivateKey, fee);

      // Try deleting name under other authority.
      await expect(registry.deleteName({ lrn: `lrn://${otherAuthorityName}/app/test` }, privateKey, fee)).rejects.toThrow('Access denied.');
    });

    test('Lookup non existing name', async () => {
      const records = await registry.lookupNames(['lrn://not-reserved/app/test']);
      expect(records).toBeDefined();
      expect(records).toHaveLength(1);
      const [record] = records;
      expect(record).toBeNull();
    });

    test('Resolve non existing name', async () => {
      const records = await registry.resolveNames(['lrn://not-reserved/app/test']);
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
