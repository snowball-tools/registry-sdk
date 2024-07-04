/* eslint-disable */
import {
  PageRequest,
  PageResponse,
} from "../../../cosmos/base/query/v1beta1/pagination";
import Long from "long";
import { Participant } from "./onboarding";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "cerc.onboarding.v1";

/** QueryParticipantsRequest queries participants */
export interface QueryParticipantsRequest {
  /** pagination defines an optional pagination for the request. */
  pagination?: PageRequest;
}

/** QueryParticipantsResponse is response type for get the participants */
export interface QueryParticipantsResponse {
  participants: Participant[];
  /** pagination defines the pagination in the response. */
  pagination?: PageResponse;
}

function createBaseQueryParticipantsRequest(): QueryParticipantsRequest {
  return { pagination: undefined };
}

export const QueryParticipantsRequest = {
  encode(
    message: QueryParticipantsRequest,
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
  ): QueryParticipantsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryParticipantsRequest();
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

  fromJSON(object: any): QueryParticipantsRequest {
    return {
      pagination: isSet(object.pagination)
        ? PageRequest.fromJSON(object.pagination)
        : undefined,
    };
  },

  toJSON(message: QueryParticipantsRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryParticipantsRequest>, I>>(
    object: I
  ): QueryParticipantsRequest {
    const message = createBaseQueryParticipantsRequest();
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageRequest.fromPartial(object.pagination)
        : undefined;
    return message;
  },
};

function createBaseQueryParticipantsResponse(): QueryParticipantsResponse {
  return { participants: [], pagination: undefined };
}

export const QueryParticipantsResponse = {
  encode(
    message: QueryParticipantsResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.participants) {
      Participant.encode(v!, writer.uint32(10).fork()).ldelim();
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
  ): QueryParticipantsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryParticipantsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.participants.push(
            Participant.decode(reader, reader.uint32())
          );
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

  fromJSON(object: any): QueryParticipantsResponse {
    return {
      participants: Array.isArray(object?.participants)
        ? object.participants.map((e: any) => Participant.fromJSON(e))
        : [],
      pagination: isSet(object.pagination)
        ? PageResponse.fromJSON(object.pagination)
        : undefined,
    };
  },

  toJSON(message: QueryParticipantsResponse): unknown {
    const obj: any = {};
    if (message.participants) {
      obj.participants = message.participants.map((e) =>
        e ? Participant.toJSON(e) : undefined
      );
    } else {
      obj.participants = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageResponse.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryParticipantsResponse>, I>>(
    object: I
  ): QueryParticipantsResponse {
    const message = createBaseQueryParticipantsResponse();
    message.participants =
      object.participants?.map((e) => Participant.fromPartial(e)) || [];
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageResponse.fromPartial(object.pagination)
        : undefined;
    return message;
  },
};

/** Query defines the gRPC querier service for onboarding module */
export interface Query {
  /** Participants queries Participants list */
  Participants(
    request: QueryParticipantsRequest
  ): Promise<QueryParticipantsResponse>;
}

export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.Participants = this.Participants.bind(this);
  }
  Participants(
    request: QueryParticipantsRequest
  ): Promise<QueryParticipantsResponse> {
    const data = QueryParticipantsRequest.encode(request).finish();
    const promise = this.rpc.request(
      "cerc.onboarding.v1.Query",
      "Participants",
      data
    );
    return promise.then((data) =>
      QueryParticipantsResponse.decode(new _m0.Reader(data))
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
