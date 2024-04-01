/* eslint-disable */
import { Params, Bond } from "./bond";
import {
  PageRequest,
  PageResponse,
} from "../../../cosmos/base/query/v1beta1/pagination";
import Long from "long";
import { Coin } from "../../../cosmos/base/v1beta1/coin";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "cerc.bond.v1";

/** QueryParamsRequest is request for query the bond module params */
export interface QueryParamsRequest {}

/** QueryParamsResponse returns response type  of bond module params */
export interface QueryParamsResponse {
  params?: Params;
}

/** QueryBondsRequest queries bonds */
export interface QueryBondsRequest {
  /** pagination defines an optional pagination for the request. */
  pagination?: PageRequest;
}

/** QueryBondsResponse is response type for get the bonds by bond-id */
export interface QueryBondsResponse {
  bonds: Bond[];
  /** pagination defines the pagination in the response. */
  pagination?: PageResponse;
}

/** QueryGetBondById queries bond by bond id */
export interface QueryGetBondByIdRequest {
  id: string;
}

/** QueryGetBondByIdResponse returns QueryGetBondById query response */
export interface QueryGetBondByIdResponse {
  bond?: Bond;
}

/**
 * QueryGetBondsByOwnerRequest is request type for Query/GetBondsByOwner RPC
 * Method
 */
export interface QueryGetBondsByOwnerRequest {
  owner: string;
  /** pagination defines the pagination in the response. */
  pagination?: PageResponse;
}

/**
 * QueryGetBondsByOwnerResponse is response type for Query/GetBondsByOwner RPC
 * Method
 */
export interface QueryGetBondsByOwnerResponse {
  bonds: Bond[];
  /** pagination defines the pagination in the response. */
  pagination?: PageResponse;
}

/**
 * QueryGetBondModuleBalanceRequest is request type for bond module balance rpc
 * method
 */
export interface QueryGetBondModuleBalanceRequest {}

/**
 * QueryGetBondModuleBalanceResponse is the response type for bond module
 * balance rpc method
 */
export interface QueryGetBondModuleBalanceResponse {
  balance: Coin[];
}

function createBaseQueryParamsRequest(): QueryParamsRequest {
  return {};
}

