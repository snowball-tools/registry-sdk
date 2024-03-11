import { sha256 } from 'js-sha256';
import { generatePostBodyBroadcast, BroadcastMode } from '@tharsis/provider';
import {
  Chain,
  Sender,
  Fee,
  MessageSendParams
} from '@tharsis/transactions';
import { DeliverTxResponse, StdFee } from '@cosmjs/stargate';

import { RegistryClient } from './registry-client';
import { Account } from './account';
import { createTransaction } from './txbuilder';
import { Util } from './util';
import {
  createTxMsgAssociateBond,
  createTxMsgDissociateBond,
  createTxMsgDissociateRecords,
  createTxMsgReAssociateRecords,
  MessageMsgAssociateBond,
  MessageMsgCancelBond,
  MessageMsgCreateBond,
  MessageMsgDissociateBond,
  MessageMsgDissociateRecords,
  MessageMsgReAssociateRecords,
  MessageMsgRefillBond,
  MessageMsgWithdrawBond
} from './messages/bond';
import {
  MessageMsgDeleteName,
  MessageMsgSetAuthorityBond,
  MessageMsgSetName,
  NAMESERVICE_ERRORS
} from './messages/registry';
import {
  MessageMsgCommitBid,
  MessageMsgRevealBid
} from './messages/auction';
import { LaconicClient } from './laconic-client';
import { MsgCancelBondResponse, MsgCreateBondResponse, MsgRefillBondResponse, MsgWithdrawBondResponse } from './proto2/cerc/bond/v1/tx';
import { Coin } from './proto2/cosmos/base/v1beta1/coin';

export const DEFAULT_CHAIN_ID = 'laconic_9000-1';

const DEFAULT_WRITE_ERROR = 'Unable to write to laconicd.';

// Parse Tx response from cosmos-sdk.
export const parseTxResponse = (result: any, parseResponse?: (data: string) => any) => {
  const { txhash: hash, height, ...txResponse } = result;

  if (parseResponse) {
    txResponse.data = parseResponse(txResponse.data);
  }

  txResponse.events.forEach((event:any) => {
    event.attributes = event.attributes.map(({ key, value }: { key: string, value: string }) => ({
      key: Buffer.from(key, 'base64').toString('utf8'),
      value: Buffer.from(value, 'base64').toString('utf8')
    }));
  });

  return { hash, height, ...txResponse };
};

/**
 * Create an auction bid.
 */
export const createBid = async (chainId: string, auctionId: string, bidderAddress: string, bidAmount: string, noise?: string) => {
  if (!noise) {
    noise = Account.generateMnemonic();
  }

  const reveal = {
    chainId,
    auctionId,
    bidderAddress,
    bidAmount,
    noise
  };

  const commitHash = await Util.getContentId(reveal);
  const revealString = Buffer.from(JSON.stringify(reveal)).toString('hex');

  return {
    commitHash,
    reveal,
    revealString
  };
};

export const isKeyValid = (key: string) => key && key.match(/^[0-9a-fA-F]{64}$/);

export class Registry {
  _endpoints: {[key: string]: string};
  _chainID: string;
  _chain: Chain;
  _client: RegistryClient;

  static processWriteError (error: string) {
    // error string a stacktrace containing the message.
    // https://gist.github.com/nikugogoi/de55d390574ded3466abad8bffd81952#file-txresponse-js-L7
    const errorMessage = NAMESERVICE_ERRORS.find(message => error.includes(message));

    if (!errorMessage) {
      console.error(error);
    }

    return errorMessage || DEFAULT_WRITE_ERROR;
  }

  constructor (gqlUrl: string, restUrl = '', chainId: string = DEFAULT_CHAIN_ID) {
    this._endpoints = {
      rest: restUrl,
      gql: gqlUrl
    };

    this._client = new RegistryClient(gqlUrl, restUrl);
    this._chainID = chainId;

    this._chain = {
      cosmosChainId: chainId,
      chainId: this._parseEthChainId(chainId)
    };
  }

  /**
   * Get accounts by addresses.
   */
  async getAccounts (addresses: string[]) {
    return this._client.getAccounts(addresses);
  }

