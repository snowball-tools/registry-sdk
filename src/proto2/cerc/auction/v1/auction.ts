/* eslint-disable */
import { Duration } from "../../../google/protobuf/duration";
import { Coin } from "../../../cosmos/base/v1beta1/coin";
import { Timestamp } from "../../../google/protobuf/timestamp";
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "cerc.auction.v1";

/** Params defines the auction module parameters */
export interface Params {
  /** Duration of the commits phase in seconds */
  commitsDuration?: Duration;
  /** Duration of the reveals phase in seconds */
  revealsDuration?: Duration;
  /** Commit fees */
  commitFee?: Coin;
  /** Reveal fees */
  revealFee?: Coin;
  /** Minimum acceptable bid amount */
  minimumBid?: Coin;
}

/** Auction represents a sealed-bid on-chain auction */
export interface Auction {
  id: string;
  status: string;
  /** Address of the creator of the auction */
  ownerAddress: string;
  /** Timestamp at which the auction was created */
  createTime?: Date;
  /** Timestamp at which the commits phase concluded */
  commitsEndTime?: Date;
  /** Timestamp at which the reveals phase concluded */
  revealsEndTime?: Date;
  /**
   * Commit and reveal fees must both be paid when committing a bid
   * Reveal fee is returned only if the bid is revealed
   */
  commitFee?: Coin;
  revealFee?: Coin;
  /** Minimum acceptable bid amount for a valid commit */
  minimumBid?: Coin;
  /** Address of the winner */
  winnerAddress: string;
  /** Winning bid, i.e., the highest bid */
  winningBid?: Coin;
  /** Amount the winner pays, i.e. the second highest auction */
  winningPrice?: Coin;
}

export interface Auctions {
  auctions: Auction[];
}

/** Bid represents a sealed bid (commit) made during the auction */
export interface Bid {
  auctionId: string;
  bidderAddress: string;
  status: string;
  commitHash: string;
  commitTime?: Date;
  commitFee?: Coin;
  revealTime?: Date;
  revealFee?: Coin;
  bidAmount?: Coin;
}

function createBaseParams(): Params {
  return {
    commitsDuration: undefined,
    revealsDuration: undefined,
    commitFee: undefined,
    revealFee: undefined,
    minimumBid: undefined,
  };
}