export const QueryParamsRequest = {
  encode(
    _: QueryParamsRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryParamsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryParamsRequest();
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

  fromJSON(_: any): QueryParamsRequest {
    return {};
  },

  toJSON(_: QueryParamsRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryParamsRequest>, I>>(
    _: I
  ): QueryParamsRequest {
    const message = createBaseQueryParamsRequest();
    return message;
  },
};

function createBaseQueryParamsResponse(): QueryParamsResponse {
  return { params: undefined };
}

export const QueryParamsResponse = {
  encode(
    message: QueryParamsResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryParamsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryParamsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.params = Params.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryParamsResponse {
    return {
      params: isSet(object.params) ? Params.fromJSON(object.params) : undefined,
    };
  },

  toJSON(message: QueryParamsResponse): unknown {
    const obj: any = {};
    message.params !== undefined &&
      (obj.params = message.params ? Params.toJSON(message.params) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryParamsResponse>, I>>(
    object: I
  ): QueryParamsResponse {
    const message = createBaseQueryParamsResponse();
    message.params =
      object.params !== undefined && object.params !== null
        ? Params.fromPartial(object.params)
        : undefined;
    return message;
  },
};

function createBaseQueryBondsRequest(): QueryBondsRequest {
  return { pagination: undefined };
}

export const QueryBondsRequest = {
  encode(
    message: QueryBondsRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryBondsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryBondsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryBondsRequest {
    return {
      pagination: isSet(object.pagination)
        ? PageRequest.fromJSON(object.pagination)
        : undefined,
    };
  },

  toJSON(message: QueryBondsRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryBondsRequest>, I>>(
    object: I
  ): QueryBondsRequest {
    const message = createBaseQueryBondsRequest();
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageRequest.fromPartial(object.pagination)
        : undefined;
    return message;
  },
};

function createBaseQueryBondsResponse(): QueryBondsResponse {
  return { bonds: [], pagination: undefined };
}

export const QueryBondsResponse = {
  encode(
    message: QueryBondsResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.bonds) {
      Bond.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(
        message.pagination,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryBondsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryBondsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.bonds.push(Bond.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryBondsResponse {
    return {
      bonds: Array.isArray(object?.bonds)
        ? object.bonds.map((e: any) => Bond.fromJSON(e))
        : [],
      pagination: isSet(object.pagination)
        ? PageResponse.fromJSON(object.pagination)
        : undefined,
    };
  },

  toJSON(message: QueryBondsResponse): unknown {
    const obj: any = {};
    if (message.bonds) {
      obj.bonds = message.bonds.map((e) => (e ? Bond.toJSON(e) : undefined));
    } else {
      obj.bonds = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageResponse.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryBondsResponse>, I>>(
    object: I
  ): QueryBondsResponse {
    const message = createBaseQueryBondsResponse();
    message.bonds = object.bonds?.map((e) => Bond.fromPartial(e)) || [];
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageResponse.fromPartial(object.pagination)
        : undefined;
    return message;
  },
};

function createBaseQueryGetBondByIdRequest(): QueryGetBondByIdRequest {
  return { id: "" };
}

export const QueryGetBondByIdRequest = {
  encode(
    message: QueryGetBondByIdRequest,
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
  ): QueryGetBondByIdRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetBondByIdRequest();
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

  fromJSON(object: any): QueryGetBondByIdRequest {
    return {
      id: isSet(object.id) ? String(object.id) : "",
    };
  },

  toJSON(message: QueryGetBondByIdRequest): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetBondByIdRequest>, I>>(
    object: I
  ): QueryGetBondByIdRequest {
    const message = createBaseQueryGetBondByIdRequest();
    message.id = object.id ?? "";
    return message;
  },
};

function createBaseQueryGetBondByIdResponse(): QueryGetBondByIdResponse {
  return { bond: undefined };
}

export const QueryGetBondByIdResponse = {
  encode(
    message: QueryGetBondByIdResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.bond !== undefined) {
      Bond.encode(message.bond, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryGetBondByIdResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetBondByIdResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.bond = Bond.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetBondByIdResponse {
    return {
      bond: isSet(object.bond) ? Bond.fromJSON(object.bond) : undefined,
    };
  },

  toJSON(message: QueryGetBondByIdResponse): unknown {
    const obj: any = {};
    message.bond !== undefined &&
      (obj.bond = message.bond ? Bond.toJSON(message.bond) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetBondByIdResponse>, I>>(
    object: I
  ): QueryGetBondByIdResponse {
    const message = createBaseQueryGetBondByIdResponse();
    message.bond =
      object.bond !== undefined && object.bond !== null
        ? Bond.fromPartial(object.bond)
        : undefined;
    return message;
  },
};

function createBaseQueryGetBondsByOwnerRequest(): QueryGetBondsByOwnerRequest {
  return { owner: "", pagination: undefined };
}

export const QueryGetBondsByOwnerRequest = {
  encode(
    message: QueryGetBondsByOwnerRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.owner !== "") {
      writer.uint32(10).string(message.owner);
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(
        message.pagination,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryGetBondsByOwnerRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetBondsByOwnerRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.owner = reader.string();
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetBondsByOwnerRequest {
    return {
      owner: isSet(object.owner) ? String(object.owner) : "",
      pagination: isSet(object.pagination)
        ? PageResponse.fromJSON(object.pagination)
        : undefined,
    };
  },

  toJSON(message: QueryGetBondsByOwnerRequest): unknown {
    const obj: any = {};
    message.owner !== undefined && (obj.owner = message.owner);
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageResponse.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetBondsByOwnerRequest>, I>>(
    object: I
  ): QueryGetBondsByOwnerRequest {
    const message = createBaseQueryGetBondsByOwnerRequest();
    message.owner = object.owner ?? "";
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageResponse.fromPartial(object.pagination)
        : undefined;
    return message;
  },
};

function createBaseQueryGetBondsByOwnerResponse(): QueryGetBondsByOwnerResponse {
  return { bonds: [], pagination: undefined };
}

export const QueryGetBondsByOwnerResponse = {
  encode(
    message: QueryGetBondsByOwnerResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.bonds) {
      Bond.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(
        message.pagination,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryGetBondsByOwnerResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetBondsByOwnerResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.bonds.push(Bond.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetBondsByOwnerResponse {
    return {
      bonds: Array.isArray(object?.bonds)
        ? object.bonds.map((e: any) => Bond.fromJSON(e))
        : [],
      pagination: isSet(object.pagination)
        ? PageResponse.fromJSON(object.pagination)
        : undefined,
    };
  },

  toJSON(message: QueryGetBondsByOwnerResponse): unknown {
    const obj: any = {};
    if (message.bonds) {
      obj.bonds = message.bonds.map((e) => (e ? Bond.toJSON(e) : undefined));
    } else {
      obj.bonds = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageResponse.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetBondsByOwnerResponse>, I>>(
    object: I
  ): QueryGetBondsByOwnerResponse {
    const message = createBaseQueryGetBondsByOwnerResponse();
    message.bonds = object.bonds?.map((e) => Bond.fromPartial(e)) || [];
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageResponse.fromPartial(object.pagination)
        : undefined;
    return message;
  },
};

function createBaseQueryGetBondModuleBalanceRequest(): QueryGetBondModuleBalanceRequest {
  return {};
}

export const QueryGetBondModuleBalanceRequest = {
  encode(
    _: QueryGetBondModuleBalanceRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryGetBondModuleBalanceRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetBondModuleBalanceRequest();
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

  fromJSON(_: any): QueryGetBondModuleBalanceRequest {
    return {};
  },

  toJSON(_: QueryGetBondModuleBalanceRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<QueryGetBondModuleBalanceRequest>, I>
  >(_: I): QueryGetBondModuleBalanceRequest {
    const message = createBaseQueryGetBondModuleBalanceRequest();
    return message;
  },
};

function createBaseQueryGetBondModuleBalanceResponse(): QueryGetBondModuleBalanceResponse {
  return { balance: [] };
}

export const QueryGetBondModuleBalanceResponse = {
  encode(
    message: QueryGetBondModuleBalanceResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.balance) {
      Coin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryGetBondModuleBalanceResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetBondModuleBalanceResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.balance.push(Coin.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetBondModuleBalanceResponse {
    return {
      balance: Array.isArray(object?.balance)
        ? object.balance.map((e: any) => Coin.fromJSON(e))
        : [],
    };
  },

  toJSON(message: QueryGetBondModuleBalanceResponse): unknown {
    const obj: any = {};
    if (message.balance) {
      obj.balance = message.balance.map((e) =>
        e ? Coin.toJSON(e) : undefined
      );
    } else {
      obj.balance = [];
    }
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<QueryGetBondModuleBalanceResponse>, I>
  >(object: I): QueryGetBondModuleBalanceResponse {
    const message = createBaseQueryGetBondModuleBalanceResponse();
    message.balance = object.balance?.map((e) => Coin.fromPartial(e)) || [];
    return message;
  },
};

/** Query defines the gRPC querier service for bond module */
export interface Query {
  /** Params queries bonds module params. */
  Params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
  /** Bonds queries bonds list */
  Bonds(request: QueryBondsRequest): Promise<QueryBondsResponse>;
  /** GetBondById */
  GetBondById(
    request: QueryGetBondByIdRequest
  ): Promise<QueryGetBondByIdResponse>;
  /** Get Bonds list by Owner */
  GetBondsByOwner(
    request: QueryGetBondsByOwnerRequest
  ): Promise<QueryGetBondsByOwnerResponse>;
  /** Get Bond module balance */
  GetBondModuleBalance(
    request: QueryGetBondModuleBalanceRequest
  ): Promise<QueryGetBondModuleBalanceResponse>;
}

export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.Params = this.Params.bind(this);
    this.Bonds = this.Bonds.bind(this);
    this.GetBondById = this.GetBondById.bind(this);
    this.GetBondsByOwner = this.GetBondsByOwner.bind(this);
    this.GetBondModuleBalance = this.GetBondModuleBalance.bind(this);
  }
  Params(request: QueryParamsRequest): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request("cerc.bond.v1.Query", "Params", data);
    return promise.then((data) =>
      QueryParamsResponse.decode(new _m0.Reader(data))
    );
  }

  Bonds(request: QueryBondsRequest): Promise<QueryBondsResponse> {
    const data = QueryBondsRequest.encode(request).finish();
    const promise = this.rpc.request("cerc.bond.v1.Query", "Bonds", data);
    return promise.then((data) =>
      QueryBondsResponse.decode(new _m0.Reader(data))
    );
  }

  GetBondById(
    request: QueryGetBondByIdRequest
  ): Promise<QueryGetBondByIdResponse> {
    const data = QueryGetBondByIdRequest.encode(request).finish();
    const promise = this.rpc.request("cerc.bond.v1.Query", "GetBondById", data);
    return promise.then((data) =>
      QueryGetBondByIdResponse.decode(new _m0.Reader(data))
    );
  }

  GetBondsByOwner(
    request: QueryGetBondsByOwnerRequest
  ): Promise<QueryGetBondsByOwnerResponse> {
    const data = QueryGetBondsByOwnerRequest.encode(request).finish();
    const promise = this.rpc.request(
      "cerc.bond.v1.Query",
      "GetBondsByOwner",
      data
    );
    return promise.then((data) =>
      QueryGetBondsByOwnerResponse.decode(new _m0.Reader(data))
    );
  }

  GetBondModuleBalance(
    request: QueryGetBondModuleBalanceRequest
  ): Promise<QueryGetBondModuleBalanceResponse> {
    const data = QueryGetBondModuleBalanceRequest.encode(request).finish();
    const promise = this.rpc.request(
      "cerc.bond.v1.Query",
      "GetBondModuleBalance",
      data
    );
    return promise.then((data) =>
      QueryGetBondModuleBalanceResponse.decode(new _m0.Reader(data))
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
