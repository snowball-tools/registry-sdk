/* eslint-disable */
import { Duration } from "../../../google/protobuf/duration";
import { Coin } from "../../../cosmos/base/v1beta1/coin";
import { Auction, Bid } from "./auction";
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "cerc.auction.v1";

/** MsgCreateAuction defines a create auction message */
export interface MsgCreateAuction {
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
  /** Address of the signer */
  signer: string;
}

/** MsgCreateAuctionResponse returns the details of the created auction */
export interface MsgCreateAuctionResponse {
  /** Auction details */
  auction?: Auction;
}

/** CommitBid defines the message to commit a bid */
export interface MsgCommitBid {
  /** Auction id */
  auctionId: string;
  /** Commit Hash */
  commitHash: string;
  /** Address of the signer */
  signer: string;
}

/** MsgCommitBidResponse returns the state of the auction after the bid creation */
export interface MsgCommitBidResponse {
  /** Auction details */
  bid?: Bid;
}

/** RevealBid defines the message to reveal a bid */
export interface MsgRevealBid {
  /** Auction id */
  auctionId: string;
  /** Commit Hash */
  reveal: string;
  /** Address of the signer */
  signer: string;
}

/** MsgRevealBidResponse returns the state of the auction after the bid reveal */
export interface MsgRevealBidResponse {
  /** Auction details */
  auction?: Auction;
}

function createBaseMsgCreateAuction(): MsgCreateAuction {
  return {
    commitsDuration: undefined,
    revealsDuration: undefined,
    commitFee: undefined,
    revealFee: undefined,
    minimumBid: undefined,
    signer: "",
  };
}

