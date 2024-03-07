import path from 'path';

import { Registry } from './index';
import { ensureUpdatedConfig, getConfig, getLaconic2Config } from './testing/helper';
import { DENOM } from './constants';

const WATCHER_YML_PATH = path.join(__dirname, './testing/data/watcher.yml');

const BOND_AMOUNT = '10000';
const { chainId, restEndpoint, gqlEndpoint, privateKey, fee } = getConfig();
const { fee: laconic2Fee } = getLaconic2Config();

jest.setTimeout(90 * 1000);

const bondTests = () => {
  let registry: Registry;

  const publishNewWatcherVersion = async (bondId: string) => {
    let watcher = await ensureUpdatedConfig(WATCHER_YML_PATH);
    await registry.setRecord({ privateKey, record: watcher.record, bondId }, privateKey, fee);
    return watcher;
  };

  beforeAll(async () => {
    registry = new Registry(gqlEndpoint, restEndpoint, chainId);
  });

  test('Create bond.', async () => {
    let bondId = await registry.getNextBondId(privateKey);
    expect(bondId).toBeDefined();
    await registry.createBond({ denom: DENOM, amount: BOND_AMOUNT }, privateKey, laconic2Fee);
  });

  describe('With bond created', () => {
    let bond1: any;

    beforeAll(async () => {
      let bondId1 = await registry.getNextBondId(privateKey);
      expect(bondId1).toBeDefined();
      await registry.createBond({ denom: DENOM, amount: BOND_AMOUNT }, privateKey, laconic2Fee);

      [bond1] = await registry.getBondsByIds([bondId1]);
      expect(bond1).toBeDefined();
      expect(bond1.id).toEqual(bondId1);
    });

    test('Get bond by ID.', async () => {
      const [bond] = await registry.getBondsByIds([bond1.id]);
      expect(bond).toBeDefined();
      expect(bond.id).toBe(bond1.id);
      expect(bond.balance).toHaveLength(1);
      expect(bond.balance[0]).toEqual({ type: DENOM, quantity: BOND_AMOUNT });
    });

    test('Query bonds.', async () => {
      const bonds = await registry.queryBonds();
      expect(bonds).toBeDefined();
      const bond = bonds.filter((bond: any) => bond.id === bond1.id);
      expect(bond).toBeDefined();
    });

    test('Query bonds by owner.', async () => {
      const bonds = await registry.queryBonds({ owner: bond1.owner });
      expect(bonds).toBeDefined();
      const bond = bonds.filter((bond: any) => bond.id === bond1.id);
      expect(bond).toBeDefined();
    });

    test('Refill bond.', async () => {
      const refillAmount = '500';
      const total = (parseInt(BOND_AMOUNT) + parseInt(refillAmount)).toString();
      await registry.refillBond({ id: bond1.id, denom: DENOM, amount: refillAmount }, privateKey, laconic2Fee);
      const [bond] = await registry.getBondsByIds([bond1.id]);
      expect(bond).toBeDefined();
      expect(bond.id).toBe(bond1.id);
      expect(bond.balance).toHaveLength(1);
      expect(bond.balance[0]).toEqual({ type: DENOM, quantity: total });
    });

    test('Withdraw bond.', async () => {
      await registry.withdrawBond({ id: bond1.id, denom: DENOM, amount: '500' }, privateKey, laconic2Fee);
      const [bond] = await registry.getBondsByIds([bond1.id]);
      expect(bond).toBeDefined();
      expect(bond.id).toBe(bond1.id);
      expect(bond.balance).toHaveLength(1);
      expect(bond.balance[0]).toEqual({ type: DENOM, quantity: BOND_AMOUNT });
    });

    test('Cancel bond.', async () => {
      await registry.cancelBond({ id: bond1.id }, privateKey, laconic2Fee);
      const [bond] = await registry.getBondsByIds([bond1.id]);
      expect(bond.id).toBe('');
      expect(bond.owner).toBe('');
      expect(bond.balance).toHaveLength(0);
    });
  });

  test('Associate/Dissociate bond.', async () => {
    let bondId1: string;

    bondId1 = await registry.getNextBondId(privateKey);
    expect(bondId1).toBeDefined();
    await registry.createBond({ denom: DENOM, amount: BOND_AMOUNT }, privateKey, laconic2Fee);

    // Create a new record.
    let watcher = await publishNewWatcherVersion(bondId1);
    let query = { type: watcher.record.type, url: watcher.record.url, version: watcher.record.version };
    let [record1] = await registry.queryRecords(query, true);
    expect(record1.bondId).toBe(bondId1);

    // Dissociate record, query and confirm.
    await registry.dissociateBond({ recordId: record1.id }, privateKey, fee);
    [record1] = await registry.queryRecords(query, true);
    expect(record1.bondId).toBe('');

    // Associate record with bond, query and confirm.
    await registry.associateBond({ recordId: record1.id, bondId: bondId1 }, privateKey, fee);
    [record1] = await registry.queryRecords(query, true);
    expect(record1.bondId).toBe(bondId1);
  });

  test('Reassociate/Dissociate records.', async () => {
    let bondId1: string;
    let bondId2: string;

    bondId1 = await registry.getNextBondId(privateKey);
    expect(bondId1).toBeDefined();
    await registry.createBond({ denom: DENOM, amount: BOND_AMOUNT }, privateKey, laconic2Fee);

    // Create a new record version.
    let watcher = await publishNewWatcherVersion(bondId1);
    let queryv1 = { type: watcher.record.type, url: watcher.record.url, version: watcher.record.version };
    let queryv2 = { type: watcher.record.type, url: watcher.record.url, version: watcher.record.version };

    // Check version1, version2 as associated with bondId1.
    let records;
    records = await registry.queryRecords(queryv1, true);
    expect(records[0].bondId).toBe(bondId1);
    records = await registry.queryRecords(queryv2, true);
    expect(records[0].bondId).toBe(bondId1);

    // Create another bond.
    bondId2 = await registry.getNextBondId(privateKey);
    expect(bondId2).toBeDefined();
    await registry.createBond({ denom: DENOM, amount: BOND_AMOUNT }, privateKey, laconic2Fee);
    const [bond] = await registry.getBondsByIds([bondId2]);
    expect(bond.id).toBe(bondId2);

    // Reassociate records from bondId1 to bondId2, verify change.
    await registry.reassociateRecords({ oldBondId: bondId1, newBondId: bondId2 }, privateKey, fee);
    records = await registry.queryRecords(queryv1, true);
    expect(records[0].bondId).toBe(bondId2);
    records = await registry.queryRecords(queryv2, true);
    expect(records[0].bondId).toBe(bondId2);

    // Dissociate all records from bond, verify change.
    await registry.dissociateRecords({ bondId: bondId2 }, privateKey, fee);
    records = await registry.queryRecords(queryv1, true);
    expect(records[0].bondId).toBe('');
    records = await registry.queryRecords(queryv2, true);
    expect(records[0].bondId).toBe('');
  });
};

describe('Bonds', bondTests);
