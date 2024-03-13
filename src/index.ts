import { sha256 } from 'js-sha256';
import { DeliverTxResponse, StdFee } from '@cosmjs/stargate';

import { RegistryClient } from './registry-client';
import { Account } from './account';
import { Util } from './util';
import {
  MessageMsgAssociateBond,
  MessageMsgCancelBond,
  MessageMsgCreateBond,
  MessageMsgDissociateBond,
  MessageMsgDissociateRecords,
  MessageMsgReAssociateRecords,
  MessageMsgRefillBond,
  MessageMsgWithdrawBond
} from './types/cerc/bond/message';
import {
  MessageMsgDeleteName,
  MessageMsgSetAuthorityBond,
  MessageMsgSetName
} from './types/cerc/registry/message';
import {
  MessageMsgCommitBid,
  MessageMsgRevealBid
} from './types/cerc/auction/message';
import { LaconicClient } from './laconic-client';
import { MsgCancelBondResponse, MsgCreateBondResponse, MsgRefillBondResponse, MsgWithdrawBondResponse } from './proto2/cerc/bond/v1/tx';
import { Coin } from './proto2/cosmos/base/v1beta1/coin';
import { MsgSendResponse } from './proto2/cosmos/bank/v1beta1/tx';
import { MessageMsgSendCoins } from './types/cosmos/bank/message';

export const DEFAULT_CHAIN_ID = 'laconic_9000-1';

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

export class Registry {
  _endpoints: {[key: string]: string};
  _chainID: string;
  _client: RegistryClient;

  constructor (gqlUrl: string, restUrl = '', chainId: string = DEFAULT_CHAIN_ID) {
    this._endpoints = {
      rest: restUrl,
      gql: gqlUrl
    };

    this._client = new RegistryClient(gqlUrl, restUrl);
    this._chainID = chainId;
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

    return laconicClient.setRecord({ privateKey, record, bondId },
      account.address,
      fee
    );
  }

  /**
   * Send coins.
   */
  async sendCoins ({ amount, denom, destinationAddress }: MessageMsgSendCoins, privateKey: string, fee: StdFee) {
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

    return laconicClient.parseResponse<MsgSendResponse>(response);
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

    return laconicClient.createBond(
      account.address,
      denom,
      amount,
      fee
    );
  }

  /**
   * Refill bond.
   */
  async refillBond ({ denom, amount, id }: MessageMsgRefillBond, privateKey: string, fee: StdFee): Promise<MsgRefillBondResponse> {
    const account = new Account(Buffer.from(privateKey, 'hex'));
    await account.init();
    const laconicClient = await this.getLaconicClient(account);

    return laconicClient.refillBond(
      account.address,
      denom,
      amount,
      id,
      fee
    );
  }

  /**
   * Withdraw (from) bond.
   */
  async withdrawBond ({ denom, amount, id }: MessageMsgWithdrawBond, privateKey: string, fee: StdFee): Promise<MsgWithdrawBondResponse> {
    const account = new Account(Buffer.from(privateKey, 'hex'));
    await account.init();
    const laconicClient = await this.getLaconicClient(account);

    return laconicClient.withdrawBond(
      account.address,
      denom,
      amount,
      id,
      fee
    );
  }

  /**
   * Cancel bond.
   */
  async cancelBond ({ id }: MessageMsgCancelBond, privateKey: string, fee: StdFee): Promise<MsgCancelBondResponse> {
    const account = new Account(Buffer.from(privateKey, 'hex'));
    await account.init();
    const laconicClient = await this.getLaconicClient(account);

    return laconicClient.cancelBond(
      account.address,
      id,
      fee
    );
  }

  /**
   * Associate record with bond.
   */
  async associateBond ({ bondId, recordId }: MessageMsgAssociateBond, privateKey: string, fee: StdFee) {
    const account = new Account(Buffer.from(privateKey, 'hex'));
    await account.init();
    const laconicClient = await this.getLaconicClient(account);

    return laconicClient.associateBond(
      account.address,
      recordId,
      bondId,
      fee
    );
  }

  /**
   * Dissociate record from bond.
   */
  async dissociateBond ({ recordId }: MessageMsgDissociateBond, privateKey: string, fee: StdFee) {
    const account = new Account(Buffer.from(privateKey, 'hex'));
    await account.init();
    const laconicClient = await this.getLaconicClient(account);

    return laconicClient.dissociateBond(
      account.address,
      recordId,
      fee
    );
  }

  /**
   * Dissociate all records from bond.
   */
  async dissociateRecords ({ bondId }: MessageMsgDissociateRecords, privateKey: string, fee: StdFee) {
    const account = new Account(Buffer.from(privateKey, 'hex'));
    await account.init();
    const laconicClient = await this.getLaconicClient(account);

    return laconicClient.dissociateRecords(
      account.address,
      bondId,
      fee
    );
  }

  /**
   * Reassociate records (switch bond).
   */
  async reassociateRecords ({ newBondId, oldBondId }: MessageMsgReAssociateRecords, privateKey: string, fee: StdFee) {
    const account = new Account(Buffer.from(privateKey, 'hex'));
    await account.init();
    const laconicClient = await this.getLaconicClient(account);

    return laconicClient.reassociateRecords(
      account.address,
      oldBondId,
      newBondId,
      fee
    );
  }

  /**
   * Reserve authority.
   */
  async reserveAuthority ({ name, owner }: { name: string, owner?: string }, privateKey: string, fee: StdFee) {
    const account = new Account(Buffer.from(privateKey, 'hex'));
    await account.init();
    const laconicClient = await this.getLaconicClient(account);

    return laconicClient.reserveAuthority(
      account.address,
      name,
      owner || account.address,
      fee
    );
  }

  /**
   * Set authority bond.
   */
  async setAuthorityBond ({ bondId, name }: MessageMsgSetAuthorityBond, privateKey: string, fee: StdFee) {
    const account = new Account(Buffer.from(privateKey, 'hex'));
    await account.init();
    const laconicClient = await this.getLaconicClient(account);

    return laconicClient.setAuthorityBond(
      account.address,
      bondId,
      name,
      fee
    );
  }

  /**
   * Commit auction bid.
   */
  async commitBid ({ auctionId, commitHash }: MessageMsgCommitBid, privateKey: string, fee: StdFee) {
    const account = new Account(Buffer.from(privateKey, 'hex'));
    await account.init();
    const laconicClient = await this.getLaconicClient(account);

    return laconicClient.commitBid(
      account.address,
      auctionId,
      commitHash,
      fee
    );
  }

  /**
   * Reveal auction bid.
   */
  async revealBid ({ auctionId, reveal }: MessageMsgRevealBid, privateKey: string, fee: StdFee) {
    const account = new Account(Buffer.from(privateKey, 'hex'));
    await account.init();
    const laconicClient = await this.getLaconicClient(account);
    return laconicClient.revealBid(
      account.address,
      auctionId,
      reveal,
      fee
    );
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

    return laconicClient.setName(
      account.address,
      lrn,
      cid,
      fee
    );
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
    return laconicClient.deleteName(
      account.address,
      lrn,
      fee
    );
  }

  async getLaconicClient (account: Account) {
    return LaconicClient.connectWithSigner(this._endpoints.rest, account.wallet);
  }
}

export { Account };
