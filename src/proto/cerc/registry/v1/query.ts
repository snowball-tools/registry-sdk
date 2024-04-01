/* eslint-disable */
import {
  Params,
  Record,
  NameAuthority,
  NameRecord,
  NameEntry,
} from "./registry";
import {
  PageRequest,
  PageResponse,
} from "../../../cosmos/base/query/v1beta1/pagination";
import Long from "long";
import { Coin } from "../../../cosmos/base/v1beta1/coin";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "cerc.registry.v1";

/** QueryParamsRequest is request type for registry params */
export interface QueryParamsRequest {}

/** QueryParamsResponse is response type for registry params */
export interface QueryParamsResponse {
  params?: Params;
}

/** QueryRecordsRequest is request type for registry records list */
export interface QueryRecordsRequest {
  attributes: QueryRecordsRequest_KeyValueInput[];
  all: boolean;
  /** pagination defines an optional pagination for the request. */
  pagination?: PageRequest;
}

/** Array type attribute */
export interface QueryRecordsRequest_ArrayInput {
  values: QueryRecordsRequest_ValueInput[];
}

/** Map type attribute */
export interface QueryRecordsRequest_MapInput {
  values: { [key: string]: QueryRecordsRequest_ValueInput };
}

export interface QueryRecordsRequest_MapInput_ValuesEntry {
  key: string;
  value?: QueryRecordsRequest_ValueInput;
}

/** Type for record attribute value */
export interface QueryRecordsRequest_ValueInput {
  string: string | undefined;
  int: Long | undefined;
  float: number | undefined;
  boolean: boolean | undefined;
  link: string | undefined;
  array?: QueryRecordsRequest_ArrayInput | undefined;
  map?: QueryRecordsRequest_MapInput | undefined;
}

/** Type for record attribute key */
export interface QueryRecordsRequest_KeyValueInput {
  key: string;
  value?: QueryRecordsRequest_ValueInput;
}

/** QueryRecordsResponse is response type for registry records list */
export interface QueryRecordsResponse {
  records: Record[];
  /** pagination defines the pagination in the response. */
  pagination?: PageResponse;
}

/** QueryGetRecordRequest is request type for registry records by id */
export interface QueryGetRecordRequest {
  id: string;
}

/** QueryGetRecordResponse is response type for registry records by id */
export interface QueryGetRecordResponse {
  record?: Record;
}

/** QueryGetRecordsByBondIdRequest is request type for get the records by bond-id */
export interface QueryGetRecordsByBondIdRequest {
  id: string;
  /** pagination defines an optional pagination for the request. */
  pagination?: PageRequest;
}

/** QueryGetRecordsByBondIdResponse is response type for records list by bond-id */
export interface QueryGetRecordsByBondIdResponse {
  records: Record[];
  /** pagination defines the pagination in the response. */
  pagination?: PageResponse;
}

/** QueryNameRecordsRequest is request type for registry names records */
export interface QueryNameRecordsRequest {
  /** pagination defines an optional pagination for the request. */
  pagination?: PageRequest;
}

/** QueryNameRecordsResponse is response type for registry names records */
export interface QueryNameRecordsResponse {
  names: NameEntry[];
  /** pagination defines the pagination in the response. */
  pagination?: PageResponse;
}

/** QueryWhoisRequest is request type for Get NameAuthority */
export interface QueryWhoisRequest {
  name: string;
}

/** QueryWhoisResponse is response type for whois request */
export interface QueryWhoisResponse {
  nameAuthority?: NameAuthority;
}

/** QueryLookupLrnRequest is request type for LookupLrn */
export interface QueryLookupLrnRequest {
  lrn: string;
}

/** QueryLookupLrnResponse is response type for QueryLookupLrnRequest */
export interface QueryLookupLrnResponse {
  name?: NameRecord;
}

/** QueryResolveLrnRequest is request type for ResolveLrn */
export interface QueryResolveLrnRequest {
  lrn: string;
}

/** QueryResolveLrnResponse is response type for QueryResolveLrnRequest */
export interface QueryResolveLrnResponse {
  record?: Record;
}

/**
 * QueryGetRegistryModuleBalanceRequest is request type for registry module
 * accounts balance
 */
export interface QueryGetRegistryModuleBalanceRequest {}

/**
 * QueryGetRegistryModuleBalanceResponse is response type for registry module
 * accounts balance
 */
export interface QueryGetRegistryModuleBalanceResponse {
  balances: AccountBalance[];
}

