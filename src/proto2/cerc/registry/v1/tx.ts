/* eslint-disable */
import { Record, Signature } from "./registry";
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "cerc.registry.v1";

/** MsgSetRecord */
export interface MsgSetRecord {
  bondId: string;
  signer: string;
  payload?: Payload;
}

/** MsgSetRecordResponse */
export interface MsgSetRecordResponse {
  id: string;
}

/** Payload */
export interface Payload {
  record?: Record;
  signatures: Signature[];
}

/** MsgSetName */
export interface MsgSetName {
  lrn: string;
  cid: string;
  signer: string;
}

/** MsgSetNameResponse */
export interface MsgSetNameResponse {}

/** MsgReserveName */
export interface MsgReserveAuthority {
  name: string;
  signer: string;
  /** if creating a sub-authority. */
  owner: string;
}

/** MsgReserveNameResponse */
export interface MsgReserveAuthorityResponse {}

/** MsgSetAuthorityBond */
export interface MsgSetAuthorityBond {
  name: string;
  bondId: string;
  signer: string;
}

/** MsgSetAuthorityBondResponse */
export interface MsgSetAuthorityBondResponse {}

/** MsgDeleteNameAuthority */
export interface MsgDeleteNameAuthority {
  lrn: string;
  signer: string;
}

/** MsgDeleteNameAuthorityResponse */
export interface MsgDeleteNameAuthorityResponse {}

/** MsgRenewRecord */
export interface MsgRenewRecord {
  recordId: string;
  signer: string;
}

/** MsgRenewRecordResponse */
export interface MsgRenewRecordResponse {}

/** MsgAssociateBond */
export interface MsgAssociateBond {
  recordId: string;
  bondId: string;
  signer: string;
}

/** MsgAssociateBondResponse */
export interface MsgAssociateBondResponse {}

/** MsgDissociateBond */
export interface MsgDissociateBond {
  recordId: string;
  signer: string;
}

/** MsgDissociateBondResponse */
export interface MsgDissociateBondResponse {}

/** MsgDissociateRecords */
export interface MsgDissociateRecords {
  bondId: string;
  signer: string;
}

/** MsgDissociateRecordsResponse */
export interface MsgDissociateRecordsResponse {}

/** MsgReassociateRecords */
export interface MsgReassociateRecords {
  newBondId: string;
  oldBondId: string;
  signer: string;
}

/** MsgReassociateRecordsResponse */
export interface MsgReassociateRecordsResponse {}

function createBaseMsgSetRecord(): MsgSetRecord {
  return { bondId: "", signer: "", payload: undefined };
}