  get endpoints () {
    return this._endpoints;
  }

  get chainID () {
    return this._chainID;
  }

  /**
   * Get server status.
   */
  async getStatus () {
    return this._client.getStatus();
  }

  /**
   * Get records by ids.
   */
  async getRecordsByIds (ids: string[], refs = false) {
    return this._client.getRecordsByIds(ids, refs);
  }

  /**
   * Get records by attributes.
   */
  async queryRecords (attributes: {[key: string]: any}, all = false, refs = false) {
    return this._client.queryRecords(attributes, all, refs);
  }

  /**
   * Resolve names to records.
   */
  async resolveNames (names: string[], refs = false) {
    return this._client.resolveNames(names, refs);
  }

  /**
   * Publish record.
   * @param transactionPrivateKey - private key in HEX to sign transaction.
   */
  async setRecord (
    { privateKey, record, bondId }: { privateKey: string, record: any, bondId: string },
    transactionPrivateKey: string,
    fee: StdFee
  ) {
    const account = new Account(Buffer.from(transactionPrivateKey, 'hex'));
    await account.init();
    const laconicClient = await this.getLaconicClient(account);

    const response: DeliverTxResponse = await laconicClient.setRecord({ privateKey, record, bondId },
      account.address,
      fee
    );

    return laconicClient.registry.decode(response.msgResponses[0]);
  }

  /**
   * Send coins.
   */
  async sendCoins ({ amount, denom, destinationAddress }: MessageSendParams, privateKey: string, fee: StdFee) {
    const account = new Account(Buffer.from(privateKey, 'hex'));
    await account.init();
    const laconicClient = await this.getLaconicClient(account);

    const response: DeliverTxResponse = await laconicClient.sendTokens(
      account.address,
      destinationAddress,
      [
        Coin.fromPartial({
          denom,
          amount
        })
      ],
      fee);

    // TODO: Register type /cosmos.bank.v1beta1.MsgSendResponse for decoding response
    return response;
  }

  /**
   * Computes the next bondId for the given account private key.
   */
  async getNextBondId (privateKey: string) {
    let result;
    const account = new Account(Buffer.from(privateKey, 'hex'));
    await account.init();
    const accounts = await this.getAccounts([account.address]);
    if (!accounts.length) {
      throw new Error('Account does not exist.');
    }

    const [accountObj] = accounts;
    const nextSeq = parseInt(accountObj.sequence, 10) + 1;
    result = sha256(`${accountObj.address}:${accountObj.number}:${nextSeq}`);

    return result;
  }

  /**
   * Get bonds by ids.
   */
  async getBondsByIds (ids: string[]) {
    return this._client.getBondsByIds(ids);
  }

  /**
   * Query bonds by attributes.
   */
  async queryBonds (attributes = {}) {
    return this._client.queryBonds(attributes);
  }

  /**
   * Create bond.
   */
  async createBond ({ denom, amount }: MessageMsgCreateBond, privateKey: string, fee: StdFee): Promise<MsgCreateBondResponse> {
    const account = new Account(Buffer.from(privateKey, 'hex'));
    await account.init();
    const laconicClient = await this.getLaconicClient(account);

    const response: DeliverTxResponse = await laconicClient.createBond(
      account.address,
      denom,
      amount,
      fee
    );

    return laconicClient.registry.decode(response.msgResponses[0]);
  }

  /**
   * Refill bond.
   */
  async refillBond ({ denom, amount, id }: MessageMsgRefillBond, privateKey: string, fee: StdFee): Promise<MsgRefillBondResponse> {
    const account = new Account(Buffer.from(privateKey, 'hex'));
    await account.init();
    const laconicClient = await this.getLaconicClient(account);

    const response: DeliverTxResponse = await laconicClient.refillBond(
      account.address,
      denom,
      amount,
      id,
      fee
    );

    return laconicClient.registry.decode(response.msgResponses[0]);
  }

