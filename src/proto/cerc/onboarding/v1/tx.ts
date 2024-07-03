/* eslint-disable */
import { EthPayload } from "./onboarding";
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "cerc.onboarding.v1";

/** MsgOnboardParticipant defines a SDK message for enrolling a new validator. */
export interface MsgOnboardParticipant {
  /** Participant is the msg sender */
  participant: string;
  ethPayload?: EthPayload;
  ethSignature: string;
  message: string;
}

/** MsgOnboardParticipantResponse defines the Msg/OnboardParticipant response type. */
export interface MsgOnboardParticipantResponse {}

function createBaseMsgOnboardParticipant(): MsgOnboardParticipant {
  return {
    participant: "",
    ethPayload: undefined,
    ethSignature: "",
    message: "",
  };
}

export const MsgOnboardParticipant = {
  encode(
    message: MsgOnboardParticipant,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.participant !== "") {
      writer.uint32(10).string(message.participant);
    }
    if (message.ethPayload !== undefined) {
      EthPayload.encode(message.ethPayload, writer.uint32(18).fork()).ldelim();
    }
    if (message.ethSignature !== "") {
      writer.uint32(26).string(message.ethSignature);
    }
    if (message.message !== "") {
      writer.uint32(34).string(message.message);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgOnboardParticipant {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgOnboardParticipant();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.participant = reader.string();
          break;
        case 2:
          message.ethPayload = EthPayload.decode(reader, reader.uint32());
          break;
        case 3:
          message.ethSignature = reader.string();
          break;
        case 4:
          message.message = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgOnboardParticipant {
    return {
      participant: isSet(object.participant) ? String(object.participant) : "",
      ethPayload: isSet(object.ethPayload)
        ? EthPayload.fromJSON(object.ethPayload)
        : undefined,
      ethSignature: isSet(object.ethSignature)
        ? String(object.ethSignature)
        : "",
      message: isSet(object.message) ? String(object.message) : "",
    };
  },

  toJSON(message: MsgOnboardParticipant): unknown {
    const obj: any = {};
    message.participant !== undefined &&
      (obj.participant = message.participant);
    message.ethPayload !== undefined &&
      (obj.ethPayload = message.ethPayload
        ? EthPayload.toJSON(message.ethPayload)
        : undefined);
    message.ethSignature !== undefined &&
      (obj.ethSignature = message.ethSignature);
    message.message !== undefined && (obj.message = message.message);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgOnboardParticipant>, I>>(
    object: I
  ): MsgOnboardParticipant {
    const message = createBaseMsgOnboardParticipant();
    message.participant = object.participant ?? "";
    message.ethPayload =
      object.ethPayload !== undefined && object.ethPayload !== null
        ? EthPayload.fromPartial(object.ethPayload)
        : undefined;
    message.ethSignature = object.ethSignature ?? "";
    message.message = object.message ?? "";
    return message;
  },
};

function createBaseMsgOnboardParticipantResponse(): MsgOnboardParticipantResponse {
  return {};
}

export const MsgOnboardParticipantResponse = {
  encode(
    _: MsgOnboardParticipantResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgOnboardParticipantResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgOnboardParticipantResponse();
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

  fromJSON(_: any): MsgOnboardParticipantResponse {
    return {};
  },

  toJSON(_: MsgOnboardParticipantResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgOnboardParticipantResponse>, I>>(
    _: I
  ): MsgOnboardParticipantResponse {
    const message = createBaseMsgOnboardParticipantResponse();
    return message;
  },
};

/** Msg defines the onboarding Msg service. */
export interface Msg {
  /** OnboardParticipant defines a method for enrolling a new validator. */
  OnboardParticipant(
    request: MsgOnboardParticipant
  ): Promise<MsgOnboardParticipantResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.OnboardParticipant = this.OnboardParticipant.bind(this);
  }
  OnboardParticipant(
    request: MsgOnboardParticipant
  ): Promise<MsgOnboardParticipantResponse> {
    const data = MsgOnboardParticipant.encode(request).finish();
    const promise = this.rpc.request(
      "cerc.onboarding.v1.Msg",
      "OnboardParticipant",
      data
    );
    return promise.then((data) =>
      MsgOnboardParticipantResponse.decode(new _m0.Reader(data))
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
