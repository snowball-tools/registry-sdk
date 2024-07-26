/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "cerc.onboarding.v1";

/** Params defines the parameters of the onboarding module. */
export interface Params {
  onboardingEnabled: boolean;
}

/**
 * Participant defines the data that will be stored for each enrolled
 * participant
 */
export interface Participant {
  /** participant's cosmos (laconic) address */
  cosmosAddress: string;
  /** participant's Nitro address */
  nitroAddress: string;
  /** participant's role (participant | validator) */
  role: string;
  /** participant's KYC receipt ID */
  kycId: string;
}

/** EthPayload defines the payload that is signed by the ethereum private key */
export interface EthPayload {
  address: string;
  msg: string;
}

function createBaseParams(): Params {
  return { onboardingEnabled: false };
}

export const Params = {
  encode(
    message: Params,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.onboardingEnabled === true) {
      writer.uint32(8).bool(message.onboardingEnabled);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Params {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.onboardingEnabled = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Params {
    return {
      onboardingEnabled: isSet(object.onboardingEnabled)
        ? Boolean(object.onboardingEnabled)
        : false,
    };
  },

  toJSON(message: Params): unknown {
    const obj: any = {};
    message.onboardingEnabled !== undefined &&
      (obj.onboardingEnabled = message.onboardingEnabled);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Params>, I>>(object: I): Params {
    const message = createBaseParams();
    message.onboardingEnabled = object.onboardingEnabled ?? false;
    return message;
  },
};

function createBaseParticipant(): Participant {
  return { cosmosAddress: "", nitroAddress: "", role: "", kycId: "" };
}

export const Participant = {
  encode(
    message: Participant,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.cosmosAddress !== "") {
      writer.uint32(10).string(message.cosmosAddress);
    }
    if (message.nitroAddress !== "") {
      writer.uint32(18).string(message.nitroAddress);
    }
    if (message.role !== "") {
      writer.uint32(26).string(message.role);
    }
    if (message.kycId !== "") {
      writer.uint32(34).string(message.kycId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Participant {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseParticipant();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.cosmosAddress = reader.string();
          break;
        case 2:
          message.nitroAddress = reader.string();
          break;
        case 3:
          message.role = reader.string();
          break;
        case 4:
          message.kycId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Participant {
    return {
      cosmosAddress: isSet(object.cosmosAddress)
        ? String(object.cosmosAddress)
        : "",
      nitroAddress: isSet(object.nitroAddress)
        ? String(object.nitroAddress)
        : "",
      role: isSet(object.role) ? String(object.role) : "",
      kycId: isSet(object.kycId) ? String(object.kycId) : "",
    };
  },

  toJSON(message: Participant): unknown {
    const obj: any = {};
    message.cosmosAddress !== undefined &&
      (obj.cosmosAddress = message.cosmosAddress);
    message.nitroAddress !== undefined &&
      (obj.nitroAddress = message.nitroAddress);
    message.role !== undefined && (obj.role = message.role);
    message.kycId !== undefined && (obj.kycId = message.kycId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Participant>, I>>(
    object: I
  ): Participant {
    const message = createBaseParticipant();
    message.cosmosAddress = object.cosmosAddress ?? "";
    message.nitroAddress = object.nitroAddress ?? "";
    message.role = object.role ?? "";
    message.kycId = object.kycId ?? "";
    return message;
  },
};

function createBaseEthPayload(): EthPayload {
  return { address: "", msg: "" };
}

export const EthPayload = {
  encode(
    message: EthPayload,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    if (message.msg !== "") {
      writer.uint32(18).string(message.msg);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EthPayload {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEthPayload();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        case 2:
          message.msg = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): EthPayload {
    return {
      address: isSet(object.address) ? String(object.address) : "",
      msg: isSet(object.msg) ? String(object.msg) : "",
    };
  },

  toJSON(message: EthPayload): unknown {
    const obj: any = {};
    message.address !== undefined && (obj.address = message.address);
    message.msg !== undefined && (obj.msg = message.msg);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EthPayload>, I>>(
    object: I
  ): EthPayload {
    const message = createBaseEthPayload();
    message.address = object.address ?? "";
    message.msg = object.msg ?? "";
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