  /**
   * Withdraw (from) bond.
   */
  async withdrawBond ({ denom, amount, id }: MessageMsgWithdrawBond, privateKey: string, fee: StdFee): Promise<MsgWithdrawBondResponse> {
    const account = new Account(Buffer.from(privateKey, 'hex'));
    await account.init();
    const laconicClient = await this.getLaconicClient(account);

    const response: DeliverTxResponse = await laconicClient.withdrawBond(
      account.address,
      denom,
      amount,
      id,
      fee
    );

    return laconicClient.registry.decode(response.msgResponses[0]);
  }

  /**
   * Cancel bond.
   */
  async cancelBond ({ id }: MessageMsgCancelBond, privateKey: string, fee: StdFee): Promise<MsgCancelBondResponse> {
    const account = new Account(Buffer.from(privateKey, 'hex'));
    await account.init();
    const laconicClient = await this.getLaconicClient(account);

    const response: DeliverTxResponse = await laconicClient.cancelBond(
      account.address,
      id,
      fee
    );

    return laconicClient.registry.decode(response.msgResponses[0]);
  }

  /**
   * Associate record with bond.
   */
  async associateBond ({ bondId, recordId }: MessageMsgAssociateBond, privateKey: string, fee: StdFee) {
    const account = new Account(Buffer.from(privateKey, 'hex'));
    await account.init();
    const laconicClient = await this.getLaconicClient(account);

    const response: DeliverTxResponse = await laconicClient.associateBond(
      account.address,
      recordId,
      bondId,
      fee
    );

    return laconicClient.registry.decode(response.msgResponses[0]);
  }

  /**
   * Dissociate record from bond.
   */
  async dissociateBond ({ recordId }: MessageMsgDissociateBond, privateKey: string, fee: StdFee) {
    const account = new Account(Buffer.from(privateKey, 'hex'));
    await account.init();
    const laconicClient = await this.getLaconicClient(account);

    const response: DeliverTxResponse = await laconicClient.dissociateBond(
      account.address,
      recordId,
      fee
    );

    return laconicClient.registry.decode(response.msgResponses[0]);
  }

  /**
   * Dissociate all records from bond.
   */
  async dissociateRecords (params: MessageMsgDissociateRecords, privateKey: string, fee: Fee) {
    let result;
    const account = new Account(Buffer.from(privateKey, 'hex'));
    const sender = await this._getSender(account);

    const msg = createTxMsgDissociateRecords(this._chain, sender, fee, '', params);
    result = await this._submitTx(msg, privateKey, sender);

    return parseTxResponse(result);
  }

  /**
   * Reassociate records (switch bond).
   */
  async reassociateRecords (params: MessageMsgReAssociateRecords, privateKey: string, fee: Fee) {
    let result;
    const account = new Account(Buffer.from(privateKey, 'hex'));
    const sender = await this._getSender(account);

    const msg = createTxMsgReAssociateRecords(this._chain, sender, fee, '', params);
    result = await this._submitTx(msg, privateKey, sender);

    return parseTxResponse(result);
  }

  /**
   * Reserve authority.
   */
  async reserveAuthority ({ name, owner }: { name: string, owner?: string }, privateKey: string, fee: StdFee) {
    const account = new Account(Buffer.from(privateKey, 'hex'));
    await account.init();
    const laconicClient = await this.getLaconicClient(account);
    const response: DeliverTxResponse = await laconicClient.reserveAuthority(
      account.address,
      name,
      owner || account.address,
      fee
    );

    // TODO: Parse error response
    return laconicClient.registry.decode(response.msgResponses[0]);
  }

  /**
   * Set authority bond.
   */
  async setAuthorityBond ({ bondId, name }: MessageMsgSetAuthorityBond, privateKey: string, fee: StdFee) {
    const account = new Account(Buffer.from(privateKey, 'hex'));
    await account.init();
    const laconicClient = await this.getLaconicClient(account);
    const response: DeliverTxResponse = await laconicClient.setAuthorityBond(
      account.address,
      bondId,
      name,
      fee
    );

    return laconicClient.registry.decode(response.msgResponses[0]);
  }

