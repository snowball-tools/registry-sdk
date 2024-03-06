
import { GeneratedType, OfflineSigner, Registry } from "@cosmjs/proto-signing";
import {
  defaultRegistryTypes,
  DeliverTxResponse,
  SigningStargateClient,
  SigningStargateClientOptions,
  StdFee,
} from "@cosmjs/stargate"
import { Comet38Client } from "@cosmjs/tendermint-rpc"

import { MsgCancelBondEncodeObject, MsgCreateBondEncodeObject, MsgRefillBondEncodeObject, MsgWithdrawBondEncodeObject, bondTypes, typeUrlMsgCancelBond, typeUrlMsgCreateBond, typeUrlMsgRefillBond, typeUrlMsgWithdrawBond } from "./types/cerc/bond/message";
import { Coin } from "./proto2/cosmos/base/v1beta1/coin";


export const laconicDefaultRegistryTypes: ReadonlyArray<[string, GeneratedType]> = [
  ...defaultRegistryTypes,
  ...bondTypes,
]

function createDefaultRegistry(): Registry {
  return new Registry(laconicDefaultRegistryTypes);
}

export class LaconicClient extends SigningStargateClient {

  public static async connectWithSigner(
    endpoint: string,
    signer: OfflineSigner,
    options: SigningStargateClientOptions = {},
  ): Promise<LaconicClient> {
    const cometClient = await Comet38Client.connect(endpoint);
    return new LaconicClient(cometClient, signer, {
      registry: createDefaultRegistry(),
      ...options,
    });
  }

  protected constructor(
    cometClient: Comet38Client,
    signer: OfflineSigner,
    options: SigningStargateClientOptions,
  ) {
    super(cometClient, signer, options);
  }

  public async createBond(
    signer: string,
    denom: string,
    amount: string,
    fee: StdFee | "auto" | number,
    memo = "",
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
      },
    };

    return this.signAndBroadcast(signer, [createMsg], fee, memo);
  }

  public async refillBond(
    signer: string,
    denom: string,
    amount: string,
    id: string,
    fee: StdFee | "auto" | number,
    memo = "",
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
      },
    };

    return this.signAndBroadcast(signer, [createMsg], fee, memo);
  }

  public async withdrawBond(
    signer: string,
    denom: string,
    amount: string,
    id: string,
    fee: StdFee | "auto" | number,
    memo = "",
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
      },
    };

    return this.signAndBroadcast(signer, [createMsg], fee, memo);
  }

  public async cancelBond(
    signer: string,
    id: string,
    fee: StdFee | "auto" | number,
    memo = "",
  ): Promise<DeliverTxResponse> {
    const createMsg: MsgCancelBondEncodeObject = {
      typeUrl: typeUrlMsgCancelBond,
      value: {
        id,
        signer
      },
    };

    return this.signAndBroadcast(signer, [createMsg], fee, memo);
  }
}
