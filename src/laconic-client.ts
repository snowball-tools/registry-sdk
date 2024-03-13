
import { GeneratedType, OfflineSigner, Registry } from '@cosmjs/proto-signing';
import {
  defaultRegistryTypes,
  DeliverTxResponse,
  SigningStargateClient,
  SigningStargateClientOptions,
  StdFee
} from '@cosmjs/stargate';
import { Comet38Client } from '@cosmjs/tendermint-rpc';

import { MsgCancelBondEncodeObject, MsgCreateBondEncodeObject, MsgRefillBondEncodeObject, MsgWithdrawBondEncodeObject, bondTypes, typeUrlMsgCancelBond, typeUrlMsgCreateBond, typeUrlMsgRefillBond, typeUrlMsgWithdrawBond } from './types/cerc/bond/message';
import { Coin } from './proto2/cosmos/base/v1beta1/coin';
import { MsgAssociateBondEncodeObject, MsgDeleteNameEncodeObject, MsgDissociateBondEncodeObject, MsgDissociateRecordsEncodeObject, MsgReassociateRecordsEncodeObject, MsgReserveAuthorityEncodeObject, MsgSetAuthorityBondEncodeObject, MsgSetNameEncodeObject, MsgSetRecordEncodeObject, registryTypes, typeUrlMsgAssociateBond, typeUrlMsgDeleteName, typeUrlMsgDissociateBond, typeUrlMsgDissociateRecords, typeUrlMsgReassociateRecords, typeUrlMsgReserveAuthority, typeUrlMsgSetAuthorityBond, typeUrlMsgSetName, typeUrlMsgSetRecord } from './types/cerc/registry/message';
import { MsgCommitBidEncodeObject, MsgRevealBidEncodeObject, auctionTypes, typeUrlMsgCommitBid, typeUrlMsgRevealBid } from './types/cerc/auction/message';
import { MsgAssociateBondResponse, MsgDeleteNameResponse, MsgDissociateBondResponse, MsgDissociateRecordsResponse, MsgReassociateRecordsResponse, MsgReserveAuthorityResponse, MsgSetAuthorityBondResponse, MsgSetNameResponse, MsgSetRecordResponse, Payload } from './proto2/cerc/registry/v1/tx';
import { Record, Signature } from './proto2/cerc/registry/v1/registry';
import { Account } from './account';
import { Util } from './util';
import { NAMESERVICE_ERRORS } from './messages/registry';
import { MsgCommitBidResponse, MsgRevealBidResponse } from './proto2/cerc/auction/v1/tx';
import { MsgCancelBondResponse, MsgCreateBondResponse, MsgRefillBondResponse, MsgWithdrawBondResponse } from './proto2/cerc/bond/v1/tx';
import { bankTypes } from './types/cosmos/bank/message';

const DEFAULT_WRITE_ERROR = 'Unable to write to laconicd.';

export const laconicDefaultRegistryTypes: ReadonlyArray<[string, GeneratedType]> = [
  ...defaultRegistryTypes,
  ...bondTypes,
  ...registryTypes,
  ...auctionTypes,
  ...bankTypes
];

function createDefaultRegistry (): Registry {
  return new Registry(laconicDefaultRegistryTypes);
}

export class LaconicClient extends SigningStargateClient {
  public static async connectWithSigner (
    endpoint: string,
    signer: OfflineSigner,
    options: SigningStargateClientOptions = {}
  ): Promise<LaconicClient> {
    const cometClient = await Comet38Client.connect(endpoint);
    return new LaconicClient(cometClient, signer, {
      registry: createDefaultRegistry(),
      ...options
    });
  }

  public async createBond (
    signer: string,
    denom: string,
    amount: string,
    fee: StdFee | 'auto' | number,
    memo = ''
  ) {
    const createMsg: MsgCreateBondEncodeObject = {
      typeUrl: typeUrlMsgCreateBond,
      value: {
        signer,
        coins: [
          Coin.fromPartial({
            denom,
            amount
          })
        ]
      }
    };

    const response = await this.signAndBroadcast(signer, [createMsg], fee, memo);
    return this.parseResponse<MsgCreateBondResponse>(response);
  }

