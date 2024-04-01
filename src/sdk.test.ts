import path from 'path';

import { Registry } from './index';
import { getConfig, ensureUpdatedConfig } from './testing/helper';
import { DENOM } from './constants';

const WATCHER_YML_PATH = path.join(__dirname, './testing/data/watcher.yml');

jest.setTimeout(40 * 1000);

const { chainId, rpcEndpoint, gqlEndpoint, privateKey, fee } = getConfig();

describe('Querying', () => {
  let watcher: any;
  let registry: Registry;
  let bondId: string;

  beforeAll(async () => {
    registry = new Registry(gqlEndpoint, rpcEndpoint, chainId);

    bondId = await registry.getNextBondId(privateKey);
    await registry.createBond({ denom: DENOM, amount: '1000000000' }, privateKey, fee);

    const publishNewWatcherVersion = async () => {
      watcher = await ensureUpdatedConfig(WATCHER_YML_PATH);
      await registry.setRecord({ privateKey, record: watcher.record, bondId }, privateKey, fee);
      return watcher.record.version;
    };

    await publishNewWatcherVersion();
  });

  test('Endpoint and chain ID.', async () => {
    expect(registry.endpoints.rpc).toBe(rpcEndpoint);
    expect(registry.endpoints.gql).toBe(gqlEndpoint);
    expect(registry.chainID).toBe(chainId);
  });

  test('Get status.', async () => {
    const status = await registry.getStatus();
    expect(status).toBeDefined();
    expect(status.version).toBeDefined();
  });

  test('List records.', async () => {
    const records = await registry.queryRecords({}, true);
    expect(records.length).toBeGreaterThanOrEqual(1);
  });

  test('Query records by reference.', async () => {
    const { repo_registration_record_cid } = watcher.record;
    const records = await registry.queryRecords({ repo_registration_record_cid }, true);
    expect(records.length).toBeGreaterThanOrEqual(1);

    const { attributes: { repo_registration_record_cid: record_repo_registration_record_cid } } = records[0];
    expect(repo_registration_record_cid).toStrictEqual(record_repo_registration_record_cid);
  });

  test('Query records by attributes.', async () => {
    const { version, url } = watcher.record;
    const records = await registry.queryRecords({ version, url, type: undefined }, true);
    expect(records.length).toBe(1);

    [watcher] = records;
    const { attributes: { version: recordVersion, url: recordName } } = watcher;
    expect(recordVersion).toBe(version);
    expect(recordName).toBe(url);
  });

  test('Query records by id.', async () => {
    const records = await registry.getRecordsByIds([watcher.id]);
    expect(records.length).toBe(1);
    expect(records[0].id).toBe(watcher.id);
  });

  test('Query records passing refs true.', async () => {
    const [record] = await registry.getRecordsByIds([watcher.id], true);
    expect(record.id).toBe(watcher.id);
    // temp fix
    expect(record.attributes.repo_registration_record_cid).toBeDefined();
    expect(record.attributes.repo_registration_record_cid).toHaveProperty('/');
    expect(record.attributes.repo_registration_record_cid['/']).toHaveLength(46);
  });
});
