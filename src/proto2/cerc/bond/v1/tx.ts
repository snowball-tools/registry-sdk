/* eslint-disable */
import Long from "long";
import { Coin } from "../../../cosmos/base/v1beta1/coin";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "cerc.bond.v1";

/** MsgCreateBond defines a SDK message for creating a new bond. */
export interface MsgCreateBond {
  signer: string;
  coins: Coin[];
}

/** MsgCreateBondResponse defines the Msg/CreateBond response type. */
export interface MsgCreateBondResponse {
  id: string;
}

/** MsgRefillBond defines a SDK message for refill the amount for bond. */
export interface MsgRefillBond {
  id: string;
  signer: string;
  coins: Coin[];
}

/** MsgRefillBondResponse defines the Msg/RefillBond response type. */
export interface MsgRefillBondResponse {}

/** MsgWithdrawBond defines a SDK message for withdrawing amount from bond. */
export interface MsgWithdrawBond {
  id: string;
  signer: string;
  coins: Coin[];
}

/** MsgWithdrawBondResponse defines the Msg/WithdrawBond response type. */
export interface MsgWithdrawBondResponse {}

/** MsgCancelBond defines a SDK message for the cancel the bond. */
export interface MsgCancelBond {
  id: string;
  signer: string;
}

/** MsgCancelBondResponse defines the Msg/CancelBond response type. */
export interface MsgCancelBondResponse {}

function createBaseMsgCreateBond(): MsgCreateBond {
  return { signer: "", coins: [] };
}