  public async refillBond (
    signer: string,
    denom: string,
    amount: string,
    id: string,
    fee: StdFee | 'auto' | number,
    memo = ''
  ) {
    const createMsg: MsgRefillBondEncodeObject = {
      typeUrl: typeUrlMsgRefillBond,
      value: {
        id,
        signer,
        coins: [
          Coin.fromPartial({
            denom,
            amount
          })
        ]
      }
    };

    const response = await this.signAndBroadcast(signer, [createMsg], fee, memo);
    return this.parseResponse<MsgRefillBondResponse>(response);
  }

  public async withdrawBond (
    signer: string,
    denom: string,
    amount: string,
    id: string,
    fee: StdFee | 'auto' | number,
    memo = ''
  ) {
    const createMsg: MsgWithdrawBondEncodeObject = {
      typeUrl: typeUrlMsgWithdrawBond,
      value: {
        id,
        signer,
        coins: [
          Coin.fromPartial({
            denom,
            amount
          })
        ]
      }
    };

    const response = await this.signAndBroadcast(signer, [createMsg], fee, memo);
    return this.parseResponse<MsgWithdrawBondResponse>(response);
  }

  public async cancelBond (
    signer: string,
    id: string,
    fee: StdFee | 'auto' | number,
    memo = ''
  ) {
    const createMsg: MsgCancelBondEncodeObject = {
      typeUrl: typeUrlMsgCancelBond,
      value: {
        id,
        signer
      }
    };

    const response = await this.signAndBroadcast(signer, [createMsg], fee, memo);
    return this.parseResponse<MsgCancelBondResponse>(response);
  }

  public async associateBond (
    signer: string,
    recordId: string,
    bondId: string,
    fee: StdFee | 'auto' | number,
    memo = ''
  ) {
    const createMsg: MsgAssociateBondEncodeObject = {
      typeUrl: typeUrlMsgAssociateBond,
      value: {
        recordId,
        bondId,
        signer
      }
    };

    const response = await this.signAndBroadcast(signer, [createMsg], fee, memo);
    return this.parseResponse<MsgAssociateBondResponse>(response);
  }

  public async dissociateBond (
    signer: string,
    recordId: string,
    fee: StdFee | 'auto' | number,
    memo = ''
  ) {
    const createMsg: MsgDissociateBondEncodeObject = {
      typeUrl: typeUrlMsgDissociateBond,
      value: {
        recordId,
        signer
      }
    };

    const response = await this.signAndBroadcast(signer, [createMsg], fee, memo);
    return this.parseResponse<MsgDissociateBondResponse>(response);
  }

  public async dissociateRecords (
    signer: string,
    bondId: string,
    fee: StdFee | 'auto' | number,
    memo = ''
  ) {
    const createMsg: MsgDissociateRecordsEncodeObject = {
      typeUrl: typeUrlMsgDissociateRecords,
      value: {
        signer,
        bondId
      }
    };

    const response = await this.signAndBroadcast(signer, [createMsg], fee, memo);
    return this.parseResponse<MsgDissociateRecordsResponse>(response);
  }

  public async reassociateRecords (
    signer: string,
    oldBondId: string,
    newBondId: string,
    fee: StdFee | 'auto' | number,
    memo = ''
  ) {
    const createMsg: MsgReassociateRecordsEncodeObject = {
      typeUrl: typeUrlMsgReassociateRecords,
      value: {
        signer,
        oldBondId,
        newBondId
      }
    };

    const response = await this.signAndBroadcast(signer, [createMsg], fee, memo);
    return this.parseResponse<MsgReassociateRecordsResponse>(response);
  }

  public async reserveAuthority (
    signer: string,
    name: string,
    owner: string,
    fee: StdFee | 'auto' | number,
    memo = ''
  ) {
    const createMsg: MsgReserveAuthorityEncodeObject = {
      typeUrl: typeUrlMsgReserveAuthority,
      value: {
        name,
        signer,
        owner
      }
    };

    const response = await this.signAndBroadcast(signer, [createMsg], fee, memo);
    return this.parseResponse<MsgReserveAuthorityResponse>(response);
  }

