import path from 'path';

import { Registry } from './index';
import { getBaseConfig, getConfig, getLaconic2Config } from './testing/helper';
import { Util } from './util';

const WATCHER_YML_PATH = path.join(__dirname, './testing/data/watcher.yml');

jest.setTimeout(90 * 1000);

const { chainId, restEndpoint, gqlEndpoint, privateKey, fee } = getConfig();
const { fee: laconic2Fee } = getLaconic2Config();

const utilTests = () => {
  let registry: Registry;

  let bondId: string;
  let watcher: any;
  let watcherId: string;

  beforeAll(async () => {
    registry = new Registry(gqlEndpoint, restEndpoint, chainId);

    // Create bond.
    bondId = await registry.getNextBondId(privateKey);
    await registry.createBond({ denom: 'aphoton', amount: '1000000000' }, privateKey, laconic2Fee);

    // Create watcher.
    watcher = await getBaseConfig(WATCHER_YML_PATH);
    const result = await registry.setRecord(
      {
        privateKey,
        bondId,
        record: watcher.record
      },
      privateKey,
      fee
    );

    watcherId = result.data.id;
  });

  test('Generate content id.', async () => {
    const cid = await Util.getContentId(watcher.record);
    expect(cid).toBe(watcherId);
  });
};

xdescribe('Util', utilTests);