/** AccountBalance is registry module account balance */
export interface AccountBalance {
  accountName: string;
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

function createBaseQueryRecordsRequest(): QueryRecordsRequest {
  return { attributes: [], all: false, pagination: undefined };
}

export const QueryRecordsRequest = {
  encode(
    message: QueryRecordsRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.attributes) {
      QueryRecordsRequest_KeyValueInput.encode(
        v!,
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.all === true) {
      writer.uint32(16).bool(message.all);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryRecordsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryRecordsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.attributes.push(
            QueryRecordsRequest_KeyValueInput.decode(reader, reader.uint32())
          );
          break;
        case 2:
          message.all = reader.bool();
          break;
        case 3:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryRecordsRequest {
    return {
      attributes: Array.isArray(object?.attributes)
        ? object.attributes.map((e: any) =>
            QueryRecordsRequest_KeyValueInput.fromJSON(e)
          )
        : [],
      all: isSet(object.all) ? Boolean(object.all) : false,
      pagination: isSet(object.pagination)
        ? PageRequest.fromJSON(object.pagination)
        : undefined,
    };
  },

  toJSON(message: QueryRecordsRequest): unknown {
    const obj: any = {};
    if (message.attributes) {
      obj.attributes = message.attributes.map((e) =>
        e ? QueryRecordsRequest_KeyValueInput.toJSON(e) : undefined
      );
    } else {
      obj.attributes = [];
    }
    message.all !== undefined && (obj.all = message.all);
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryRecordsRequest>, I>>(
    object: I
  ): QueryRecordsRequest {
    const message = createBaseQueryRecordsRequest();
    message.attributes =
      object.attributes?.map((e) =>
        QueryRecordsRequest_KeyValueInput.fromPartial(e)
      ) || [];
    message.all = object.all ?? false;
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageRequest.fromPartial(object.pagination)
        : undefined;
    return message;
  },
};

function createBaseQueryRecordsRequest_ArrayInput(): QueryRecordsRequest_ArrayInput {
  return { values: [] };
}

export const QueryRecordsRequest_ArrayInput = {
  encode(
    message: QueryRecordsRequest_ArrayInput,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.values) {
      QueryRecordsRequest_ValueInput.encode(
        v!,
        writer.uint32(10).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryRecordsRequest_ArrayInput {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryRecordsRequest_ArrayInput();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.values.push(
            QueryRecordsRequest_ValueInput.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryRecordsRequest_ArrayInput {
    return {
      values: Array.isArray(object?.values)
        ? object.values.map((e: any) =>
            QueryRecordsRequest_ValueInput.fromJSON(e)
          )
        : [],
    };
  },

  toJSON(message: QueryRecordsRequest_ArrayInput): unknown {
    const obj: any = {};
    if (message.values) {
      obj.values = message.values.map((e) =>
        e ? QueryRecordsRequest_ValueInput.toJSON(e) : undefined
      );
    } else {
      obj.values = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryRecordsRequest_ArrayInput>, I>>(
    object: I
  ): QueryRecordsRequest_ArrayInput {
    const message = createBaseQueryRecordsRequest_ArrayInput();
    message.values =
      object.values?.map((e) =>
        QueryRecordsRequest_ValueInput.fromPartial(e)
      ) || [];
    return message;
  },
};

function createBaseQueryRecordsRequest_MapInput(): QueryRecordsRequest_MapInput {
  return { values: {} };
}

export const QueryRecordsRequest_MapInput = {
  encode(
    message: QueryRecordsRequest_MapInput,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    Object.entries(message.values).forEach(([key, value]) => {
      QueryRecordsRequest_MapInput_ValuesEntry.encode(
        { key: key as any, value },
        writer.uint32(10).fork()
      ).ldelim();
    });
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryRecordsRequest_MapInput {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryRecordsRequest_MapInput();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          const entry1 = QueryRecordsRequest_MapInput_ValuesEntry.decode(
            reader,
            reader.uint32()
          );
          if (entry1.value !== undefined) {
            message.values[entry1.key] = entry1.value;
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryRecordsRequest_MapInput {
    return {
      values: isObject(object.values)
        ? Object.entries(object.values).reduce<{
            [key: string]: QueryRecordsRequest_ValueInput;
          }>((acc, [key, value]) => {
            acc[key] = QueryRecordsRequest_ValueInput.fromJSON(value);
            return acc;
          }, {})
        : {},
    };
  },

  toJSON(message: QueryRecordsRequest_MapInput): unknown {
    const obj: any = {};
    obj.values = {};
    if (message.values) {
      Object.entries(message.values).forEach(([k, v]) => {
        obj.values[k] = QueryRecordsRequest_ValueInput.toJSON(v);
      });
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryRecordsRequest_MapInput>, I>>(
    object: I
  ): QueryRecordsRequest_MapInput {
    const message = createBaseQueryRecordsRequest_MapInput();
    message.values = Object.entries(object.values ?? {}).reduce<{
      [key: string]: QueryRecordsRequest_ValueInput;
    }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = QueryRecordsRequest_ValueInput.fromPartial(value);
      }
      return acc;
    }, {});
    return message;
  },
};

function createBaseQueryRecordsRequest_MapInput_ValuesEntry(): QueryRecordsRequest_MapInput_ValuesEntry {
  return { key: "", value: undefined };
}

export const QueryRecordsRequest_MapInput_ValuesEntry = {
  encode(
    message: QueryRecordsRequest_MapInput_ValuesEntry,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== undefined) {
      QueryRecordsRequest_ValueInput.encode(
        message.value,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryRecordsRequest_MapInput_ValuesEntry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryRecordsRequest_MapInput_ValuesEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = QueryRecordsRequest_ValueInput.decode(
            reader,
            reader.uint32()
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryRecordsRequest_MapInput_ValuesEntry {
    return {
      key: isSet(object.key) ? String(object.key) : "",
      value: isSet(object.value)
        ? QueryRecordsRequest_ValueInput.fromJSON(object.value)
        : undefined,
    };
  },

  toJSON(message: QueryRecordsRequest_MapInput_ValuesEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined &&
      (obj.value = message.value
        ? QueryRecordsRequest_ValueInput.toJSON(message.value)
        : undefined);
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<QueryRecordsRequest_MapInput_ValuesEntry>, I>
  >(object: I): QueryRecordsRequest_MapInput_ValuesEntry {
    const message = createBaseQueryRecordsRequest_MapInput_ValuesEntry();
    message.key = object.key ?? "";
    message.value =
      object.value !== undefined && object.value !== null
        ? QueryRecordsRequest_ValueInput.fromPartial(object.value)
        : undefined;
    return message;
  },
};

function createBaseQueryRecordsRequest_ValueInput(): QueryRecordsRequest_ValueInput {
  return {
    string: undefined,
    int: undefined,
    float: undefined,
    boolean: undefined,
    link: undefined,
    array: undefined,
    map: undefined,
  };
}

export const QueryRecordsRequest_ValueInput = {
  encode(
    message: QueryRecordsRequest_ValueInput,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.string !== undefined) {
      writer.uint32(10).string(message.string);
    }
    if (message.int !== undefined) {
      writer.uint32(16).int64(message.int);
    }
    if (message.float !== undefined) {
      writer.uint32(25).double(message.float);
    }
    if (message.boolean !== undefined) {
      writer.uint32(32).bool(message.boolean);
    }
    if (message.link !== undefined) {
      writer.uint32(42).string(message.link);
    }
    if (message.array !== undefined) {
      QueryRecordsRequest_ArrayInput.encode(
        message.array,
        writer.uint32(50).fork()
      ).ldelim();
    }
    if (message.map !== undefined) {
      QueryRecordsRequest_MapInput.encode(
        message.map,
        writer.uint32(58).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryRecordsRequest_ValueInput {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryRecordsRequest_ValueInput();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.string = reader.string();
          break;
        case 2:
          message.int = reader.int64() as Long;
          break;
        case 3:
          message.float = reader.double();
          break;
        case 4:
          message.boolean = reader.bool();
          break;
        case 5:
          message.link = reader.string();
          break;
        case 6:
          message.array = QueryRecordsRequest_ArrayInput.decode(
            reader,
            reader.uint32()
          );
          break;
        case 7:
          message.map = QueryRecordsRequest_MapInput.decode(
            reader,
            reader.uint32()
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryRecordsRequest_ValueInput {
    return {
      string: isSet(object.string) ? String(object.string) : undefined,
      int: isSet(object.int) ? Long.fromValue(object.int) : undefined,
      float: isSet(object.float) ? Number(object.float) : undefined,
      boolean: isSet(object.boolean) ? Boolean(object.boolean) : undefined,
      link: isSet(object.link) ? String(object.link) : undefined,
      array: isSet(object.array)
        ? QueryRecordsRequest_ArrayInput.fromJSON(object.array)
        : undefined,
      map: isSet(object.map)
        ? QueryRecordsRequest_MapInput.fromJSON(object.map)
        : undefined,
    };
  },

  toJSON(message: QueryRecordsRequest_ValueInput): unknown {
    const obj: any = {};
    message.string !== undefined && (obj.string = message.string);
    message.int !== undefined &&
      (obj.int = (message.int || undefined).toString());
    message.float !== undefined && (obj.float = message.float);
    message.boolean !== undefined && (obj.boolean = message.boolean);
    message.link !== undefined && (obj.link = message.link);
    message.array !== undefined &&
      (obj.array = message.array
        ? QueryRecordsRequest_ArrayInput.toJSON(message.array)
        : undefined);
    message.map !== undefined &&
      (obj.map = message.map
        ? QueryRecordsRequest_MapInput.toJSON(message.map)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryRecordsRequest_ValueInput>, I>>(
    object: I
  ): QueryRecordsRequest_ValueInput {
    const message = createBaseQueryRecordsRequest_ValueInput();
    message.string = object.string ?? undefined;
    message.int =
      object.int !== undefined && object.int !== null
        ? Long.fromValue(object.int)
        : undefined;
    message.float = object.float ?? undefined;
    message.boolean = object.boolean ?? undefined;
    message.link = object.link ?? undefined;
    message.array =
      object.array !== undefined && object.array !== null
        ? QueryRecordsRequest_ArrayInput.fromPartial(object.array)
        : undefined;
    message.map =
      object.map !== undefined && object.map !== null
        ? QueryRecordsRequest_MapInput.fromPartial(object.map)
        : undefined;
    return message;
  },
};

function createBaseQueryRecordsRequest_KeyValueInput(): QueryRecordsRequest_KeyValueInput {
  return { key: "", value: undefined };
}

export const QueryRecordsRequest_KeyValueInput = {
  encode(
    message: QueryRecordsRequest_KeyValueInput,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== undefined) {
      QueryRecordsRequest_ValueInput.encode(
        message.value,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryRecordsRequest_KeyValueInput {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryRecordsRequest_KeyValueInput();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = QueryRecordsRequest_ValueInput.decode(
            reader,
            reader.uint32()
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryRecordsRequest_KeyValueInput {
    return {
      key: isSet(object.key) ? String(object.key) : "",
      value: isSet(object.value)
        ? QueryRecordsRequest_ValueInput.fromJSON(object.value)
        : undefined,
    };
  },

  toJSON(message: QueryRecordsRequest_KeyValueInput): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined &&
      (obj.value = message.value
        ? QueryRecordsRequest_ValueInput.toJSON(message.value)
        : undefined);
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<QueryRecordsRequest_KeyValueInput>, I>
  >(object: I): QueryRecordsRequest_KeyValueInput {
    const message = createBaseQueryRecordsRequest_KeyValueInput();
    message.key = object.key ?? "";
    message.value =
      object.value !== undefined && object.value !== null
        ? QueryRecordsRequest_ValueInput.fromPartial(object.value)
        : undefined;
    return message;
  },
};

function createBaseQueryRecordsResponse(): QueryRecordsResponse {
  return { records: [], pagination: undefined };
}

export const QueryRecordsResponse = {
  encode(
    message: QueryRecordsResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.records) {
      Record.encode(v!, writer.uint32(10).fork()).ldelim();
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
  ): QueryRecordsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryRecordsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.records.push(Record.decode(reader, reader.uint32()));
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

  fromJSON(object: any): QueryRecordsResponse {
    return {
      records: Array.isArray(object?.records)
        ? object.records.map((e: any) => Record.fromJSON(e))
        : [],
      pagination: isSet(object.pagination)
        ? PageResponse.fromJSON(object.pagination)
        : undefined,
    };
  },

  toJSON(message: QueryRecordsResponse): unknown {
    const obj: any = {};
    if (message.records) {
      obj.records = message.records.map((e) =>
        e ? Record.toJSON(e) : undefined
      );
    } else {
      obj.records = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageResponse.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryRecordsResponse>, I>>(
    object: I
  ): QueryRecordsResponse {
    const message = createBaseQueryRecordsResponse();
    message.records = object.records?.map((e) => Record.fromPartial(e)) || [];
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageResponse.fromPartial(object.pagination)
        : undefined;
    return message;
  },
};

function createBaseQueryGetRecordRequest(): QueryGetRecordRequest {
  return { id: "" };
}

export const QueryGetRecordRequest = {
  encode(
    message: QueryGetRecordRequest,
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
  ): QueryGetRecordRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetRecordRequest();
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

  fromJSON(object: any): QueryGetRecordRequest {
    return {
      id: isSet(object.id) ? String(object.id) : "",
    };
  },

  toJSON(message: QueryGetRecordRequest): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetRecordRequest>, I>>(
    object: I
  ): QueryGetRecordRequest {
    const message = createBaseQueryGetRecordRequest();
    message.id = object.id ?? "";
    return message;
  },
};

function createBaseQueryGetRecordResponse(): QueryGetRecordResponse {
  return { record: undefined };
}

export const QueryGetRecordResponse = {
  encode(
    message: QueryGetRecordResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.record !== undefined) {
      Record.encode(message.record, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryGetRecordResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetRecordResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.record = Record.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetRecordResponse {
    return {
      record: isSet(object.record) ? Record.fromJSON(object.record) : undefined,
    };
  },

  toJSON(message: QueryGetRecordResponse): unknown {
    const obj: any = {};
    message.record !== undefined &&
      (obj.record = message.record ? Record.toJSON(message.record) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetRecordResponse>, I>>(
    object: I
  ): QueryGetRecordResponse {
    const message = createBaseQueryGetRecordResponse();
    message.record =
      object.record !== undefined && object.record !== null
        ? Record.fromPartial(object.record)
        : undefined;
    return message;
  },
};

function createBaseQueryGetRecordsByBondIdRequest(): QueryGetRecordsByBondIdRequest {
  return { id: "", pagination: undefined };
}

export const QueryGetRecordsByBondIdRequest = {
  encode(
    message: QueryGetRecordsByBondIdRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryGetRecordsByBondIdRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetRecordsByBondIdRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetRecordsByBondIdRequest {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      pagination: isSet(object.pagination)
        ? PageRequest.fromJSON(object.pagination)
        : undefined,
    };
  },

  toJSON(message: QueryGetRecordsByBondIdRequest): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetRecordsByBondIdRequest>, I>>(
    object: I
  ): QueryGetRecordsByBondIdRequest {
    const message = createBaseQueryGetRecordsByBondIdRequest();
    message.id = object.id ?? "";
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageRequest.fromPartial(object.pagination)
        : undefined;
    return message;
  },
};

function createBaseQueryGetRecordsByBondIdResponse(): QueryGetRecordsByBondIdResponse {
  return { records: [], pagination: undefined };
}

export const QueryGetRecordsByBondIdResponse = {
  encode(
    message: QueryGetRecordsByBondIdResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.records) {
      Record.encode(v!, writer.uint32(10).fork()).ldelim();
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
  ): QueryGetRecordsByBondIdResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetRecordsByBondIdResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.records.push(Record.decode(reader, reader.uint32()));
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

  fromJSON(object: any): QueryGetRecordsByBondIdResponse {
    return {
      records: Array.isArray(object?.records)
        ? object.records.map((e: any) => Record.fromJSON(e))
        : [],
      pagination: isSet(object.pagination)
        ? PageResponse.fromJSON(object.pagination)
        : undefined,
    };
  },

  toJSON(message: QueryGetRecordsByBondIdResponse): unknown {
    const obj: any = {};
    if (message.records) {
      obj.records = message.records.map((e) =>
        e ? Record.toJSON(e) : undefined
      );
    } else {
      obj.records = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageResponse.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetRecordsByBondIdResponse>, I>>(
    object: I
  ): QueryGetRecordsByBondIdResponse {
    const message = createBaseQueryGetRecordsByBondIdResponse();
    message.records = object.records?.map((e) => Record.fromPartial(e)) || [];
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageResponse.fromPartial(object.pagination)
        : undefined;
    return message;
  },
};

function createBaseQueryNameRecordsRequest(): QueryNameRecordsRequest {
  return { pagination: undefined };
}

export const QueryNameRecordsRequest = {
  encode(
    message: QueryNameRecordsRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryNameRecordsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryNameRecordsRequest();
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

  fromJSON(object: any): QueryNameRecordsRequest {
    return {
      pagination: isSet(object.pagination)
        ? PageRequest.fromJSON(object.pagination)
        : undefined,
    };
  },

  toJSON(message: QueryNameRecordsRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryNameRecordsRequest>, I>>(
    object: I
  ): QueryNameRecordsRequest {
    const message = createBaseQueryNameRecordsRequest();
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageRequest.fromPartial(object.pagination)
        : undefined;
    return message;
  },
};

function createBaseQueryNameRecordsResponse(): QueryNameRecordsResponse {
  return { names: [], pagination: undefined };
}

export const QueryNameRecordsResponse = {
  encode(
    message: QueryNameRecordsResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.names) {
      NameEntry.encode(v!, writer.uint32(10).fork()).ldelim();
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
  ): QueryNameRecordsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryNameRecordsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.names.push(NameEntry.decode(reader, reader.uint32()));
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

  fromJSON(object: any): QueryNameRecordsResponse {
    return {
      names: Array.isArray(object?.names)
        ? object.names.map((e: any) => NameEntry.fromJSON(e))
        : [],
      pagination: isSet(object.pagination)
        ? PageResponse.fromJSON(object.pagination)
        : undefined,
    };
  },

  toJSON(message: QueryNameRecordsResponse): unknown {
    const obj: any = {};
    if (message.names) {
      obj.names = message.names.map((e) =>
        e ? NameEntry.toJSON(e) : undefined
      );
    } else {
      obj.names = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageResponse.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryNameRecordsResponse>, I>>(
    object: I
  ): QueryNameRecordsResponse {
    const message = createBaseQueryNameRecordsResponse();
    message.names = object.names?.map((e) => NameEntry.fromPartial(e)) || [];
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageResponse.fromPartial(object.pagination)
        : undefined;
    return message;
  },
};

function createBaseQueryWhoisRequest(): QueryWhoisRequest {
  return { name: "" };
}

export const QueryWhoisRequest = {
  encode(
    message: QueryWhoisRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryWhoisRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryWhoisRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryWhoisRequest {
    return {
      name: isSet(object.name) ? String(object.name) : "",
    };
  },

  toJSON(message: QueryWhoisRequest): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryWhoisRequest>, I>>(
    object: I
  ): QueryWhoisRequest {
    const message = createBaseQueryWhoisRequest();
    message.name = object.name ?? "";
    return message;
  },
};

function createBaseQueryWhoisResponse(): QueryWhoisResponse {
  return { nameAuthority: undefined };
}

export const QueryWhoisResponse = {
  encode(
    message: QueryWhoisResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.nameAuthority !== undefined) {
      NameAuthority.encode(
        message.nameAuthority,
        writer.uint32(10).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryWhoisResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryWhoisResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.nameAuthority = NameAuthority.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryWhoisResponse {
    return {
      nameAuthority: isSet(object.nameAuthority)
        ? NameAuthority.fromJSON(object.nameAuthority)
        : undefined,
    };
  },

  toJSON(message: QueryWhoisResponse): unknown {
    const obj: any = {};
    message.nameAuthority !== undefined &&
      (obj.nameAuthority = message.nameAuthority
        ? NameAuthority.toJSON(message.nameAuthority)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryWhoisResponse>, I>>(
    object: I
  ): QueryWhoisResponse {
    const message = createBaseQueryWhoisResponse();
    message.nameAuthority =
      object.nameAuthority !== undefined && object.nameAuthority !== null
        ? NameAuthority.fromPartial(object.nameAuthority)
        : undefined;
    return message;
  },
};

function createBaseQueryLookupLrnRequest(): QueryLookupLrnRequest {
  return { lrn: "" };
}

export const QueryLookupLrnRequest = {
  encode(
    message: QueryLookupLrnRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.lrn !== "") {
      writer.uint32(10).string(message.lrn);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryLookupLrnRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryLookupLrnRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.lrn = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryLookupLrnRequest {
    return {
      lrn: isSet(object.lrn) ? String(object.lrn) : "",
    };
  },

  toJSON(message: QueryLookupLrnRequest): unknown {
    const obj: any = {};
    message.lrn !== undefined && (obj.lrn = message.lrn);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryLookupLrnRequest>, I>>(
    object: I
  ): QueryLookupLrnRequest {
    const message = createBaseQueryLookupLrnRequest();
    message.lrn = object.lrn ?? "";
    return message;
  },
};

function createBaseQueryLookupLrnResponse(): QueryLookupLrnResponse {
  return { name: undefined };
}

export const QueryLookupLrnResponse = {
  encode(
    message: QueryLookupLrnResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.name !== undefined) {
      NameRecord.encode(message.name, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryLookupLrnResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryLookupLrnResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = NameRecord.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryLookupLrnResponse {
    return {
      name: isSet(object.name) ? NameRecord.fromJSON(object.name) : undefined,
    };
  },

  toJSON(message: QueryLookupLrnResponse): unknown {
    const obj: any = {};
    message.name !== undefined &&
      (obj.name = message.name ? NameRecord.toJSON(message.name) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryLookupLrnResponse>, I>>(
    object: I
  ): QueryLookupLrnResponse {
    const message = createBaseQueryLookupLrnResponse();
    message.name =
      object.name !== undefined && object.name !== null
        ? NameRecord.fromPartial(object.name)
        : undefined;
    return message;
  },
};

function createBaseQueryResolveLrnRequest(): QueryResolveLrnRequest {
  return { lrn: "" };
}

export const QueryResolveLrnRequest = {
  encode(
    message: QueryResolveLrnRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.lrn !== "") {
      writer.uint32(10).string(message.lrn);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryResolveLrnRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryResolveLrnRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.lrn = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryResolveLrnRequest {
    return {
      lrn: isSet(object.lrn) ? String(object.lrn) : "",
    };
  },

  toJSON(message: QueryResolveLrnRequest): unknown {
    const obj: any = {};
    message.lrn !== undefined && (obj.lrn = message.lrn);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryResolveLrnRequest>, I>>(
    object: I
  ): QueryResolveLrnRequest {
    const message = createBaseQueryResolveLrnRequest();
    message.lrn = object.lrn ?? "";
    return message;
  },
};

function createBaseQueryResolveLrnResponse(): QueryResolveLrnResponse {
  return { record: undefined };
}

export const QueryResolveLrnResponse = {
  encode(
    message: QueryResolveLrnResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.record !== undefined) {
      Record.encode(message.record, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryResolveLrnResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryResolveLrnResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.record = Record.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryResolveLrnResponse {
    return {
      record: isSet(object.record) ? Record.fromJSON(object.record) : undefined,
    };
  },

  toJSON(message: QueryResolveLrnResponse): unknown {
    const obj: any = {};
    message.record !== undefined &&
      (obj.record = message.record ? Record.toJSON(message.record) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryResolveLrnResponse>, I>>(
    object: I
  ): QueryResolveLrnResponse {
    const message = createBaseQueryResolveLrnResponse();
    message.record =
      object.record !== undefined && object.record !== null
        ? Record.fromPartial(object.record)
        : undefined;
    return message;
  },
};

function createBaseQueryGetRegistryModuleBalanceRequest(): QueryGetRegistryModuleBalanceRequest {
  return {};
}

export const QueryGetRegistryModuleBalanceRequest = {
  encode(
    _: QueryGetRegistryModuleBalanceRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryGetRegistryModuleBalanceRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetRegistryModuleBalanceRequest();
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

  fromJSON(_: any): QueryGetRegistryModuleBalanceRequest {
    return {};
  },

  toJSON(_: QueryGetRegistryModuleBalanceRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<QueryGetRegistryModuleBalanceRequest>, I>
  >(_: I): QueryGetRegistryModuleBalanceRequest {
    const message = createBaseQueryGetRegistryModuleBalanceRequest();
    return message;
  },
};

function createBaseQueryGetRegistryModuleBalanceResponse(): QueryGetRegistryModuleBalanceResponse {
  return { balances: [] };
}

export const QueryGetRegistryModuleBalanceResponse = {
  encode(
    message: QueryGetRegistryModuleBalanceResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.balances) {
      AccountBalance.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryGetRegistryModuleBalanceResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetRegistryModuleBalanceResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.balances.push(AccountBalance.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetRegistryModuleBalanceResponse {
    return {
      balances: Array.isArray(object?.balances)
        ? object.balances.map((e: any) => AccountBalance.fromJSON(e))
        : [],
    };
  },

  toJSON(message: QueryGetRegistryModuleBalanceResponse): unknown {
    const obj: any = {};
    if (message.balances) {
      obj.balances = message.balances.map((e) =>
        e ? AccountBalance.toJSON(e) : undefined
      );
    } else {
      obj.balances = [];
    }
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<QueryGetRegistryModuleBalanceResponse>, I>
  >(object: I): QueryGetRegistryModuleBalanceResponse {
    const message = createBaseQueryGetRegistryModuleBalanceResponse();
    message.balances =
      object.balances?.map((e) => AccountBalance.fromPartial(e)) || [];
    return message;
  },
};

function createBaseAccountBalance(): AccountBalance {
  return { accountName: "", balance: [] };
}

export const AccountBalance = {
  encode(
    message: AccountBalance,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.accountName !== "") {
      writer.uint32(10).string(message.accountName);
    }
    for (const v of message.balance) {
      Coin.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AccountBalance {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAccountBalance();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.accountName = reader.string();
          break;
        case 3:
          message.balance.push(Coin.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AccountBalance {
    return {
      accountName: isSet(object.accountName) ? String(object.accountName) : "",
      balance: Array.isArray(object?.balance)
        ? object.balance.map((e: any) => Coin.fromJSON(e))
        : [],
    };
  },

  toJSON(message: AccountBalance): unknown {
    const obj: any = {};
    message.accountName !== undefined &&
      (obj.accountName = message.accountName);
    if (message.balance) {
      obj.balance = message.balance.map((e) =>
        e ? Coin.toJSON(e) : undefined
      );
    } else {
      obj.balance = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<AccountBalance>, I>>(
    object: I
  ): AccountBalance {
    const message = createBaseAccountBalance();
    message.accountName = object.accountName ?? "";
    message.balance = object.balance?.map((e) => Coin.fromPartial(e)) || [];
    return message;
  },
};

/** Query defines the gRPC querier service for registry module */
export interface Query {
  /** Params queries the registry module params. */
  Params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
  /** Records queries all records */
  Records(request: QueryRecordsRequest): Promise<QueryRecordsResponse>;
  /** Get record by id */
  GetRecord(request: QueryGetRecordRequest): Promise<QueryGetRecordResponse>;
  /** Get records by bond id */
  GetRecordsByBondId(
    request: QueryGetRecordsByBondIdRequest
  ): Promise<QueryGetRecordsByBondIdResponse>;
  /** NameRecords queries all name records */
  NameRecords(
    request: QueryNameRecordsRequest
  ): Promise<QueryNameRecordsResponse>;
  /** Whois method retrieve the name authority info */
  Whois(request: QueryWhoisRequest): Promise<QueryWhoisResponse>;
  /** LookupLrn */
  LookupLrn(request: QueryLookupLrnRequest): Promise<QueryLookupLrnResponse>;
  /** ResolveLrn */
  ResolveLrn(request: QueryResolveLrnRequest): Promise<QueryResolveLrnResponse>;
  /** Get registry module balance */
  GetRegistryModuleBalance(
    request: QueryGetRegistryModuleBalanceRequest
  ): Promise<QueryGetRegistryModuleBalanceResponse>;
}

export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.Params = this.Params.bind(this);
    this.Records = this.Records.bind(this);
    this.GetRecord = this.GetRecord.bind(this);
    this.GetRecordsByBondId = this.GetRecordsByBondId.bind(this);
    this.NameRecords = this.NameRecords.bind(this);
    this.Whois = this.Whois.bind(this);
    this.LookupLrn = this.LookupLrn.bind(this);
    this.ResolveLrn = this.ResolveLrn.bind(this);
    this.GetRegistryModuleBalance = this.GetRegistryModuleBalance.bind(this);
  }
  Params(request: QueryParamsRequest): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request("cerc.registry.v1.Query", "Params", data);
    return promise.then((data) =>
      QueryParamsResponse.decode(new _m0.Reader(data))
    );
  }

  Records(request: QueryRecordsRequest): Promise<QueryRecordsResponse> {
    const data = QueryRecordsRequest.encode(request).finish();
    const promise = this.rpc.request("cerc.registry.v1.Query", "Records", data);
    return promise.then((data) =>
      QueryRecordsResponse.decode(new _m0.Reader(data))
    );
  }

  GetRecord(request: QueryGetRecordRequest): Promise<QueryGetRecordResponse> {
    const data = QueryGetRecordRequest.encode(request).finish();
    const promise = this.rpc.request(
      "cerc.registry.v1.Query",
      "GetRecord",
      data
    );
    return promise.then((data) =>
      QueryGetRecordResponse.decode(new _m0.Reader(data))
    );
  }

  GetRecordsByBondId(
    request: QueryGetRecordsByBondIdRequest
  ): Promise<QueryGetRecordsByBondIdResponse> {
    const data = QueryGetRecordsByBondIdRequest.encode(request).finish();
    const promise = this.rpc.request(
      "cerc.registry.v1.Query",
      "GetRecordsByBondId",
      data
    );
    return promise.then((data) =>
      QueryGetRecordsByBondIdResponse.decode(new _m0.Reader(data))
    );
  }

  NameRecords(
    request: QueryNameRecordsRequest
  ): Promise<QueryNameRecordsResponse> {
    const data = QueryNameRecordsRequest.encode(request).finish();
    const promise = this.rpc.request(
      "cerc.registry.v1.Query",
      "NameRecords",
      data
    );
    return promise.then((data) =>
      QueryNameRecordsResponse.decode(new _m0.Reader(data))
    );
  }

  Whois(request: QueryWhoisRequest): Promise<QueryWhoisResponse> {
    const data = QueryWhoisRequest.encode(request).finish();
    const promise = this.rpc.request("cerc.registry.v1.Query", "Whois", data);
    return promise.then((data) =>
      QueryWhoisResponse.decode(new _m0.Reader(data))
    );
  }

  LookupLrn(request: QueryLookupLrnRequest): Promise<QueryLookupLrnResponse> {
    const data = QueryLookupLrnRequest.encode(request).finish();
    const promise = this.rpc.request(
      "cerc.registry.v1.Query",
      "LookupLrn",
      data
    );
    return promise.then((data) =>
      QueryLookupLrnResponse.decode(new _m0.Reader(data))
    );
  }

  ResolveLrn(
    request: QueryResolveLrnRequest
  ): Promise<QueryResolveLrnResponse> {
    const data = QueryResolveLrnRequest.encode(request).finish();
    const promise = this.rpc.request(
      "cerc.registry.v1.Query",
      "ResolveLrn",
      data
    );
    return promise.then((data) =>
      QueryResolveLrnResponse.decode(new _m0.Reader(data))
    );
  }

  GetRegistryModuleBalance(
    request: QueryGetRegistryModuleBalanceRequest
  ): Promise<QueryGetRegistryModuleBalanceResponse> {
    const data = QueryGetRegistryModuleBalanceRequest.encode(request).finish();
    const promise = this.rpc.request(
      "cerc.registry.v1.Query",
      "GetRegistryModuleBalance",
      data
    );
    return promise.then((data) =>
      QueryGetRegistryModuleBalanceResponse.decode(new _m0.Reader(data))
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

function isObject(value: any): boolean {
  return typeof value === "object" && value !== null;
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
