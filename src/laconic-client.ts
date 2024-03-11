
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
import { MsgAssociateBondEncodeObject, MsgDeleteNameAuthorityEncodeObject, MsgDissociateBondEncodeObject, MsgDissociateRecordsEncodeObject, MsgReassociateRecordsEncodeObject, MsgReserveAuthorityEncodeObject, MsgSetAuthorityBondEncodeObject, MsgSetNameEncodeObject, MsgSetRecordEncodeObject, registryTypes, typeUrlMsgAssociateBond, typeUrlMsgDeleteNameAuthority, typeUrlMsgDissociateBond, typeUrlMsgDissociateRecords, typeUrlMsgReassociateRecords, typeUrlMsgReserveAuthority, typeUrlMsgSetAuthorityBond, typeUrlMsgSetName, typeUrlMsgSetRecord } from './types/cerc/registry/message';
import { MsgCommitBidEncodeObject, MsgRevealBidEncodeObject, auctionTypes, typeUrlMsgCommitBid, typeUrlMsgRevealBid } from './types/cerc/auction/message';
import { Payload } from './proto2/cerc/registry/v1/tx';
import { Record, Signature } from './proto2/cerc/registry/v1/registry';
import { Account } from './account';
import { Util } from './util';

export const laconicDefaultRegistryTypes: ReadonlyArray<[string, GeneratedType]> = [
  ...defaultRegistryTypes,
  ...bondTypes,
  ...registryTypes,
  ...auctionTypes
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
  ): Promise<DeliverTxResponse> {
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

    return this.signAndBroadcast(signer, [createMsg], fee, memo);
  }

  public async refillBond (
    signer: string,
    denom: string,
    amount: string,
    id: string,
    fee: StdFee | 'auto' | number,
    memo = ''
  ): Promise<DeliverTxResponse> {
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

    return this.signAndBroadcast(signer, [createMsg], fee, memo);
  }

  public async withdrawBond (
    signer: string,
    denom: string,
    amount: string,
    id: string,
    fee: StdFee | 'auto' | number,
    memo = ''
  ): Promise<DeliverTxResponse> {
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

    return this.signAndBroadcast(signer, [createMsg], fee, memo);
  }

  public async cancelBond (
    signer: string,
    id: string,
    fee: StdFee | 'auto' | number,
    memo = ''
  ): Promise<DeliverTxResponse> {
    const createMsg: MsgCancelBondEncodeObject = {
      typeUrl: typeUrlMsgCancelBond,
      value: {
        id,
        signer
      }
    };

    return this.signAndBroadcast(signer, [createMsg], fee, memo);
  }

  public async associateBond (
    signer: string,
    recordId: string,
    bondId: string,
    fee: StdFee | 'auto' | number,
    memo = ''
  ): Promise<DeliverTxResponse> {
    const createMsg: MsgAssociateBondEncodeObject = {
      typeUrl: typeUrlMsgAssociateBond,
      value: {
        recordId,
        bondId,
        signer
      }
    };

    return this.signAndBroadcast(signer, [createMsg], fee, memo);
  }

  public async dissociateBond (
    signer: string,
    recordId: string,
    fee: StdFee | 'auto' | number,
    memo = ''
  ): Promise<DeliverTxResponse> {
    const createMsg: MsgDissociateBondEncodeObject = {
      typeUrl: typeUrlMsgDissociateBond,
      value: {
        recordId,
        signer
      }
    };

    return this.signAndBroadcast(signer, [createMsg], fee, memo);
  }

  public async dissociateRecords (
    signer: string,
    bondId: string,
    fee: StdFee | 'auto' | number,
    memo = ''
  ): Promise<DeliverTxResponse> {
    const createMsg: MsgDissociateRecordsEncodeObject = {
      typeUrl: typeUrlMsgDissociateRecords,
      value: {
        signer,
        bondId
      }
    };

    return this.signAndBroadcast(signer, [createMsg], fee, memo);
  }

  public async reassociateRecords (
    signer: string,
    oldBondId: string,
    newBondId: string,
    fee: StdFee | 'auto' | number,
    memo = ''
  ): Promise<DeliverTxResponse> {
    const createMsg: MsgReassociateRecordsEncodeObject = {
      typeUrl: typeUrlMsgReassociateRecords,
      value: {
        signer,
        oldBondId,
        newBondId
      }
    };

    return this.signAndBroadcast(signer, [createMsg], fee, memo);
  }

  public async reserveAuthority (
    signer: string,
    name: string,
    owner: string,
    fee: StdFee | 'auto' | number,
    memo = ''
  ): Promise<DeliverTxResponse> {
    const createMsg: MsgReserveAuthorityEncodeObject = {
      typeUrl: typeUrlMsgReserveAuthority,
      value: {
        name,
        signer,
        owner
      }
    };

    return this.signAndBroadcast(signer, [createMsg], fee, memo);
  }

  public async commitBid (
    signer: string,
    auctionId: string,
    commitHash: string,
    fee: StdFee | 'auto' | number,
    memo = ''
  ): Promise<DeliverTxResponse> {
    const createMsg: MsgCommitBidEncodeObject = {
      typeUrl: typeUrlMsgCommitBid,
      value: {
        signer,
        auctionId,
        commitHash
      }
    };

    return this.signAndBroadcast(signer, [createMsg], fee, memo);
  }

  public async revealBid (
    signer: string,
    auctionId: string,
    reveal: string,
    fee: StdFee | 'auto' | number,
    memo = ''
  ): Promise<DeliverTxResponse> {
    const createMsg: MsgRevealBidEncodeObject = {
      typeUrl: typeUrlMsgRevealBid,
      value: {
        signer,
        auctionId,
        reveal
      }
    };

    return this.signAndBroadcast(signer, [createMsg], fee, memo);
  }

  public async setRecord (
    params: { privateKey: string, record: any, bondId: string },
    signer: string,
    fee: StdFee | 'auto' | number,
    memo = ''
  ): Promise<DeliverTxResponse> {
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

    return this.signAndBroadcast(signer, [createMsg], fee, memo);
  }

  public async setAuthorityBond (
    signer: string,
    bondId: string,
    name: string,
    fee: StdFee | 'auto' | number,
    memo = ''
  ): Promise<DeliverTxResponse> {
    const createMsg: MsgSetAuthorityBondEncodeObject = {
      typeUrl: typeUrlMsgSetAuthorityBond,
      value: {
        signer,
        bondId,
        name
      }
    };

    return this.signAndBroadcast(signer, [createMsg], fee, memo);
  }

  public async setName (
    signer: string,
    lrn: string,
    cid: string,
    fee: StdFee | 'auto' | number,
    memo = ''
  ): Promise<DeliverTxResponse> {
    const createMsg: MsgSetNameEncodeObject = {
      typeUrl: typeUrlMsgSetName,
      value: {
        signer,
        lrn,
        cid
      }
    };

    return this.signAndBroadcast(signer, [createMsg], fee, memo);
  }

  public async deleteName (
    signer: string,
    lrn: string,
    fee: StdFee | 'auto' | number,
    memo = ''
  ): Promise<DeliverTxResponse> {
    const createMsg: MsgDeleteNameAuthorityEncodeObject = {
      typeUrl: typeUrlMsgDeleteNameAuthority,
      value: {
        signer,
        lrn
      }
    };

    return this.signAndBroadcast(signer, [createMsg], fee, memo);
  }
}