export const Params = {
  encode(
    message: Params,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.commitsDuration !== undefined) {
      Duration.encode(
        message.commitsDuration,
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.revealsDuration !== undefined) {
      Duration.encode(
        message.revealsDuration,
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.commitFee !== undefined) {
      Coin.encode(message.commitFee, writer.uint32(26).fork()).ldelim();
    }
    if (message.revealFee !== undefined) {
      Coin.encode(message.revealFee, writer.uint32(34).fork()).ldelim();
    }
    if (message.minimumBid !== undefined) {
      Coin.encode(message.minimumBid, writer.uint32(42).fork()).ldelim();
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
          message.commitsDuration = Duration.decode(reader, reader.uint32());
          break;
        case 2:
          message.revealsDuration = Duration.decode(reader, reader.uint32());
          break;
        case 3:
          message.commitFee = Coin.decode(reader, reader.uint32());
          break;
        case 4:
          message.revealFee = Coin.decode(reader, reader.uint32());
          break;
        case 5:
          message.minimumBid = Coin.decode(reader, reader.uint32());
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
      commitsDuration: isSet(object.commitsDuration)
        ? Duration.fromJSON(object.commitsDuration)
        : undefined,
      revealsDuration: isSet(object.revealsDuration)
        ? Duration.fromJSON(object.revealsDuration)
        : undefined,
      commitFee: isSet(object.commitFee)
        ? Coin.fromJSON(object.commitFee)
        : undefined,
      revealFee: isSet(object.revealFee)
        ? Coin.fromJSON(object.revealFee)
        : undefined,
      minimumBid: isSet(object.minimumBid)
        ? Coin.fromJSON(object.minimumBid)
        : undefined,
    };
  },

  toJSON(message: Params): unknown {
    const obj: any = {};
    message.commitsDuration !== undefined &&
      (obj.commitsDuration = message.commitsDuration
        ? Duration.toJSON(message.commitsDuration)
        : undefined);
    message.revealsDuration !== undefined &&
      (obj.revealsDuration = message.revealsDuration
        ? Duration.toJSON(message.revealsDuration)
        : undefined);
    message.commitFee !== undefined &&
      (obj.commitFee = message.commitFee
        ? Coin.toJSON(message.commitFee)
        : undefined);
    message.revealFee !== undefined &&
      (obj.revealFee = message.revealFee
        ? Coin.toJSON(message.revealFee)
        : undefined);
    message.minimumBid !== undefined &&
      (obj.minimumBid = message.minimumBid
        ? Coin.toJSON(message.minimumBid)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Params>, I>>(object: I): Params {
    const message = createBaseParams();
    message.commitsDuration =
      object.commitsDuration !== undefined && object.commitsDuration !== null
        ? Duration.fromPartial(object.commitsDuration)
        : undefined;
    message.revealsDuration =
      object.revealsDuration !== undefined && object.revealsDuration !== null
        ? Duration.fromPartial(object.revealsDuration)
        : undefined;
    message.commitFee =
      object.commitFee !== undefined && object.commitFee !== null
        ? Coin.fromPartial(object.commitFee)
        : undefined;
    message.revealFee =
      object.revealFee !== undefined && object.revealFee !== null
        ? Coin.fromPartial(object.revealFee)
        : undefined;
    message.minimumBid =
      object.minimumBid !== undefined && object.minimumBid !== null
        ? Coin.fromPartial(object.minimumBid)
        : undefined;
    return message;
  },
};

function createBaseAuction(): Auction {
  return {
    id: "",
    status: "",
    ownerAddress: "",
    createTime: undefined,
    commitsEndTime: undefined,
    revealsEndTime: undefined,
    commitFee: undefined,
    revealFee: undefined,
    minimumBid: undefined,
    winnerAddress: "",
    winningBid: undefined,
    winningPrice: undefined,
  };
}

export const Auction = {
  encode(
    message: Auction,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.status !== "") {
      writer.uint32(18).string(message.status);
    }
    if (message.ownerAddress !== "") {
      writer.uint32(26).string(message.ownerAddress);
    }
    if (message.createTime !== undefined) {
      Timestamp.encode(
        toTimestamp(message.createTime),
        writer.uint32(34).fork()
      ).ldelim();
    }
    if (message.commitsEndTime !== undefined) {
      Timestamp.encode(
        toTimestamp(message.commitsEndTime),
        writer.uint32(42).fork()
      ).ldelim();
    }
    if (message.revealsEndTime !== undefined) {
      Timestamp.encode(
        toTimestamp(message.revealsEndTime),
        writer.uint32(50).fork()
      ).ldelim();
    }
    if (message.commitFee !== undefined) {
      Coin.encode(message.commitFee, writer.uint32(58).fork()).ldelim();
    }
    if (message.revealFee !== undefined) {
      Coin.encode(message.revealFee, writer.uint32(66).fork()).ldelim();
    }
    if (message.minimumBid !== undefined) {
      Coin.encode(message.minimumBid, writer.uint32(74).fork()).ldelim();
    }
    if (message.winnerAddress !== "") {
      writer.uint32(82).string(message.winnerAddress);
    }
    if (message.winningBid !== undefined) {
      Coin.encode(message.winningBid, writer.uint32(90).fork()).ldelim();
    }
    if (message.winningPrice !== undefined) {
      Coin.encode(message.winningPrice, writer.uint32(98).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Auction {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAuction();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.status = reader.string();
          break;
        case 3:
          message.ownerAddress = reader.string();
          break;
        case 4:
          message.createTime = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        case 5:
          message.commitsEndTime = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        case 6:
          message.revealsEndTime = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        case 7:
          message.commitFee = Coin.decode(reader, reader.uint32());
          break;
        case 8:
          message.revealFee = Coin.decode(reader, reader.uint32());
          break;
        case 9:
          message.minimumBid = Coin.decode(reader, reader.uint32());
          break;
        case 10:
          message.winnerAddress = reader.string();
          break;
        case 11:
          message.winningBid = Coin.decode(reader, reader.uint32());
          break;
        case 12:
          message.winningPrice = Coin.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Auction {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      status: isSet(object.status) ? String(object.status) : "",
      ownerAddress: isSet(object.ownerAddress)
        ? String(object.ownerAddress)
        : "",
      createTime: isSet(object.createTime)
        ? fromJsonTimestamp(object.createTime)
        : undefined,
      commitsEndTime: isSet(object.commitsEndTime)
        ? fromJsonTimestamp(object.commitsEndTime)
        : undefined,
      revealsEndTime: isSet(object.revealsEndTime)
        ? fromJsonTimestamp(object.revealsEndTime)
        : undefined,
      commitFee: isSet(object.commitFee)
        ? Coin.fromJSON(object.commitFee)
        : undefined,
      revealFee: isSet(object.revealFee)
        ? Coin.fromJSON(object.revealFee)
        : undefined,
      minimumBid: isSet(object.minimumBid)
        ? Coin.fromJSON(object.minimumBid)
        : undefined,
      winnerAddress: isSet(object.winnerAddress)
        ? String(object.winnerAddress)
        : "",
      winningBid: isSet(object.winningBid)
        ? Coin.fromJSON(object.winningBid)
        : undefined,
      winningPrice: isSet(object.winningPrice)
        ? Coin.fromJSON(object.winningPrice)
        : undefined,
    };
  },

  toJSON(message: Auction): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.status !== undefined && (obj.status = message.status);
    message.ownerAddress !== undefined &&
      (obj.ownerAddress = message.ownerAddress);
    message.createTime !== undefined &&
      (obj.createTime = message.createTime.toISOString());
    message.commitsEndTime !== undefined &&
      (obj.commitsEndTime = message.commitsEndTime.toISOString());
    message.revealsEndTime !== undefined &&
      (obj.revealsEndTime = message.revealsEndTime.toISOString());
    message.commitFee !== undefined &&
      (obj.commitFee = message.commitFee
        ? Coin.toJSON(message.commitFee)
        : undefined);
    message.revealFee !== undefined &&
      (obj.revealFee = message.revealFee
        ? Coin.toJSON(message.revealFee)
        : undefined);
    message.minimumBid !== undefined &&
      (obj.minimumBid = message.minimumBid
        ? Coin.toJSON(message.minimumBid)
        : undefined);
    message.winnerAddress !== undefined &&
      (obj.winnerAddress = message.winnerAddress);
    message.winningBid !== undefined &&
      (obj.winningBid = message.winningBid
        ? Coin.toJSON(message.winningBid)
        : undefined);
    message.winningPrice !== undefined &&
      (obj.winningPrice = message.winningPrice
        ? Coin.toJSON(message.winningPrice)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Auction>, I>>(object: I): Auction {
    const message = createBaseAuction();
    message.id = object.id ?? "";
    message.status = object.status ?? "";
    message.ownerAddress = object.ownerAddress ?? "";
    message.createTime = object.createTime ?? undefined;
    message.commitsEndTime = object.commitsEndTime ?? undefined;
    message.revealsEndTime = object.revealsEndTime ?? undefined;
    message.commitFee =
      object.commitFee !== undefined && object.commitFee !== null
        ? Coin.fromPartial(object.commitFee)
        : undefined;
    message.revealFee =
      object.revealFee !== undefined && object.revealFee !== null
        ? Coin.fromPartial(object.revealFee)
        : undefined;
    message.minimumBid =
      object.minimumBid !== undefined && object.minimumBid !== null
        ? Coin.fromPartial(object.minimumBid)
        : undefined;
    message.winnerAddress = object.winnerAddress ?? "";
    message.winningBid =
      object.winningBid !== undefined && object.winningBid !== null
        ? Coin.fromPartial(object.winningBid)
        : undefined;
    message.winningPrice =
      object.winningPrice !== undefined && object.winningPrice !== null
        ? Coin.fromPartial(object.winningPrice)
        : undefined;
    return message;
  },
};

function createBaseAuctions(): Auctions {
  return { auctions: [] };
}

export const Auctions = {
  encode(
    message: Auctions,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.auctions) {
      Auction.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Auctions {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAuctions();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.auctions.push(Auction.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Auctions {
    return {
      auctions: Array.isArray(object?.auctions)
        ? object.auctions.map((e: any) => Auction.fromJSON(e))
        : [],
    };
  },

  toJSON(message: Auctions): unknown {
    const obj: any = {};
    if (message.auctions) {
      obj.auctions = message.auctions.map((e) =>
        e ? Auction.toJSON(e) : undefined
      );
    } else {
      obj.auctions = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Auctions>, I>>(object: I): Auctions {
    const message = createBaseAuctions();
    message.auctions =
      object.auctions?.map((e) => Auction.fromPartial(e)) || [];
    return message;
  },
};

function createBaseBid(): Bid {
  return {
    auctionId: "",
    bidderAddress: "",
    status: "",
    commitHash: "",
    commitTime: undefined,
    commitFee: undefined,
    revealTime: undefined,
    revealFee: undefined,
    bidAmount: undefined,
  };
}

export const Bid = {
  encode(message: Bid, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.auctionId !== "") {
      writer.uint32(10).string(message.auctionId);
    }
    if (message.bidderAddress !== "") {
      writer.uint32(18).string(message.bidderAddress);
    }
    if (message.status !== "") {
      writer.uint32(26).string(message.status);
    }
    if (message.commitHash !== "") {
      writer.uint32(34).string(message.commitHash);
    }
    if (message.commitTime !== undefined) {
      Timestamp.encode(
        toTimestamp(message.commitTime),
        writer.uint32(42).fork()
      ).ldelim();
    }
    if (message.commitFee !== undefined) {
      Coin.encode(message.commitFee, writer.uint32(50).fork()).ldelim();
    }
    if (message.revealTime !== undefined) {
      Timestamp.encode(
        toTimestamp(message.revealTime),
        writer.uint32(58).fork()
      ).ldelim();
    }
    if (message.revealFee !== undefined) {
      Coin.encode(message.revealFee, writer.uint32(66).fork()).ldelim();
    }
    if (message.bidAmount !== undefined) {
      Coin.encode(message.bidAmount, writer.uint32(74).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Bid {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBid();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.auctionId = reader.string();
          break;
        case 2:
          message.bidderAddress = reader.string();
          break;
        case 3:
          message.status = reader.string();
          break;
        case 4:
          message.commitHash = reader.string();
          break;
        case 5:
          message.commitTime = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        case 6:
          message.commitFee = Coin.decode(reader, reader.uint32());
          break;
        case 7:
          message.revealTime = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        case 8:
          message.revealFee = Coin.decode(reader, reader.uint32());
          break;
        case 9:
          message.bidAmount = Coin.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Bid {
    return {
      auctionId: isSet(object.auctionId) ? String(object.auctionId) : "",
      bidderAddress: isSet(object.bidderAddress)
        ? String(object.bidderAddress)
        : "",
      status: isSet(object.status) ? String(object.status) : "",
      commitHash: isSet(object.commitHash) ? String(object.commitHash) : "",
      commitTime: isSet(object.commitTime)
        ? fromJsonTimestamp(object.commitTime)
        : undefined,
      commitFee: isSet(object.commitFee)
        ? Coin.fromJSON(object.commitFee)
        : undefined,
      revealTime: isSet(object.revealTime)
        ? fromJsonTimestamp(object.revealTime)
        : undefined,
      revealFee: isSet(object.revealFee)
        ? Coin.fromJSON(object.revealFee)
        : undefined,
      bidAmount: isSet(object.bidAmount)
        ? Coin.fromJSON(object.bidAmount)
        : undefined,
    };
  },

  toJSON(message: Bid): unknown {
    const obj: any = {};
    message.auctionId !== undefined && (obj.auctionId = message.auctionId);
    message.bidderAddress !== undefined &&
      (obj.bidderAddress = message.bidderAddress);
    message.status !== undefined && (obj.status = message.status);
    message.commitHash !== undefined && (obj.commitHash = message.commitHash);
    message.commitTime !== undefined &&
      (obj.commitTime = message.commitTime.toISOString());
    message.commitFee !== undefined &&
      (obj.commitFee = message.commitFee
        ? Coin.toJSON(message.commitFee)
        : undefined);
    message.revealTime !== undefined &&
      (obj.revealTime = message.revealTime.toISOString());
    message.revealFee !== undefined &&
      (obj.revealFee = message.revealFee
        ? Coin.toJSON(message.revealFee)
        : undefined);
    message.bidAmount !== undefined &&
      (obj.bidAmount = message.bidAmount
        ? Coin.toJSON(message.bidAmount)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Bid>, I>>(object: I): Bid {
    const message = createBaseBid();
    message.auctionId = object.auctionId ?? "";
    message.bidderAddress = object.bidderAddress ?? "";
    message.status = object.status ?? "";
    message.commitHash = object.commitHash ?? "";
    message.commitTime = object.commitTime ?? undefined;
    message.commitFee =
      object.commitFee !== undefined && object.commitFee !== null
        ? Coin.fromPartial(object.commitFee)
        : undefined;
    message.revealTime = object.revealTime ?? undefined;
    message.revealFee =
      object.revealFee !== undefined && object.revealFee !== null
        ? Coin.fromPartial(object.revealFee)
        : undefined;
    message.bidAmount =
      object.bidAmount !== undefined && object.bidAmount !== null
        ? Coin.fromPartial(object.bidAmount)
        : undefined;
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
