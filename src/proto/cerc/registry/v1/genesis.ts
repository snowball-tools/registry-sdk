/* eslint-disable */
import { Params, Record, AuthorityEntry, NameEntry } from "./registry";
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "cerc.registry.v1";

/** GenesisState defines the registry module's genesis state. */
export interface GenesisState {
  /** params defines all the params of registry module. */
  params?: Params;
  /** records */
  records: Record[];
  /** authorities */
  authorities: AuthorityEntry[];
  /** names */
  names: NameEntry[];
}

function createBaseGenesisState(): GenesisState {
  return { params: undefined, records: [], authorities: [], names: [] };
}

export const GenesisState = {
  encode(
    message: GenesisState,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.records) {
      Record.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.authorities) {
      AuthorityEntry.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.names) {
      NameEntry.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GenesisState {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenesisState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.params = Params.decode(reader, reader.uint32());
          break;
        case 2:
          message.records.push(Record.decode(reader, reader.uint32()));
          break;
        case 3:
          message.authorities.push(
            AuthorityEntry.decode(reader, reader.uint32())
          );
          break;
        case 4:
          message.names.push(NameEntry.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GenesisState {
    return {
      params: isSet(object.params) ? Params.fromJSON(object.params) : undefined,
      records: Array.isArray(object?.records)
        ? object.records.map((e: any) => Record.fromJSON(e))
        : [],
      authorities: Array.isArray(object?.authorities)
        ? object.authorities.map((e: any) => AuthorityEntry.fromJSON(e))
        : [],
      names: Array.isArray(object?.names)
        ? object.names.map((e: any) => NameEntry.fromJSON(e))
        : [],
    };
  },

  toJSON(message: GenesisState): unknown {
    const obj: any = {};
    message.params !== undefined &&
      (obj.params = message.params ? Params.toJSON(message.params) : undefined);
    if (message.records) {
      obj.records = message.records.map((e) =>
        e ? Record.toJSON(e) : undefined
      );
    } else {
      obj.records = [];
    }
    if (message.authorities) {
      obj.authorities = message.authorities.map((e) =>
        e ? AuthorityEntry.toJSON(e) : undefined
      );
    } else {
      obj.authorities = [];
    }
    if (message.names) {
      obj.names = message.names.map((e) =>
        e ? NameEntry.toJSON(e) : undefined
      );
    } else {
      obj.names = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GenesisState>, I>>(
    object: I
  ): GenesisState {
    const message = createBaseGenesisState();
    message.params =
      object.params !== undefined && object.params !== null
        ? Params.fromPartial(object.params)
        : undefined;
    message.records = object.records?.map((e) => Record.fromPartial(e)) || [];
    message.authorities =
      object.authorities?.map((e) => AuthorityEntry.fromPartial(e)) || [];
    message.names = object.names?.map((e) => NameEntry.fromPartial(e)) || [];
    return message;
  },
};

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
