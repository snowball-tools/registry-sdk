
import isUrl from 'is-url';
import { sha256 } from 'js-sha256';
import { generatePostBodyBroadcast } from '@tharsis/provider';
import {
  Chain,
  Sender,
  Fee,
} from '@tharsis/transactions'

import { createTxMsgCreateBond, MessageMsgCreateBond } from "./bond";
import { RegistryClient } from "./registry-client";
import { Account } from "./account";
import { createTransaction } from "./txbuilder";

const DEFAULT_WRITE_ERROR = 'Unable to write to chiba-clonk.';

export const DEFAULT_CHAIN_ID = 'ethermint_9000-1';

// Parse Tx response from cosmos-sdk.
export const parseTxResponse = (result: any) => {
  const { txhash: hash, height, ...txResponse } = result;
  txResponse.data = txResponse.data && Buffer.from(txResponse.data, 'base64').toString('utf8');
  txResponse.log = JSON.parse(txResponse.raw_log);

  txResponse.events.forEach((event:any) => {
    event.attributes = event.attributes.map(({ key, value }: { key: string, value: string }) => ({
      key: Buffer.from(key, 'base64').toString('utf8'),
      value: Buffer.from(value, 'base64').toString('utf8')
    }));
  });

  return { hash, height, ...txResponse };
};

export const isKeyValid = (key: string) => key && key.match(/^[0-9a-fA-F]{64}$/);

export class Registry {
  _endpoint: string
  _chain: Chain
  _client: RegistryClient

  static processWriteError(error: Error) {
    /**
      Example:

      {
        message: '{"code":18,"data":null,"log":"invalid request: Name already reserved.: failed to execute message; message index: 0","info":"","gasWanted":"200000","gasUsed":"86717","events":[],"codespace":"sdk"}',
          path: [ 'submit' ]
      }g
    */
    const message = JSON.parse(error.message);
    return message.log || DEFAULT_WRITE_ERROR;
  }

  constructor(url: string, cosmosChainId = DEFAULT_CHAIN_ID) {
    if (!isUrl(url)) {
      throw new Error('Path to a registry GQL endpoint should be provided.');
    }

    this._endpoint = url;
    this._client = new RegistryClient(url);

    this._chain = {
      chainId: 9000,
      cosmosChainId
    }
  }

  /**
   * Get account by addresses.
   */
   async getAccount(address: string) {
    return this._client.getAccount(address);
  }

  /**
   * Computes the next bondId for the given account private key.
   */
   async getNextBondId(address: string) {
    let result;

    try {
      const { account } = await this.getAccount(address);
      const accountObj = account.base_account;

      const nextSeq = parseInt(accountObj.sequence, 10) + 1;
      result = sha256(`${accountObj.address}:${accountObj.number}:${nextSeq}`);
    } catch (err: any) {
      const error = err[0] || err;
      throw new Error(Registry.processWriteError(error));
    }

    return result;
  }

  /**
   * Create bond.
   */
   async createBond(params: MessageMsgCreateBond, senderAddress: string, privateKey: string, fee: Fee) {
    let result;

    try {
      const { account: { base_account: accountInfo } } = await this.getAccount(senderAddress);

      const sender = {
        accountAddress: accountInfo.address,
        sequence: accountInfo.sequence,
        accountNumber: accountInfo.account_number,
        pubkey: accountInfo.pub_key.key,
      }

      const msg = createTxMsgCreateBond(this._chain, sender, fee, '', params)
      result = await this._submitTx(msg, privateKey, sender);
    } catch (err: any) {
      const error = err[0] || err;
      throw new Error(Registry.processWriteError(error));
    }

    return parseTxResponse(result);
  }

  /**
   * Submit a generic Tx to the chain.
   */
   async _submitTx(message: any, privateKey: string, sender: Sender) {
    // Check private key.
    if (!isKeyValid(privateKey)) {
      throw new Error('Registry privateKey should be a hex string.');
    }

    // Check that the account exists on-chain.
    const account = new Account(Buffer.from(privateKey, 'hex'));

    // Generate signed Tx.
    const transaction = createTransaction(message, account, sender, this._chain);

    const tx = generatePostBodyBroadcast(transaction)

    // Submit Tx to chain.
    const { tx_response: response } = await this._client.submit(tx);
    return response;
  }
}