export const MsgCreateAuction = {
  encode(
    message: MsgCreateAuction,
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
    if (message.signer !== "") {
      writer.uint32(50).string(message.signer);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateAuction {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateAuction();
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
        case 6:
          message.signer = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCreateAuction {
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
      signer: isSet(object.signer) ? String(object.signer) : "",
    };
  },

  toJSON(message: MsgCreateAuction): unknown {
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
    message.signer !== undefined && (obj.signer = message.signer);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgCreateAuction>, I>>(
    object: I
  ): MsgCreateAuction {
    const message = createBaseMsgCreateAuction();
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
    message.signer = object.signer ?? "";
    return message;
  },
};

function createBaseMsgCreateAuctionResponse(): MsgCreateAuctionResponse {
  return { auction: undefined };
}

export const MsgCreateAuctionResponse = {
  encode(
    message: MsgCreateAuctionResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.auction !== undefined) {
      Auction.encode(message.auction, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgCreateAuctionResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateAuctionResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.auction = Auction.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCreateAuctionResponse {
    return {
      auction: isSet(object.auction)
        ? Auction.fromJSON(object.auction)
        : undefined,
    };
  },

  toJSON(message: MsgCreateAuctionResponse): unknown {
    const obj: any = {};
    message.auction !== undefined &&
      (obj.auction = message.auction
        ? Auction.toJSON(message.auction)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgCreateAuctionResponse>, I>>(
    object: I
  ): MsgCreateAuctionResponse {
    const message = createBaseMsgCreateAuctionResponse();
    message.auction =
      object.auction !== undefined && object.auction !== null
        ? Auction.fromPartial(object.auction)
        : undefined;
    return message;
  },
};

function createBaseMsgCommitBid(): MsgCommitBid {
  return { auctionId: "", commitHash: "", signer: "" };
}

export const MsgCommitBid = {
  encode(
    message: MsgCommitBid,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.auctionId !== "") {
      writer.uint32(10).string(message.auctionId);
    }
    if (message.commitHash !== "") {
      writer.uint32(18).string(message.commitHash);
    }
    if (message.signer !== "") {
      writer.uint32(26).string(message.signer);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCommitBid {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCommitBid();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.auctionId = reader.string();
          break;
        case 2:
          message.commitHash = reader.string();
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

  fromJSON(object: any): MsgCommitBid {
    return {
      auctionId: isSet(object.auctionId) ? String(object.auctionId) : "",
      commitHash: isSet(object.commitHash) ? String(object.commitHash) : "",
      signer: isSet(object.signer) ? String(object.signer) : "",
    };
  },

  toJSON(message: MsgCommitBid): unknown {
    const obj: any = {};
    message.auctionId !== undefined && (obj.auctionId = message.auctionId);
    message.commitHash !== undefined && (obj.commitHash = message.commitHash);
    message.signer !== undefined && (obj.signer = message.signer);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgCommitBid>, I>>(
    object: I
  ): MsgCommitBid {
    const message = createBaseMsgCommitBid();
    message.auctionId = object.auctionId ?? "";
    message.commitHash = object.commitHash ?? "";
    message.signer = object.signer ?? "";
    return message;
  },
};

function createBaseMsgCommitBidResponse(): MsgCommitBidResponse {
  return { bid: undefined };
}

export const MsgCommitBidResponse = {
  encode(
    message: MsgCommitBidResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.bid !== undefined) {
      Bid.encode(message.bid, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgCommitBidResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCommitBidResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.bid = Bid.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCommitBidResponse {
    return {
      bid: isSet(object.bid) ? Bid.fromJSON(object.bid) : undefined,
    };
  },

  toJSON(message: MsgCommitBidResponse): unknown {
    const obj: any = {};
    message.bid !== undefined &&
      (obj.bid = message.bid ? Bid.toJSON(message.bid) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgCommitBidResponse>, I>>(
    object: I
  ): MsgCommitBidResponse {
    const message = createBaseMsgCommitBidResponse();
    message.bid =
      object.bid !== undefined && object.bid !== null
        ? Bid.fromPartial(object.bid)
        : undefined;
    return message;
  },
};

function createBaseMsgRevealBid(): MsgRevealBid {
  return { auctionId: "", reveal: "", signer: "" };
}

export const MsgRevealBid = {
  encode(
    message: MsgRevealBid,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.auctionId !== "") {
      writer.uint32(10).string(message.auctionId);
    }
    if (message.reveal !== "") {
      writer.uint32(18).string(message.reveal);
    }
    if (message.signer !== "") {
      writer.uint32(26).string(message.signer);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgRevealBid {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRevealBid();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.auctionId = reader.string();
          break;
        case 2:
          message.reveal = reader.string();
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

  fromJSON(object: any): MsgRevealBid {
    return {
      auctionId: isSet(object.auctionId) ? String(object.auctionId) : "",
      reveal: isSet(object.reveal) ? String(object.reveal) : "",
      signer: isSet(object.signer) ? String(object.signer) : "",
    };
  },

  toJSON(message: MsgRevealBid): unknown {
    const obj: any = {};
    message.auctionId !== undefined && (obj.auctionId = message.auctionId);
    message.reveal !== undefined && (obj.reveal = message.reveal);
    message.signer !== undefined && (obj.signer = message.signer);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgRevealBid>, I>>(
    object: I
  ): MsgRevealBid {
    const message = createBaseMsgRevealBid();
    message.auctionId = object.auctionId ?? "";
    message.reveal = object.reveal ?? "";
    message.signer = object.signer ?? "";
    return message;
  },
};

function createBaseMsgRevealBidResponse(): MsgRevealBidResponse {
  return { auction: undefined };
}

export const MsgRevealBidResponse = {
  encode(
    message: MsgRevealBidResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.auction !== undefined) {
      Auction.encode(message.auction, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgRevealBidResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRevealBidResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.auction = Auction.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgRevealBidResponse {
    return {
      auction: isSet(object.auction)
        ? Auction.fromJSON(object.auction)
        : undefined,
    };
  },

  toJSON(message: MsgRevealBidResponse): unknown {
    const obj: any = {};
    message.auction !== undefined &&
      (obj.auction = message.auction
        ? Auction.toJSON(message.auction)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgRevealBidResponse>, I>>(
    object: I
  ): MsgRevealBidResponse {
    const message = createBaseMsgRevealBidResponse();
    message.auction =
      object.auction !== undefined && object.auction !== null
        ? Auction.fromPartial(object.auction)
        : undefined;
    return message;
  },
};

/** Tx defines the gRPC tx interface */
export interface Msg {
  /** CreateAuction is the command for creating an auction */
  CreateAuction(request: MsgCreateAuction): Promise<MsgCreateAuctionResponse>;
  /** CommitBid is the command for committing a bid */
  CommitBid(request: MsgCommitBid): Promise<MsgCommitBidResponse>;
  /** RevealBid is the command for revealing a bid */
  RevealBid(request: MsgRevealBid): Promise<MsgRevealBidResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.CreateAuction = this.CreateAuction.bind(this);
    this.CommitBid = this.CommitBid.bind(this);
    this.RevealBid = this.RevealBid.bind(this);
  }
  CreateAuction(request: MsgCreateAuction): Promise<MsgCreateAuctionResponse> {
    const data = MsgCreateAuction.encode(request).finish();
    const promise = this.rpc.request(
      "cerc.auction.v1.Msg",
      "CreateAuction",
      data
    );
    return promise.then((data) =>
      MsgCreateAuctionResponse.decode(new _m0.Reader(data))
    );
  }

  CommitBid(request: MsgCommitBid): Promise<MsgCommitBidResponse> {
    const data = MsgCommitBid.encode(request).finish();
    const promise = this.rpc.request("cerc.auction.v1.Msg", "CommitBid", data);
    return promise.then((data) =>
      MsgCommitBidResponse.decode(new _m0.Reader(data))
    );
  }

  RevealBid(request: MsgRevealBid): Promise<MsgRevealBidResponse> {
    const data = MsgRevealBid.encode(request).finish();
    const promise = this.rpc.request("cerc.auction.v1.Msg", "RevealBid", data);
    return promise.then((data) =>
      MsgRevealBidResponse.decode(new _m0.Reader(data))
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
