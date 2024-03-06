/* eslint-disable */
import { Coin } from "../../../cosmos/base/v1beta1/coin";
import { Duration } from "../../../google/protobuf/duration";
import { Timestamp } from "../../../google/protobuf/timestamp";
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "cerc.registry.v1";

/** Params defines the registry module parameters */
export interface Params {
  recordRent?: Coin;
  recordRentDuration?: Duration;
  authorityRent?: Coin;
  authorityRentDuration?: Duration;
  authorityGracePeriod?: Duration;
  authorityAuctionEnabled: boolean;
  authorityAuctionCommitsDuration?: Duration;
  authorityAuctionRevealsDuration?: Duration;
  authorityAuctionCommitFee?: Coin;
  authorityAuctionRevealFee?: Coin;
  authorityAuctionMinimumBid?: Coin;
}

/** Record defines a registry record */
export interface Record {
  id: string;
  bondId: string;
  createTime: string;
  expiryTime: string;
  deleted: boolean;
  owners: string[];
  attributes: Uint8Array;
  names: string[];
  type: string;
}

/** AuthorityEntry defines a registry authority */
export interface AuthorityEntry {
  name: string;
  entry?: NameAuthority;
}

/** NameAuthority */
export interface NameAuthority {
  /** Owner public key. */
  ownerPublicKey: string;
  /** Owner address. */
  ownerAddress: string;
  /** height at which name/authority was created. */
  height: Long;
  status: string;
  auctionId: string;
  bondId: string;
  expiryTime?: Date;
}

/** NameEntry */
export interface NameEntry {
  name: string;
  entry?: NameRecord;
}

/** NameRecord defines a versioned name record */
export interface NameRecord {
  latest?: NameRecordEntry;
  history: NameRecordEntry[];
}

/** NameRecordEntry */
export interface NameRecordEntry {
  id: string;
  height: Long;
}

/** Signature */
export interface Signature {
  sig: string;
  pubKey: string;
}

/**
 * ExpiryQueue: record / authority expiry queue type
 * id:    expiry time
 * value: array of ids (record cids / authority names)
 */
export interface ExpiryQueue {
  id: string;
  value: string[];
}

/**
 * List of record ids
 * Value type to be used in AttributesMap
 */
export interface RecordsList {
  value: string[];
}

function createBaseParams(): Params {
  return {
    recordRent: undefined,
    recordRentDuration: undefined,
    authorityRent: undefined,
    authorityRentDuration: undefined,
    authorityGracePeriod: undefined,
    authorityAuctionEnabled: false,
    authorityAuctionCommitsDuration: undefined,
    authorityAuctionRevealsDuration: undefined,
    authorityAuctionCommitFee: undefined,
    authorityAuctionRevealFee: undefined,
    authorityAuctionMinimumBid: undefined,
  };
}