  public async commitBid (
    signer: string,
    auctionId: string,
    commitHash: string,
    fee: StdFee | 'auto' | number,
    memo = ''
  ) {
    const createMsg: MsgCommitBidEncodeObject = {
      typeUrl: typeUrlMsgCommitBid,
      value: {
        signer,
        auctionId,
        commitHash
      }
    };

    const response = await this.signAndBroadcast(signer, [createMsg], fee, memo);
    return this.parseResponse<MsgCommitBidResponse>(response);
  }

  public async revealBid (
    signer: string,
    auctionId: string,
    reveal: string,
    fee: StdFee | 'auto' | number,
    memo = ''
  ) {
    const createMsg: MsgRevealBidEncodeObject = {
      typeUrl: typeUrlMsgRevealBid,
      value: {
        signer,
        auctionId,
        reveal
      }
    };

    const response = await this.signAndBroadcast(signer, [createMsg], fee, memo);
    return this.parseResponse<MsgRevealBidResponse>(response);
  }

  public async setRecord (
    params: { privateKey: string, record: any, bondId: string },
    signer: string,
    fee: StdFee | 'auto' | number,
    memo = ''
  ) {
    const registryRecord = Record.fromPartial({ attributes: Buffer.from(JSON.stringify(params.record), 'binary') });

    // Sign record.
    const recordSignerAccount = new Account(Buffer.from(params.privateKey, 'hex'));
    await recordSignerAccount.init();
    const messageToSign = Util.sortJSON(params.record);
    const sig = await recordSignerAccount.signRecord(messageToSign);

    const signature = Signature.fromJSON({ sig: sig.toString('base64'), pubKey: recordSignerAccount.registryPublicKey });

    const payload = Payload.fromJSON({ record: registryRecord, signatures: [signature] });

    const createMsg: MsgSetRecordEncodeObject = {
      typeUrl: typeUrlMsgSetRecord,
      value: {
        signer,
        bondId: params.bondId,
        payload
      }
    };

    const response = await this.signAndBroadcast(signer, [createMsg], fee, memo);
    return this.parseResponse<MsgSetRecordResponse>(response);
  }

  public async setAuthorityBond (
    signer: string,
    bondId: string,
    name: string,
    fee: StdFee | 'auto' | number,
    memo = ''
  ) {
    const createMsg: MsgSetAuthorityBondEncodeObject = {
      typeUrl: typeUrlMsgSetAuthorityBond,
      value: {
        signer,
        bondId,
        name
      }
    };

    const response = await this.signAndBroadcast(signer, [createMsg], fee, memo);
    return this.parseResponse<MsgSetAuthorityBondResponse>(response);
  }

  public async setName (
    signer: string,
    lrn: string,
    cid: string,
    fee: StdFee | 'auto' | number,
    memo = ''
  ) {
    const createMsg: MsgSetNameEncodeObject = {
      typeUrl: typeUrlMsgSetName,
      value: {
        signer,
        lrn,
        cid
      }
    };

    const response = await this.signAndBroadcast(signer, [createMsg], fee, memo);
    return this.parseResponse<MsgSetNameResponse>(response);
  }

  public async deleteName (
    signer: string,
    lrn: string,
    fee: StdFee | 'auto' | number,
    memo = ''
  ) {
    const createMsg: MsgDeleteNameEncodeObject = {
      typeUrl: typeUrlMsgDeleteName,
      value: {
        signer,
        lrn
      }
    };

    const response = await this.signAndBroadcast(signer, [createMsg], fee, memo);
    return this.parseResponse<MsgDeleteNameResponse>(response);
  }

  parseResponse<T> (response: DeliverTxResponse): T {
    if (response.code !== 0) {
      // Throw error when transaction is not successful.
      throw new Error(this.processWriteError(response.rawLog || 'No raw log in response'));
    }

    return this.registry.decode(response.msgResponses[0]) as T;
  }

  processWriteError (error: string) {
    const errorMessage = NAMESERVICE_ERRORS.find(message => error.includes(message));

    if (!errorMessage) {
      console.error(error);
    }

    return errorMessage || DEFAULT_WRITE_ERROR;
  }
}
