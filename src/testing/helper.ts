import assert from 'assert';
import yaml from 'node-yaml';
import semver from 'semver';

import { DEFAULT_CHAIN_ID } from '../index';

export const ensureUpdatedConfig = async (path: string) => {
  const conf = await yaml.read(path);
  conf.record.version = semver.inc(conf.record.version, 'patch');
  await yaml.write(path, conf);

  return conf;
};

export const getBaseConfig = async (path: string) => {
  const conf = await yaml.read(path);
  conf.record.version = '0.0.1';

  return conf;
};

export const getConfig = () => {
  assert(process.env.PRIVATE_KEY);

  return {
    chainId: process.env.COSMOS_CHAIN_ID || DEFAULT_CHAIN_ID,
    privateKey: process.env.PRIVATE_KEY,
    rpcEndpoint: process.env.LACONICD_RPC_ENDPOINT || 'http://localhost:26657',
    gqlEndpoint: process.env.LACONICD_GQL_ENDPOINT || 'http://localhost:9473/api',
    fee: {
      amount: [{ denom: 'alnt', amount: '400000' }],
      gas: '400000'
    }
  };
};