  /**
   * Commit auction bid.
   */
  async commitBid ({ auctionId, commitHash }: MessageMsgCommitBid, privateKey: string, fee: StdFee) {
    const account = new Account(Buffer.from(privateKey, 'hex'));
    await account.init();
    const laconicClient = await this.getLaconicClient(account);
    const response: DeliverTxResponse = await laconicClient.commitBid(
      account.address,
      auctionId,
      commitHash,
      fee
    );

    return laconicClient.registry.decode(response.msgResponses[0]);
  }

  /**
   * Reveal auction bid.
   */
  async revealBid ({ auctionId, reveal }: MessageMsgRevealBid, privateKey: string, fee: StdFee) {
    const account = new Account(Buffer.from(privateKey, 'hex'));
    await account.init();
    const laconicClient = await this.getLaconicClient(account);
    const response: DeliverTxResponse = await laconicClient.revealBid(
      account.address,
      auctionId,
      reveal,
      fee
    );

    return laconicClient.registry.decode(response.msgResponses[0]);
  }

  /**
   * Get records by ids.
   */
  async getAuctionsByIds (ids: string[]) {
    return this._client.getAuctionsByIds(ids);
  }

  /**
   * Lookup authorities by names.
   */
  async lookupAuthorities (names: string[], auction = false) {
    return this._client.lookupAuthorities(names, auction);
  }

  /**
   * Set name (LRN) to record ID (CID).
   */
  async setName ({ cid, lrn }: MessageMsgSetName, privateKey: string, fee: StdFee) {
    const account = new Account(Buffer.from(privateKey, 'hex'));
    await account.init();
    const laconicClient = await this.getLaconicClient(account);

    const response: DeliverTxResponse = await laconicClient.setName(
      account.address,
      lrn,
      cid,
      fee
    );

    // TODO: Parse error response
    return laconicClient.registry.decode(response.msgResponses[0]);
  }

  /**
   * Lookup naming information.
   */
  async lookupNames (names: string[], history = false) {
    return this._client.lookupNames(names, history);
  }

  /**
   * Delete name (LRN) mapping.
   */
  async deleteName ({ lrn }: MessageMsgDeleteName, privateKey: string, fee: StdFee) {
    const account = new Account(Buffer.from(privateKey, 'hex'));
    await account.init();
    const laconicClient = await this.getLaconicClient(account);
    const response: DeliverTxResponse = await laconicClient.deleteName(
      account.address,
      lrn,
      fee
    );

    // TODO: Parse error response form delete name
    return laconicClient.registry.decode(response.msgResponses[0]);
  }

  /**
   * Submit a generic Tx to the chain.
   */
  async _submitTx (message: any, privateKey: string, sender: Sender) {
    // Check private key.
    if (!isKeyValid(privateKey)) {
      throw new Error('Registry privateKey should be a hex string.');
    }

    // Check that the account exists on-chain.
    const account = new Account(Buffer.from(privateKey, 'hex'));

    // Generate signed Tx.
    const transaction = createTransaction(message, account, sender, this._chain);

    const tx = generatePostBodyBroadcast(transaction, BroadcastMode.Block);

    // Submit Tx to chain.
    const { tx_response: response } = await this._client.submit(tx);

    if (response.code !== 0) {
      // Throw error when transaction is not successful.
      // https://docs.starport.com/guide/nameservice/05-play.html#buy-name-transaction-details
      throw new Error(Registry.processWriteError(response.raw_log));
    }

    return response;
  }

  /**
   * https://evmos.dev/basics/chain_id.html
   */
  _parseEthChainId (chainId: string) {
    const [idWithChainNumber] = chainId.split('-');
    const [_, ethChainId] = idWithChainNumber.split('_');

    return Number(ethChainId);
  }

  /**
   * Get sender used for creating message.
   */
  async _getSender (account: Account) {
    const accounts = await this.getAccounts([account.formattedCosmosAddress]);
    if (!accounts.length) {
      throw new Error('Account does not exist.');
    }

    const [{ number, sequence }] = accounts;

    return {
      accountAddress: account.formattedCosmosAddress,
      sequence: sequence,
      accountNumber: number,
      pubkey: account.encodedPubkey
    };
  }

  async getLaconicClient (account: Account) {
    return LaconicClient.connectWithSigner(this._endpoints.rest, account.wallet);
  }
}

export { Account };