export const MsgSetRecord = {
  encode(
    message: MsgSetRecord,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.bondId !== "") {
      writer.uint32(10).string(message.bondId);
    }
    if (message.signer !== "") {
      writer.uint32(18).string(message.signer);
    }
    if (message.payload !== undefined) {
      Payload.encode(message.payload, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSetRecord {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSetRecord();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.bondId = reader.string();
          break;
        case 2:
          message.signer = reader.string();
          break;
        case 3:
          message.payload = Payload.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgSetRecord {
    return {
      bondId: isSet(object.bondId) ? String(object.bondId) : "",
      signer: isSet(object.signer) ? String(object.signer) : "",
      payload: isSet(object.payload)
        ? Payload.fromJSON(object.payload)
        : undefined,
    };
  },

  toJSON(message: MsgSetRecord): unknown {
    const obj: any = {};
    message.bondId !== undefined && (obj.bondId = message.bondId);
    message.signer !== undefined && (obj.signer = message.signer);
    message.payload !== undefined &&
      (obj.payload = message.payload
        ? Payload.toJSON(message.payload)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgSetRecord>, I>>(
    object: I
  ): MsgSetRecord {
    const message = createBaseMsgSetRecord();
    message.bondId = object.bondId ?? "";
    message.signer = object.signer ?? "";
    message.payload =
      object.payload !== undefined && object.payload !== null
        ? Payload.fromPartial(object.payload)
        : undefined;
    return message;
  },
};

function createBaseMsgSetRecordResponse(): MsgSetRecordResponse {
  return { id: "" };
}

export const MsgSetRecordResponse = {
  encode(
    message: MsgSetRecordResponse,
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
  ): MsgSetRecordResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSetRecordResponse();
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

  fromJSON(object: any): MsgSetRecordResponse {
    return {
      id: isSet(object.id) ? String(object.id) : "",
    };
  },

  toJSON(message: MsgSetRecordResponse): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgSetRecordResponse>, I>>(
    object: I
  ): MsgSetRecordResponse {
    const message = createBaseMsgSetRecordResponse();
    message.id = object.id ?? "";
    return message;
  },
};

function createBasePayload(): Payload {
  return { record: undefined, signatures: [] };
}

export const Payload = {
  encode(
    message: Payload,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.record !== undefined) {
      Record.encode(message.record, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.signatures) {
      Signature.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Payload {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePayload();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.record = Record.decode(reader, reader.uint32());
          break;
        case 2:
          message.signatures.push(Signature.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Payload {
    return {
      record: isSet(object.record) ? Record.fromJSON(object.record) : undefined,
      signatures: Array.isArray(object?.signatures)
        ? object.signatures.map((e: any) => Signature.fromJSON(e))
        : [],
    };
  },

  toJSON(message: Payload): unknown {
    const obj: any = {};
    message.record !== undefined &&
      (obj.record = message.record ? Record.toJSON(message.record) : undefined);
    if (message.signatures) {
      obj.signatures = message.signatures.map((e) =>
        e ? Signature.toJSON(e) : undefined
      );
    } else {
      obj.signatures = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Payload>, I>>(object: I): Payload {
    const message = createBasePayload();
    message.record =
      object.record !== undefined && object.record !== null
        ? Record.fromPartial(object.record)
        : undefined;
    message.signatures =
      object.signatures?.map((e) => Signature.fromPartial(e)) || [];
    return message;
  },
};

function createBaseMsgSetName(): MsgSetName {
  return { lrn: "", cid: "", signer: "" };
}

export const MsgSetName = {
  encode(
    message: MsgSetName,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.lrn !== "") {
      writer.uint32(10).string(message.lrn);
    }
    if (message.cid !== "") {
      writer.uint32(18).string(message.cid);
    }
    if (message.signer !== "") {
      writer.uint32(26).string(message.signer);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSetName {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSetName();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.lrn = reader.string();
          break;
        case 2:
          message.cid = reader.string();
          break;
        case 3:
          message.signer = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgSetName {
    return {
      lrn: isSet(object.lrn) ? String(object.lrn) : "",
      cid: isSet(object.cid) ? String(object.cid) : "",
      signer: isSet(object.signer) ? String(object.signer) : "",
    };
  },

  toJSON(message: MsgSetName): unknown {
    const obj: any = {};
    message.lrn !== undefined && (obj.lrn = message.lrn);
    message.cid !== undefined && (obj.cid = message.cid);
    message.signer !== undefined && (obj.signer = message.signer);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgSetName>, I>>(
    object: I
  ): MsgSetName {
    const message = createBaseMsgSetName();
    message.lrn = object.lrn ?? "";
    message.cid = object.cid ?? "";
    message.signer = object.signer ?? "";
    return message;
  },
};

function createBaseMsgSetNameResponse(): MsgSetNameResponse {
  return {};
}

export const MsgSetNameResponse = {
  encode(
    _: MsgSetNameResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSetNameResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSetNameResponse();
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

  fromJSON(_: any): MsgSetNameResponse {
    return {};
  },

  toJSON(_: MsgSetNameResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgSetNameResponse>, I>>(
    _: I
  ): MsgSetNameResponse {
    const message = createBaseMsgSetNameResponse();
    return message;
  },
};

function createBaseMsgReserveAuthority(): MsgReserveAuthority {
  return { name: "", signer: "", owner: "" };
}

export const MsgReserveAuthority = {
  encode(
    message: MsgReserveAuthority,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.signer !== "") {
      writer.uint32(18).string(message.signer);
    }
    if (message.owner !== "") {
      writer.uint32(26).string(message.owner);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgReserveAuthority {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgReserveAuthority();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.signer = reader.string();
          break;
        case 3:
          message.owner = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgReserveAuthority {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      signer: isSet(object.signer) ? String(object.signer) : "",
      owner: isSet(object.owner) ? String(object.owner) : "",
    };
  },

  toJSON(message: MsgReserveAuthority): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.signer !== undefined && (obj.signer = message.signer);
    message.owner !== undefined && (obj.owner = message.owner);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgReserveAuthority>, I>>(
    object: I
  ): MsgReserveAuthority {
    const message = createBaseMsgReserveAuthority();
    message.name = object.name ?? "";
    message.signer = object.signer ?? "";
    message.owner = object.owner ?? "";
    return message;
  },
};

function createBaseMsgReserveAuthorityResponse(): MsgReserveAuthorityResponse {
  return {};
}

export const MsgReserveAuthorityResponse = {
  encode(
    _: MsgReserveAuthorityResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgReserveAuthorityResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgReserveAuthorityResponse();
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

  fromJSON(_: any): MsgReserveAuthorityResponse {
    return {};
  },

  toJSON(_: MsgReserveAuthorityResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgReserveAuthorityResponse>, I>>(
    _: I
  ): MsgReserveAuthorityResponse {
    const message = createBaseMsgReserveAuthorityResponse();
    return message;
  },
};

function createBaseMsgSetAuthorityBond(): MsgSetAuthorityBond {
  return { name: "", bondId: "", signer: "" };
}

export const MsgSetAuthorityBond = {
  encode(
    message: MsgSetAuthorityBond,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.bondId !== "") {
      writer.uint32(18).string(message.bondId);
    }
    if (message.signer !== "") {
      writer.uint32(26).string(message.signer);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSetAuthorityBond {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSetAuthorityBond();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.bondId = reader.string();
          break;
        case 3:
          message.signer = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgSetAuthorityBond {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      bondId: isSet(object.bondId) ? String(object.bondId) : "",
      signer: isSet(object.signer) ? String(object.signer) : "",
    };
  },

  toJSON(message: MsgSetAuthorityBond): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.bondId !== undefined && (obj.bondId = message.bondId);
    message.signer !== undefined && (obj.signer = message.signer);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgSetAuthorityBond>, I>>(
    object: I
  ): MsgSetAuthorityBond {
    const message = createBaseMsgSetAuthorityBond();
    message.name = object.name ?? "";
    message.bondId = object.bondId ?? "";
    message.signer = object.signer ?? "";
    return message;
  },
};

function createBaseMsgSetAuthorityBondResponse(): MsgSetAuthorityBondResponse {
  return {};
}

export const MsgSetAuthorityBondResponse = {
  encode(
    _: MsgSetAuthorityBondResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgSetAuthorityBondResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSetAuthorityBondResponse();
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

  fromJSON(_: any): MsgSetAuthorityBondResponse {
    return {};
  },

  toJSON(_: MsgSetAuthorityBondResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgSetAuthorityBondResponse>, I>>(
    _: I
  ): MsgSetAuthorityBondResponse {
    const message = createBaseMsgSetAuthorityBondResponse();
    return message;
  },
};

function createBaseMsgDeleteNameAuthority(): MsgDeleteNameAuthority {
  return { lrn: "", signer: "" };
}

export const MsgDeleteNameAuthority = {
  encode(
    message: MsgDeleteNameAuthority,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.lrn !== "") {
      writer.uint32(10).string(message.lrn);
    }
    if (message.signer !== "") {
      writer.uint32(18).string(message.signer);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgDeleteNameAuthority {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDeleteNameAuthority();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.lrn = reader.string();
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

  fromJSON(object: any): MsgDeleteNameAuthority {
    return {
      lrn: isSet(object.lrn) ? String(object.lrn) : "",
      signer: isSet(object.signer) ? String(object.signer) : "",
    };
  },

  toJSON(message: MsgDeleteNameAuthority): unknown {
    const obj: any = {};
    message.lrn !== undefined && (obj.lrn = message.lrn);
    message.signer !== undefined && (obj.signer = message.signer);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgDeleteNameAuthority>, I>>(
    object: I
  ): MsgDeleteNameAuthority {
    const message = createBaseMsgDeleteNameAuthority();
    message.lrn = object.lrn ?? "";
    message.signer = object.signer ?? "";
    return message;
  },
};

function createBaseMsgDeleteNameAuthorityResponse(): MsgDeleteNameAuthorityResponse {
  return {};
}

export const MsgDeleteNameAuthorityResponse = {
  encode(
    _: MsgDeleteNameAuthorityResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgDeleteNameAuthorityResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDeleteNameAuthorityResponse();
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

  fromJSON(_: any): MsgDeleteNameAuthorityResponse {
    return {};
  },

  toJSON(_: MsgDeleteNameAuthorityResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgDeleteNameAuthorityResponse>, I>>(
    _: I
  ): MsgDeleteNameAuthorityResponse {
    const message = createBaseMsgDeleteNameAuthorityResponse();
    return message;
  },
};

function createBaseMsgRenewRecord(): MsgRenewRecord {
  return { recordId: "", signer: "" };
}

export const MsgRenewRecord = {
  encode(
    message: MsgRenewRecord,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.recordId !== "") {
      writer.uint32(10).string(message.recordId);
    }
    if (message.signer !== "") {
      writer.uint32(18).string(message.signer);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgRenewRecord {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRenewRecord();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.recordId = reader.string();
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

  fromJSON(object: any): MsgRenewRecord {
    return {
      recordId: isSet(object.recordId) ? String(object.recordId) : "",
      signer: isSet(object.signer) ? String(object.signer) : "",
    };
  },

  toJSON(message: MsgRenewRecord): unknown {
    const obj: any = {};
    message.recordId !== undefined && (obj.recordId = message.recordId);
    message.signer !== undefined && (obj.signer = message.signer);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgRenewRecord>, I>>(
    object: I
  ): MsgRenewRecord {
    const message = createBaseMsgRenewRecord();
    message.recordId = object.recordId ?? "";
    message.signer = object.signer ?? "";
    return message;
  },
};

function createBaseMsgRenewRecordResponse(): MsgRenewRecordResponse {
  return {};
}

export const MsgRenewRecordResponse = {
  encode(
    _: MsgRenewRecordResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgRenewRecordResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRenewRecordResponse();
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

  fromJSON(_: any): MsgRenewRecordResponse {
    return {};
  },

  toJSON(_: MsgRenewRecordResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgRenewRecordResponse>, I>>(
    _: I
  ): MsgRenewRecordResponse {
    const message = createBaseMsgRenewRecordResponse();
    return message;
  },
};

function createBaseMsgAssociateBond(): MsgAssociateBond {
  return { recordId: "", bondId: "", signer: "" };
}

export const MsgAssociateBond = {
  encode(
    message: MsgAssociateBond,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.recordId !== "") {
      writer.uint32(10).string(message.recordId);
    }
    if (message.bondId !== "") {
      writer.uint32(18).string(message.bondId);
    }
    if (message.signer !== "") {
      writer.uint32(26).string(message.signer);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgAssociateBond {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAssociateBond();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.recordId = reader.string();
          break;
        case 2:
          message.bondId = reader.string();
          break;
        case 3:
          message.signer = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgAssociateBond {
    return {
      recordId: isSet(object.recordId) ? String(object.recordId) : "",
      bondId: isSet(object.bondId) ? String(object.bondId) : "",
      signer: isSet(object.signer) ? String(object.signer) : "",
    };
  },

  toJSON(message: MsgAssociateBond): unknown {
    const obj: any = {};
    message.recordId !== undefined && (obj.recordId = message.recordId);
    message.bondId !== undefined && (obj.bondId = message.bondId);
    message.signer !== undefined && (obj.signer = message.signer);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgAssociateBond>, I>>(
    object: I
  ): MsgAssociateBond {
    const message = createBaseMsgAssociateBond();
    message.recordId = object.recordId ?? "";
    message.bondId = object.bondId ?? "";
    message.signer = object.signer ?? "";
    return message;
  },
};

function createBaseMsgAssociateBondResponse(): MsgAssociateBondResponse {
  return {};
}

export const MsgAssociateBondResponse = {
  encode(
    _: MsgAssociateBondResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgAssociateBondResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAssociateBondResponse();
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

  fromJSON(_: any): MsgAssociateBondResponse {
    return {};
  },

  toJSON(_: MsgAssociateBondResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgAssociateBondResponse>, I>>(
    _: I
  ): MsgAssociateBondResponse {
    const message = createBaseMsgAssociateBondResponse();
    return message;
  },
};

function createBaseMsgDissociateBond(): MsgDissociateBond {
  return { recordId: "", signer: "" };
}

export const MsgDissociateBond = {
  encode(
    message: MsgDissociateBond,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.recordId !== "") {
      writer.uint32(10).string(message.recordId);
    }
    if (message.signer !== "") {
      writer.uint32(18).string(message.signer);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgDissociateBond {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDissociateBond();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.recordId = reader.string();
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

  fromJSON(object: any): MsgDissociateBond {
    return {
      recordId: isSet(object.recordId) ? String(object.recordId) : "",
      signer: isSet(object.signer) ? String(object.signer) : "",
    };
  },

  toJSON(message: MsgDissociateBond): unknown {
    const obj: any = {};
    message.recordId !== undefined && (obj.recordId = message.recordId);
    message.signer !== undefined && (obj.signer = message.signer);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgDissociateBond>, I>>(
    object: I
  ): MsgDissociateBond {
    const message = createBaseMsgDissociateBond();
    message.recordId = object.recordId ?? "";
    message.signer = object.signer ?? "";
    return message;
  },
};

function createBaseMsgDissociateBondResponse(): MsgDissociateBondResponse {
  return {};
}

export const MsgDissociateBondResponse = {
  encode(
    _: MsgDissociateBondResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgDissociateBondResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDissociateBondResponse();
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

  fromJSON(_: any): MsgDissociateBondResponse {
    return {};
  },

  toJSON(_: MsgDissociateBondResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgDissociateBondResponse>, I>>(
    _: I
  ): MsgDissociateBondResponse {
    const message = createBaseMsgDissociateBondResponse();
    return message;
  },
};

function createBaseMsgDissociateRecords(): MsgDissociateRecords {
  return { bondId: "", signer: "" };
}

export const MsgDissociateRecords = {
  encode(
    message: MsgDissociateRecords,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.bondId !== "") {
      writer.uint32(10).string(message.bondId);
    }
    if (message.signer !== "") {
      writer.uint32(18).string(message.signer);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgDissociateRecords {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDissociateRecords();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.bondId = reader.string();
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

  fromJSON(object: any): MsgDissociateRecords {
    return {
      bondId: isSet(object.bondId) ? String(object.bondId) : "",
      signer: isSet(object.signer) ? String(object.signer) : "",
    };
  },

  toJSON(message: MsgDissociateRecords): unknown {
    const obj: any = {};
    message.bondId !== undefined && (obj.bondId = message.bondId);
    message.signer !== undefined && (obj.signer = message.signer);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgDissociateRecords>, I>>(
    object: I
  ): MsgDissociateRecords {
    const message = createBaseMsgDissociateRecords();
    message.bondId = object.bondId ?? "";
    message.signer = object.signer ?? "";
    return message;
  },
};

function createBaseMsgDissociateRecordsResponse(): MsgDissociateRecordsResponse {
  return {};
}

export const MsgDissociateRecordsResponse = {
  encode(
    _: MsgDissociateRecordsResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgDissociateRecordsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDissociateRecordsResponse();
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

  fromJSON(_: any): MsgDissociateRecordsResponse {
    return {};
  },

  toJSON(_: MsgDissociateRecordsResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgDissociateRecordsResponse>, I>>(
    _: I
  ): MsgDissociateRecordsResponse {
    const message = createBaseMsgDissociateRecordsResponse();
    return message;
  },
};

function createBaseMsgReassociateRecords(): MsgReassociateRecords {
  return { newBondId: "", oldBondId: "", signer: "" };
}

export const MsgReassociateRecords = {
  encode(
    message: MsgReassociateRecords,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.newBondId !== "") {
      writer.uint32(10).string(message.newBondId);
    }
    if (message.oldBondId !== "") {
      writer.uint32(18).string(message.oldBondId);
    }
    if (message.signer !== "") {
      writer.uint32(26).string(message.signer);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgReassociateRecords {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgReassociateRecords();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.newBondId = reader.string();
          break;
        case 2:
          message.oldBondId = reader.string();
          break;
        case 3:
          message.signer = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgReassociateRecords {
    return {
      newBondId: isSet(object.newBondId) ? String(object.newBondId) : "",
      oldBondId: isSet(object.oldBondId) ? String(object.oldBondId) : "",
      signer: isSet(object.signer) ? String(object.signer) : "",
    };
  },

  toJSON(message: MsgReassociateRecords): unknown {
    const obj: any = {};
    message.newBondId !== undefined && (obj.newBondId = message.newBondId);
    message.oldBondId !== undefined && (obj.oldBondId = message.oldBondId);
    message.signer !== undefined && (obj.signer = message.signer);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgReassociateRecords>, I>>(
    object: I
  ): MsgReassociateRecords {
    const message = createBaseMsgReassociateRecords();
    message.newBondId = object.newBondId ?? "";
    message.oldBondId = object.oldBondId ?? "";
    message.signer = object.signer ?? "";
    return message;
  },
};

function createBaseMsgReassociateRecordsResponse(): MsgReassociateRecordsResponse {
  return {};
}

export const MsgReassociateRecordsResponse = {
  encode(
    _: MsgReassociateRecordsResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgReassociateRecordsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgReassociateRecordsResponse();
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

  fromJSON(_: any): MsgReassociateRecordsResponse {
    return {};
  },

  toJSON(_: MsgReassociateRecordsResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgReassociateRecordsResponse>, I>>(
    _: I
  ): MsgReassociateRecordsResponse {
    const message = createBaseMsgReassociateRecordsResponse();
    return message;
  },
};

/** Msg is a service which exposes the registry functionality */
export interface Msg {
  /** SetRecord records a new record with given payload and bond id */
  SetRecord(request: MsgSetRecord): Promise<MsgSetRecordResponse>;
  /** Renew Record renews an expired record */
  RenewRecord(request: MsgRenewRecord): Promise<MsgRenewRecordResponse>;
  /** AssociateBond */
  AssociateBond(request: MsgAssociateBond): Promise<MsgAssociateBondResponse>;
  /** DissociateBond */
  DissociateBond(
    request: MsgDissociateBond
  ): Promise<MsgDissociateBondResponse>;
  /** DissociateRecords */
  DissociateRecords(
    request: MsgDissociateRecords
  ): Promise<MsgDissociateRecordsResponse>;
  /** ReassociateRecords */
  ReassociateRecords(
    request: MsgReassociateRecords
  ): Promise<MsgReassociateRecordsResponse>;
  /** SetName will store the name with given lrn and name */
  SetName(request: MsgSetName): Promise<MsgSetNameResponse>;
  /** Reserve name */
  ReserveName(
    request: MsgReserveAuthority
  ): Promise<MsgReserveAuthorityResponse>;
  /** Delete Name method will remove authority name */
  DeleteName(
    request: MsgDeleteNameAuthority
  ): Promise<MsgDeleteNameAuthorityResponse>;
  /** SetAuthorityBond */
  SetAuthorityBond(
    request: MsgSetAuthorityBond
  ): Promise<MsgSetAuthorityBondResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.SetRecord = this.SetRecord.bind(this);
    this.RenewRecord = this.RenewRecord.bind(this);
    this.AssociateBond = this.AssociateBond.bind(this);
    this.DissociateBond = this.DissociateBond.bind(this);
    this.DissociateRecords = this.DissociateRecords.bind(this);
    this.ReassociateRecords = this.ReassociateRecords.bind(this);
    this.SetName = this.SetName.bind(this);
    this.ReserveName = this.ReserveName.bind(this);
    this.DeleteName = this.DeleteName.bind(this);
    this.SetAuthorityBond = this.SetAuthorityBond.bind(this);
  }
  SetRecord(request: MsgSetRecord): Promise<MsgSetRecordResponse> {
    const data = MsgSetRecord.encode(request).finish();
    const promise = this.rpc.request("cerc.registry.v1.Msg", "SetRecord", data);
    return promise.then((data) =>
      MsgSetRecordResponse.decode(new _m0.Reader(data))
    );
  }

  RenewRecord(request: MsgRenewRecord): Promise<MsgRenewRecordResponse> {
    const data = MsgRenewRecord.encode(request).finish();
    const promise = this.rpc.request(
      "cerc.registry.v1.Msg",
      "RenewRecord",
      data
    );
    return promise.then((data) =>
      MsgRenewRecordResponse.decode(new _m0.Reader(data))
    );
  }

  AssociateBond(request: MsgAssociateBond): Promise<MsgAssociateBondResponse> {
    const data = MsgAssociateBond.encode(request).finish();
    const promise = this.rpc.request(
      "cerc.registry.v1.Msg",
      "AssociateBond",
      data
    );
    return promise.then((data) =>
      MsgAssociateBondResponse.decode(new _m0.Reader(data))
    );
  }

  DissociateBond(
    request: MsgDissociateBond
  ): Promise<MsgDissociateBondResponse> {
    const data = MsgDissociateBond.encode(request).finish();
    const promise = this.rpc.request(
      "cerc.registry.v1.Msg",
      "DissociateBond",
      data
    );
    return promise.then((data) =>
      MsgDissociateBondResponse.decode(new _m0.Reader(data))
    );
  }

  DissociateRecords(
    request: MsgDissociateRecords
  ): Promise<MsgDissociateRecordsResponse> {
    const data = MsgDissociateRecords.encode(request).finish();
    const promise = this.rpc.request(
      "cerc.registry.v1.Msg",
      "DissociateRecords",
      data
    );
    return promise.then((data) =>
      MsgDissociateRecordsResponse.decode(new _m0.Reader(data))
    );
  }

  ReassociateRecords(
    request: MsgReassociateRecords
  ): Promise<MsgReassociateRecordsResponse> {
    const data = MsgReassociateRecords.encode(request).finish();
    const promise = this.rpc.request(
      "cerc.registry.v1.Msg",
      "ReassociateRecords",
      data
    );
    return promise.then((data) =>
      MsgReassociateRecordsResponse.decode(new _m0.Reader(data))
    );
  }

  SetName(request: MsgSetName): Promise<MsgSetNameResponse> {
    const data = MsgSetName.encode(request).finish();
    const promise = this.rpc.request("cerc.registry.v1.Msg", "SetName", data);
    return promise.then((data) =>
      MsgSetNameResponse.decode(new _m0.Reader(data))
    );
  }

  ReserveName(
    request: MsgReserveAuthority
  ): Promise<MsgReserveAuthorityResponse> {
    const data = MsgReserveAuthority.encode(request).finish();
    const promise = this.rpc.request(
      "cerc.registry.v1.Msg",
      "ReserveName",
      data
    );
    return promise.then((data) =>
      MsgReserveAuthorityResponse.decode(new _m0.Reader(data))
    );
  }

  DeleteName(
    request: MsgDeleteNameAuthority
  ): Promise<MsgDeleteNameAuthorityResponse> {
    const data = MsgDeleteNameAuthority.encode(request).finish();
    const promise = this.rpc.request(
      "cerc.registry.v1.Msg",
      "DeleteName",
      data
    );
    return promise.then((data) =>
      MsgDeleteNameAuthorityResponse.decode(new _m0.Reader(data))
    );
  }

  SetAuthorityBond(
    request: MsgSetAuthorityBond
  ): Promise<MsgSetAuthorityBondResponse> {
    const data = MsgSetAuthorityBond.encode(request).finish();
    const promise = this.rpc.request(
      "cerc.registry.v1.Msg",
      "SetAuthorityBond",
      data
    );
    return promise.then((data) =>
      MsgSetAuthorityBondResponse.decode(new _m0.Reader(data))
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