export const Params = {
  encode(
    message: Params,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.recordRent !== undefined) {
      Coin.encode(message.recordRent, writer.uint32(10).fork()).ldelim();
    }
    if (message.recordRentDuration !== undefined) {
      Duration.encode(
        message.recordRentDuration,
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.authorityRent !== undefined) {
      Coin.encode(message.authorityRent, writer.uint32(26).fork()).ldelim();
    }
    if (message.authorityRentDuration !== undefined) {
      Duration.encode(
        message.authorityRentDuration,
        writer.uint32(34).fork()
      ).ldelim();
    }
    if (message.authorityGracePeriod !== undefined) {
      Duration.encode(
        message.authorityGracePeriod,
        writer.uint32(42).fork()
      ).ldelim();
    }
    if (message.authorityAuctionEnabled === true) {
      writer.uint32(48).bool(message.authorityAuctionEnabled);
    }
    if (message.authorityAuctionCommitsDuration !== undefined) {
      Duration.encode(
        message.authorityAuctionCommitsDuration,
        writer.uint32(58).fork()
      ).ldelim();
    }
    if (message.authorityAuctionRevealsDuration !== undefined) {
      Duration.encode(
        message.authorityAuctionRevealsDuration,
        writer.uint32(66).fork()
      ).ldelim();
    }
    if (message.authorityAuctionCommitFee !== undefined) {
      Coin.encode(
        message.authorityAuctionCommitFee,
        writer.uint32(74).fork()
      ).ldelim();
    }
    if (message.authorityAuctionRevealFee !== undefined) {
      Coin.encode(
        message.authorityAuctionRevealFee,
        writer.uint32(82).fork()
      ).ldelim();
    }
    if (message.authorityAuctionMinimumBid !== undefined) {
      Coin.encode(
        message.authorityAuctionMinimumBid,
        writer.uint32(90).fork()
      ).ldelim();
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
          message.recordRent = Coin.decode(reader, reader.uint32());
          break;
        case 2:
          message.recordRentDuration = Duration.decode(reader, reader.uint32());
          break;
        case 3:
          message.authorityRent = Coin.decode(reader, reader.uint32());
          break;
        case 4:
          message.authorityRentDuration = Duration.decode(
            reader,
            reader.uint32()
          );
          break;
        case 5:
          message.authorityGracePeriod = Duration.decode(
            reader,
            reader.uint32()
          );
          break;
        case 6:
          message.authorityAuctionEnabled = reader.bool();
          break;
        case 7:
          message.authorityAuctionCommitsDuration = Duration.decode(
            reader,
            reader.uint32()
          );
          break;
        case 8:
          message.authorityAuctionRevealsDuration = Duration.decode(
            reader,
            reader.uint32()
          );
          break;
        case 9:
          message.authorityAuctionCommitFee = Coin.decode(
            reader,
            reader.uint32()
          );
          break;
        case 10:
          message.authorityAuctionRevealFee = Coin.decode(
            reader,
            reader.uint32()
          );
          break;
        case 11:
          message.authorityAuctionMinimumBid = Coin.decode(
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

  fromJSON(object: any): Params {
    return {
      recordRent: isSet(object.recordRent)
        ? Coin.fromJSON(object.recordRent)
        : undefined,
      recordRentDuration: isSet(object.recordRentDuration)
        ? Duration.fromJSON(object.recordRentDuration)
        : undefined,
      authorityRent: isSet(object.authorityRent)
        ? Coin.fromJSON(object.authorityRent)
        : undefined,
      authorityRentDuration: isSet(object.authorityRentDuration)
        ? Duration.fromJSON(object.authorityRentDuration)
        : undefined,
      authorityGracePeriod: isSet(object.authorityGracePeriod)
        ? Duration.fromJSON(object.authorityGracePeriod)
        : undefined,
      authorityAuctionEnabled: isSet(object.authorityAuctionEnabled)
        ? Boolean(object.authorityAuctionEnabled)
        : false,
      authorityAuctionCommitsDuration: isSet(
        object.authorityAuctionCommitsDuration
      )
        ? Duration.fromJSON(object.authorityAuctionCommitsDuration)
        : undefined,
      authorityAuctionRevealsDuration: isSet(
        object.authorityAuctionRevealsDuration
      )
        ? Duration.fromJSON(object.authorityAuctionRevealsDuration)
        : undefined,
      authorityAuctionCommitFee: isSet(object.authorityAuctionCommitFee)
        ? Coin.fromJSON(object.authorityAuctionCommitFee)
        : undefined,
      authorityAuctionRevealFee: isSet(object.authorityAuctionRevealFee)
        ? Coin.fromJSON(object.authorityAuctionRevealFee)
        : undefined,
      authorityAuctionMinimumBid: isSet(object.authorityAuctionMinimumBid)
        ? Coin.fromJSON(object.authorityAuctionMinimumBid)
        : undefined,
    };
  },

  toJSON(message: Params): unknown {
    const obj: any = {};
    message.recordRent !== undefined &&
      (obj.recordRent = message.recordRent
        ? Coin.toJSON(message.recordRent)
        : undefined);
    message.recordRentDuration !== undefined &&
      (obj.recordRentDuration = message.recordRentDuration
        ? Duration.toJSON(message.recordRentDuration)
        : undefined);
    message.authorityRent !== undefined &&
      (obj.authorityRent = message.authorityRent
        ? Coin.toJSON(message.authorityRent)
        : undefined);
    message.authorityRentDuration !== undefined &&
      (obj.authorityRentDuration = message.authorityRentDuration
        ? Duration.toJSON(message.authorityRentDuration)
        : undefined);
    message.authorityGracePeriod !== undefined &&
      (obj.authorityGracePeriod = message.authorityGracePeriod
        ? Duration.toJSON(message.authorityGracePeriod)
        : undefined);
    message.authorityAuctionEnabled !== undefined &&
      (obj.authorityAuctionEnabled = message.authorityAuctionEnabled);
    message.authorityAuctionCommitsDuration !== undefined &&
      (obj.authorityAuctionCommitsDuration =
        message.authorityAuctionCommitsDuration
          ? Duration.toJSON(message.authorityAuctionCommitsDuration)
          : undefined);
    message.authorityAuctionRevealsDuration !== undefined &&
      (obj.authorityAuctionRevealsDuration =
        message.authorityAuctionRevealsDuration
          ? Duration.toJSON(message.authorityAuctionRevealsDuration)
          : undefined);
    message.authorityAuctionCommitFee !== undefined &&
      (obj.authorityAuctionCommitFee = message.authorityAuctionCommitFee
        ? Coin.toJSON(message.authorityAuctionCommitFee)
        : undefined);
    message.authorityAuctionRevealFee !== undefined &&
      (obj.authorityAuctionRevealFee = message.authorityAuctionRevealFee
        ? Coin.toJSON(message.authorityAuctionRevealFee)
        : undefined);
    message.authorityAuctionMinimumBid !== undefined &&
      (obj.authorityAuctionMinimumBid = message.authorityAuctionMinimumBid
        ? Coin.toJSON(message.authorityAuctionMinimumBid)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Params>, I>>(object: I): Params {
    const message = createBaseParams();
    message.recordRent =
      object.recordRent !== undefined && object.recordRent !== null
        ? Coin.fromPartial(object.recordRent)
        : undefined;
    message.recordRentDuration =
      object.recordRentDuration !== undefined &&
      object.recordRentDuration !== null
        ? Duration.fromPartial(object.recordRentDuration)
        : undefined;
    message.authorityRent =
      object.authorityRent !== undefined && object.authorityRent !== null
        ? Coin.fromPartial(object.authorityRent)
        : undefined;
    message.authorityRentDuration =
      object.authorityRentDuration !== undefined &&
      object.authorityRentDuration !== null
        ? Duration.fromPartial(object.authorityRentDuration)
        : undefined;
    message.authorityGracePeriod =
      object.authorityGracePeriod !== undefined &&
      object.authorityGracePeriod !== null
        ? Duration.fromPartial(object.authorityGracePeriod)
        : undefined;
    message.authorityAuctionEnabled = object.authorityAuctionEnabled ?? false;
    message.authorityAuctionCommitsDuration =
      object.authorityAuctionCommitsDuration !== undefined &&
      object.authorityAuctionCommitsDuration !== null
        ? Duration.fromPartial(object.authorityAuctionCommitsDuration)
        : undefined;
    message.authorityAuctionRevealsDuration =
      object.authorityAuctionRevealsDuration !== undefined &&
      object.authorityAuctionRevealsDuration !== null
        ? Duration.fromPartial(object.authorityAuctionRevealsDuration)
        : undefined;
    message.authorityAuctionCommitFee =
      object.authorityAuctionCommitFee !== undefined &&
      object.authorityAuctionCommitFee !== null
        ? Coin.fromPartial(object.authorityAuctionCommitFee)
        : undefined;
    message.authorityAuctionRevealFee =
      object.authorityAuctionRevealFee !== undefined &&
      object.authorityAuctionRevealFee !== null
        ? Coin.fromPartial(object.authorityAuctionRevealFee)
        : undefined;
    message.authorityAuctionMinimumBid =
      object.authorityAuctionMinimumBid !== undefined &&
      object.authorityAuctionMinimumBid !== null
        ? Coin.fromPartial(object.authorityAuctionMinimumBid)
        : undefined;
    return message;
  },
};

function createBaseRecord(): Record {
  return {
    id: "",
    bondId: "",
    createTime: "",
    expiryTime: "",
    deleted: false,
    owners: [],
    attributes: new Uint8Array(),
    names: [],
    type: "",
  };
}

export const Record = {
  encode(
    message: Record,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.bondId !== "") {
      writer.uint32(18).string(message.bondId);
    }
    if (message.createTime !== "") {
      writer.uint32(26).string(message.createTime);
    }
    if (message.expiryTime !== "") {
      writer.uint32(34).string(message.expiryTime);
    }
    if (message.deleted === true) {
      writer.uint32(40).bool(message.deleted);
    }
    for (const v of message.owners) {
      writer.uint32(50).string(v!);
    }
    if (message.attributes.length !== 0) {
      writer.uint32(58).bytes(message.attributes);
    }
    for (const v of message.names) {
      writer.uint32(66).string(v!);
    }
    if (message.type !== "") {
      writer.uint32(74).string(message.type);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Record {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRecord();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.bondId = reader.string();
          break;
        case 3:
          message.createTime = reader.string();
          break;
        case 4:
          message.expiryTime = reader.string();
          break;
        case 5:
          message.deleted = reader.bool();
          break;
        case 6:
          message.owners.push(reader.string());
          break;
        case 7:
          message.attributes = reader.bytes();
          break;
        case 8:
          message.names.push(reader.string());
          break;
        case 9:
          message.type = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Record {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      bondId: isSet(object.bondId) ? String(object.bondId) : "",
      createTime: isSet(object.createTime) ? String(object.createTime) : "",
      expiryTime: isSet(object.expiryTime) ? String(object.expiryTime) : "",
      deleted: isSet(object.deleted) ? Boolean(object.deleted) : false,
      owners: Array.isArray(object?.owners)
        ? object.owners.map((e: any) => String(e))
        : [],
      attributes: isSet(object.attributes)
        ? bytesFromBase64(object.attributes)
        : new Uint8Array(),
      names: Array.isArray(object?.names)
        ? object.names.map((e: any) => String(e))
        : [],
      type: isSet(object.type) ? String(object.type) : "",
    };
  },

  toJSON(message: Record): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.bondId !== undefined && (obj.bondId = message.bondId);
    message.createTime !== undefined && (obj.createTime = message.createTime);
    message.expiryTime !== undefined && (obj.expiryTime = message.expiryTime);
    message.deleted !== undefined && (obj.deleted = message.deleted);
    if (message.owners) {
      obj.owners = message.owners.map((e) => e);
    } else {
      obj.owners = [];
    }
    message.attributes !== undefined &&
      (obj.attributes = base64FromBytes(
        message.attributes !== undefined ? message.attributes : new Uint8Array()
      ));
    if (message.names) {
      obj.names = message.names.map((e) => e);
    } else {
      obj.names = [];
    }
    message.type !== undefined && (obj.type = message.type);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Record>, I>>(object: I): Record {
    const message = createBaseRecord();
    message.id = object.id ?? "";
    message.bondId = object.bondId ?? "";
    message.createTime = object.createTime ?? "";
    message.expiryTime = object.expiryTime ?? "";
    message.deleted = object.deleted ?? false;
    message.owners = object.owners?.map((e) => e) || [];
    message.attributes = object.attributes ?? new Uint8Array();
    message.names = object.names?.map((e) => e) || [];
    message.type = object.type ?? "";
    return message;
  },
};

function createBaseAuthorityEntry(): AuthorityEntry {
  return { name: "", entry: undefined };
}

export const AuthorityEntry = {
  encode(
    message: AuthorityEntry,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.entry !== undefined) {
      NameAuthority.encode(message.entry, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AuthorityEntry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAuthorityEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.entry = NameAuthority.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AuthorityEntry {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      entry: isSet(object.entry)
        ? NameAuthority.fromJSON(object.entry)
        : undefined,
    };
  },

  toJSON(message: AuthorityEntry): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.entry !== undefined &&
      (obj.entry = message.entry
        ? NameAuthority.toJSON(message.entry)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<AuthorityEntry>, I>>(
    object: I
  ): AuthorityEntry {
    const message = createBaseAuthorityEntry();
    message.name = object.name ?? "";
    message.entry =
      object.entry !== undefined && object.entry !== null
        ? NameAuthority.fromPartial(object.entry)
        : undefined;
    return message;
  },
};

function createBaseNameAuthority(): NameAuthority {
  return {
    ownerPublicKey: "",
    ownerAddress: "",
    height: Long.UZERO,
    status: "",
    auctionId: "",
    bondId: "",
    expiryTime: undefined,
  };
}

export const NameAuthority = {
  encode(
    message: NameAuthority,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.ownerPublicKey !== "") {
      writer.uint32(10).string(message.ownerPublicKey);
    }
    if (message.ownerAddress !== "") {
      writer.uint32(18).string(message.ownerAddress);
    }
    if (!message.height.isZero()) {
      writer.uint32(24).uint64(message.height);
    }
    if (message.status !== "") {
      writer.uint32(34).string(message.status);
    }
    if (message.auctionId !== "") {
      writer.uint32(42).string(message.auctionId);
    }
    if (message.bondId !== "") {
      writer.uint32(50).string(message.bondId);
    }
    if (message.expiryTime !== undefined) {
      Timestamp.encode(
        toTimestamp(message.expiryTime),
        writer.uint32(58).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NameAuthority {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNameAuthority();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.ownerPublicKey = reader.string();
          break;
        case 2:
          message.ownerAddress = reader.string();
          break;
        case 3:
          message.height = reader.uint64() as Long;
          break;
        case 4:
          message.status = reader.string();
          break;
        case 5:
          message.auctionId = reader.string();
          break;
        case 6:
          message.bondId = reader.string();
          break;
        case 7:
          message.expiryTime = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): NameAuthority {
    return {
      ownerPublicKey: isSet(object.ownerPublicKey)
        ? String(object.ownerPublicKey)
        : "",
      ownerAddress: isSet(object.ownerAddress)
        ? String(object.ownerAddress)
        : "",
      height: isSet(object.height) ? Long.fromValue(object.height) : Long.UZERO,
      status: isSet(object.status) ? String(object.status) : "",
      auctionId: isSet(object.auctionId) ? String(object.auctionId) : "",
      bondId: isSet(object.bondId) ? String(object.bondId) : "",
      expiryTime: isSet(object.expiryTime)
        ? fromJsonTimestamp(object.expiryTime)
        : undefined,
    };
  },

  toJSON(message: NameAuthority): unknown {
    const obj: any = {};
    message.ownerPublicKey !== undefined &&
      (obj.ownerPublicKey = message.ownerPublicKey);
    message.ownerAddress !== undefined &&
      (obj.ownerAddress = message.ownerAddress);
    message.height !== undefined &&
      (obj.height = (message.height || Long.UZERO).toString());
    message.status !== undefined && (obj.status = message.status);
    message.auctionId !== undefined && (obj.auctionId = message.auctionId);
    message.bondId !== undefined && (obj.bondId = message.bondId);
    message.expiryTime !== undefined &&
      (obj.expiryTime = message.expiryTime.toISOString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<NameAuthority>, I>>(
    object: I
  ): NameAuthority {
    const message = createBaseNameAuthority();
    message.ownerPublicKey = object.ownerPublicKey ?? "";
    message.ownerAddress = object.ownerAddress ?? "";
    message.height =
      object.height !== undefined && object.height !== null
        ? Long.fromValue(object.height)
        : Long.UZERO;
    message.status = object.status ?? "";
    message.auctionId = object.auctionId ?? "";
    message.bondId = object.bondId ?? "";
    message.expiryTime = object.expiryTime ?? undefined;
    return message;
  },
};

function createBaseNameEntry(): NameEntry {
  return { name: "", entry: undefined };
}

export const NameEntry = {
  encode(
    message: NameEntry,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.entry !== undefined) {
      NameRecord.encode(message.entry, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NameEntry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNameEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.entry = NameRecord.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): NameEntry {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      entry: isSet(object.entry)
        ? NameRecord.fromJSON(object.entry)
        : undefined,
    };
  },

  toJSON(message: NameEntry): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.entry !== undefined &&
      (obj.entry = message.entry
        ? NameRecord.toJSON(message.entry)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<NameEntry>, I>>(
    object: I
  ): NameEntry {
    const message = createBaseNameEntry();
    message.name = object.name ?? "";
    message.entry =
      object.entry !== undefined && object.entry !== null
        ? NameRecord.fromPartial(object.entry)
        : undefined;
    return message;
  },
};

function createBaseNameRecord(): NameRecord {
  return { latest: undefined, history: [] };
}

export const NameRecord = {
  encode(
    message: NameRecord,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.latest !== undefined) {
      NameRecordEntry.encode(message.latest, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.history) {
      NameRecordEntry.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NameRecord {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNameRecord();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.latest = NameRecordEntry.decode(reader, reader.uint32());
          break;
        case 2:
          message.history.push(NameRecordEntry.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): NameRecord {
    return {
      latest: isSet(object.latest)
        ? NameRecordEntry.fromJSON(object.latest)
        : undefined,
      history: Array.isArray(object?.history)
        ? object.history.map((e: any) => NameRecordEntry.fromJSON(e))
        : [],
    };
  },

  toJSON(message: NameRecord): unknown {
    const obj: any = {};
    message.latest !== undefined &&
      (obj.latest = message.latest
        ? NameRecordEntry.toJSON(message.latest)
        : undefined);
    if (message.history) {
      obj.history = message.history.map((e) =>
        e ? NameRecordEntry.toJSON(e) : undefined
      );
    } else {
      obj.history = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<NameRecord>, I>>(
    object: I
  ): NameRecord {
    const message = createBaseNameRecord();
    message.latest =
      object.latest !== undefined && object.latest !== null
        ? NameRecordEntry.fromPartial(object.latest)
        : undefined;
    message.history =
      object.history?.map((e) => NameRecordEntry.fromPartial(e)) || [];
    return message;
  },
};

function createBaseNameRecordEntry(): NameRecordEntry {
  return { id: "", height: Long.UZERO };
}

export const NameRecordEntry = {
  encode(
    message: NameRecordEntry,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (!message.height.isZero()) {
      writer.uint32(16).uint64(message.height);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NameRecordEntry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNameRecordEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.height = reader.uint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): NameRecordEntry {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      height: isSet(object.height) ? Long.fromValue(object.height) : Long.UZERO,
    };
  },

  toJSON(message: NameRecordEntry): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.height !== undefined &&
      (obj.height = (message.height || Long.UZERO).toString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<NameRecordEntry>, I>>(
    object: I
  ): NameRecordEntry {
    const message = createBaseNameRecordEntry();
    message.id = object.id ?? "";
    message.height =
      object.height !== undefined && object.height !== null
        ? Long.fromValue(object.height)
        : Long.UZERO;
    return message;
  },
};

function createBaseSignature(): Signature {
  return { sig: "", pubKey: "" };
}

export const Signature = {
  encode(
    message: Signature,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.sig !== "") {
      writer.uint32(10).string(message.sig);
    }
    if (message.pubKey !== "") {
      writer.uint32(18).string(message.pubKey);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Signature {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSignature();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sig = reader.string();
          break;
        case 2:
          message.pubKey = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Signature {
    return {
      sig: isSet(object.sig) ? String(object.sig) : "",
      pubKey: isSet(object.pubKey) ? String(object.pubKey) : "",
    };
  },

  toJSON(message: Signature): unknown {
    const obj: any = {};
    message.sig !== undefined && (obj.sig = message.sig);
    message.pubKey !== undefined && (obj.pubKey = message.pubKey);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Signature>, I>>(
    object: I
  ): Signature {
    const message = createBaseSignature();
    message.sig = object.sig ?? "";
    message.pubKey = object.pubKey ?? "";
    return message;
  },
};

function createBaseExpiryQueue(): ExpiryQueue {
  return { id: "", value: [] };
}

export const ExpiryQueue = {
  encode(
    message: ExpiryQueue,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    for (const v of message.value) {
      writer.uint32(18).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ExpiryQueue {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseExpiryQueue();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.value.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ExpiryQueue {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      value: Array.isArray(object?.value)
        ? object.value.map((e: any) => String(e))
        : [],
    };
  },

  toJSON(message: ExpiryQueue): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    if (message.value) {
      obj.value = message.value.map((e) => e);
    } else {
      obj.value = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ExpiryQueue>, I>>(
    object: I
  ): ExpiryQueue {
    const message = createBaseExpiryQueue();
    message.id = object.id ?? "";
    message.value = object.value?.map((e) => e) || [];
    return message;
  },
};

function createBaseRecordsList(): RecordsList {
  return { value: [] };
}

export const RecordsList = {
  encode(
    message: RecordsList,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.value) {
      writer.uint32(10).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RecordsList {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRecordsList();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.value.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RecordsList {
    return {
      value: Array.isArray(object?.value)
        ? object.value.map((e: any) => String(e))
        : [],
    };
  },

  toJSON(message: RecordsList): unknown {
    const obj: any = {};
    if (message.value) {
      obj.value = message.value.map((e) => e);
    } else {
      obj.value = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RecordsList>, I>>(
    object: I
  ): RecordsList {
    const message = createBaseRecordsList();
    message.value = object.value?.map((e) => e) || [];
    return message;
  },
};

declare var self: any | undefined;
declare var window: any | undefined;
declare var global: any | undefined;
var globalThis: any = (() => {
  if (typeof globalThis !== "undefined") return globalThis;
  if (typeof self !== "undefined") return self;
  if (typeof window !== "undefined") return window;
  if (typeof global !== "undefined") return global;
  throw "Unable to locate global object";
})();

function bytesFromBase64(b64: string): Uint8Array {
  if (globalThis.Buffer) {
    return Uint8Array.from(globalThis.Buffer.from(b64, "base64"));
  } else {
    const bin = globalThis.atob(b64);
    const arr = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; ++i) {
      arr[i] = bin.charCodeAt(i);
    }
    return arr;
  }
}

function base64FromBytes(arr: Uint8Array): string {
  if (globalThis.Buffer) {
    return globalThis.Buffer.from(arr).toString("base64");
  } else {
    const bin: string[] = [];
    arr.forEach((byte) => {
      bin.push(String.fromCharCode(byte));
    });
    return globalThis.btoa(bin.join(""));
  }
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

function toTimestamp(date: Date): Timestamp {
  const seconds = numberToLong(date.getTime() / 1_000);
  const nanos = (date.getTime() % 1_000) * 1_000_000;
  return { seconds, nanos };
}

function fromTimestamp(t: Timestamp): Date {
  let millis = t.seconds.toNumber() * 1_000;
  millis += t.nanos / 1_000_000;
  return new Date(millis);
}

function fromJsonTimestamp(o: any): Date {
  if (o instanceof Date) {
    return o;
  } else if (typeof o === "string") {
    return new Date(o);
  } else {
    return fromTimestamp(Timestamp.fromJSON(o));
  }
}

function numberToLong(number: number) {
  return Long.fromNumber(number);
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