export const MsgCreateBond = {
  encode(
    message: MsgCreateBond,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.signer !== "") {
      writer.uint32(10).string(message.signer);
    }
    for (const v of message.coins) {
      Coin.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateBond {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateBond();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.signer = reader.string();
          break;
        case 2:
          message.coins.push(Coin.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCreateBond {
    return {
      signer: isSet(object.signer) ? String(object.signer) : "",
      coins: Array.isArray(object?.coins)
        ? object.coins.map((e: any) => Coin.fromJSON(e))
        : [],
    };
  },

  toJSON(message: MsgCreateBond): unknown {
    const obj: any = {};
    message.signer !== undefined && (obj.signer = message.signer);
    if (message.coins) {
      obj.coins = message.coins.map((e) => (e ? Coin.toJSON(e) : undefined));
    } else {
      obj.coins = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgCreateBond>, I>>(
    object: I
  ): MsgCreateBond {
    const message = createBaseMsgCreateBond();
    message.signer = object.signer ?? "";
    message.coins = object.coins?.map((e) => Coin.fromPartial(e)) || [];
    return message;
  },
};

function createBaseMsgCreateBondResponse(): MsgCreateBondResponse {
  return { id: "" };
}

export const MsgCreateBondResponse = {
  encode(
    message: MsgCreateBondResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgCreateBondResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateBondResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCreateBondResponse {
    return {
      id: isSet(object.id) ? String(object.id) : "",
    };
  },

  toJSON(message: MsgCreateBondResponse): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgCreateBondResponse>, I>>(
    object: I
  ): MsgCreateBondResponse {
    const message = createBaseMsgCreateBondResponse();
    message.id = object.id ?? "";
    return message;
  },
};

function createBaseMsgRefillBond(): MsgRefillBond {
  return { id: "", signer: "", coins: [] };
}

export const MsgRefillBond = {
  encode(
    message: MsgRefillBond,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.signer !== "") {
      writer.uint32(18).string(message.signer);
    }
    for (const v of message.coins) {
      Coin.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgRefillBond {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRefillBond();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.signer = reader.string();
          break;
        case 3:
          message.coins.push(Coin.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgRefillBond {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      signer: isSet(object.signer) ? String(object.signer) : "",
      coins: Array.isArray(object?.coins)
        ? object.coins.map((e: any) => Coin.fromJSON(e))
        : [],
    };
  },

  toJSON(message: MsgRefillBond): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.signer !== undefined && (obj.signer = message.signer);
    if (message.coins) {
      obj.coins = message.coins.map((e) => (e ? Coin.toJSON(e) : undefined));
    } else {
      obj.coins = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgRefillBond>, I>>(
    object: I
  ): MsgRefillBond {
    const message = createBaseMsgRefillBond();
    message.id = object.id ?? "";
    message.signer = object.signer ?? "";
    message.coins = object.coins?.map((e) => Coin.fromPartial(e)) || [];
    return message;
  },
};

function createBaseMsgRefillBondResponse(): MsgRefillBondResponse {
  return {};
}

export const MsgRefillBondResponse = {
  encode(
    _: MsgRefillBondResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgRefillBondResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRefillBondResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgRefillBondResponse {
    return {};
  },

  toJSON(_: MsgRefillBondResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgRefillBondResponse>, I>>(
    _: I
  ): MsgRefillBondResponse {
    const message = createBaseMsgRefillBondResponse();
    return message;
  },
};

function createBaseMsgWithdrawBond(): MsgWithdrawBond {
  return { id: "", signer: "", coins: [] };
}

export const MsgWithdrawBond = {
  encode(
    message: MsgWithdrawBond,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.signer !== "") {
      writer.uint32(18).string(message.signer);
    }
    for (const v of message.coins) {
      Coin.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgWithdrawBond {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgWithdrawBond();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.signer = reader.string();
          break;
        case 3:
          message.coins.push(Coin.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgWithdrawBond {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      signer: isSet(object.signer) ? String(object.signer) : "",
      coins: Array.isArray(object?.coins)
        ? object.coins.map((e: any) => Coin.fromJSON(e))
        : [],
    };
  },

  toJSON(message: MsgWithdrawBond): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.signer !== undefined && (obj.signer = message.signer);
    if (message.coins) {
      obj.coins = message.coins.map((e) => (e ? Coin.toJSON(e) : undefined));
    } else {
      obj.coins = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgWithdrawBond>, I>>(
    object: I
  ): MsgWithdrawBond {
    const message = createBaseMsgWithdrawBond();
    message.id = object.id ?? "";
    message.signer = object.signer ?? "";
    message.coins = object.coins?.map((e) => Coin.fromPartial(e)) || [];
    return message;
  },
};

function createBaseMsgWithdrawBondResponse(): MsgWithdrawBondResponse {
  return {};
}

export const MsgWithdrawBondResponse = {
  encode(
    _: MsgWithdrawBondResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgWithdrawBondResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgWithdrawBondResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgWithdrawBondResponse {
    return {};
  },

  toJSON(_: MsgWithdrawBondResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgWithdrawBondResponse>, I>>(
    _: I
  ): MsgWithdrawBondResponse {
    const message = createBaseMsgWithdrawBondResponse();
    return message;
  },
};

function createBaseMsgCancelBond(): MsgCancelBond {
  return { id: "", signer: "" };
}

export const MsgCancelBond = {
  encode(
    message: MsgCancelBond,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.signer !== "") {
      writer.uint32(18).string(message.signer);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCancelBond {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCancelBond();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.signer = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCancelBond {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      signer: isSet(object.signer) ? String(object.signer) : "",
    };
  },

  toJSON(message: MsgCancelBond): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.signer !== undefined && (obj.signer = message.signer);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgCancelBond>, I>>(
    object: I
  ): MsgCancelBond {
    const message = createBaseMsgCancelBond();
    message.id = object.id ?? "";
    message.signer = object.signer ?? "";
    return message;
  },
};

function createBaseMsgCancelBondResponse(): MsgCancelBondResponse {
  return {};
}

export const MsgCancelBondResponse = {
  encode(
    _: MsgCancelBondResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgCancelBondResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCancelBondResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgCancelBondResponse {
    return {};
  },

  toJSON(_: MsgCancelBondResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgCancelBondResponse>, I>>(
    _: I
  ): MsgCancelBondResponse {
    const message = createBaseMsgCancelBondResponse();
    return message;
  },
};

/** Msg defines the bond Msg service. */
export interface Msg {
  /** CreateBond defines a method for creating a new bond. */
  CreateBond(request: MsgCreateBond): Promise<MsgCreateBondResponse>;
  /** RefillBond defines a method for refilling amount for bond. */
  RefillBond(request: MsgRefillBond): Promise<MsgRefillBondResponse>;
  /** WithdrawBond defines a method for withdrawing amount from bond. */
  WithdrawBond(request: MsgWithdrawBond): Promise<MsgWithdrawBondResponse>;
  /** CancelBond defines a method for cancelling a bond. */
  CancelBond(request: MsgCancelBond): Promise<MsgCancelBondResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.CreateBond = this.CreateBond.bind(this);
    this.RefillBond = this.RefillBond.bind(this);
    this.WithdrawBond = this.WithdrawBond.bind(this);
    this.CancelBond = this.CancelBond.bind(this);
  }
  CreateBond(request: MsgCreateBond): Promise<MsgCreateBondResponse> {
    const data = MsgCreateBond.encode(request).finish();
    const promise = this.rpc.request("cerc.bond.v1.Msg", "CreateBond", data);
    return promise.then((data) =>
      MsgCreateBondResponse.decode(new _m0.Reader(data))
    );
  }

  RefillBond(request: MsgRefillBond): Promise<MsgRefillBondResponse> {
    const data = MsgRefillBond.encode(request).finish();
    const promise = this.rpc.request("cerc.bond.v1.Msg", "RefillBond", data);
    return promise.then((data) =>
      MsgRefillBondResponse.decode(new _m0.Reader(data))
    );
  }

  WithdrawBond(request: MsgWithdrawBond): Promise<MsgWithdrawBondResponse> {
    const data = MsgWithdrawBond.encode(request).finish();
    const promise = this.rpc.request("cerc.bond.v1.Msg", "WithdrawBond", data);
    return promise.then((data) =>
      MsgWithdrawBondResponse.decode(new _m0.Reader(data))
    );
  }

  CancelBond(request: MsgCancelBond): Promise<MsgCancelBondResponse> {
    const data = MsgCancelBond.encode(request).finish();
    const promise = this.rpc.request("cerc.bond.v1.Msg", "CancelBond", data);
    return promise.then((data) =>
      MsgCancelBondResponse.decode(new _m0.Reader(data))
    );
  }
}

interface Rpc {
  request(
    service: string,
    method: string,
    data: Uint8Array
  ): Promise<Uint8Array>;
}

type Builtin =
  | Date
  | Function
  | Uint8Array
  | string
  | number
  | boolean
  | undefined;

export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Long
  ? string | number | Long
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin
  ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & {
      [K in Exclude<keyof I, KeysOfUnion<P>>]: never;
    };

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
