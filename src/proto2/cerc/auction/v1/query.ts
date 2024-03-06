/* eslint-disable */
import { Params, Auctions, Auction, Bid } from "./auction";
import { PageRequest } from "../../../cosmos/base/query/v1beta1/pagination";
import Long from "long";
import { Coin } from "../../../cosmos/base/v1beta1/coin";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "cerc.auction.v1";

/** QueryParamsRequest is the format to query the parameters of the auction module */
export interface QueryParamsRequest {}

/** QueryParamsResponse returns parameters of the auction module */
export interface QueryParamsResponse {
  params?: Params;
}

/** AuctionsRequest is the format for querying all the auctions */
export interface QueryAuctionsRequest {
  /** pagination defines an optional pagination info for the next request */
  pagination?: PageRequest;
}

/** AuctionsResponse returns the list of all auctions */
export interface QueryAuctionsResponse {
  /** List of auctions */
  auctions?: Auctions;
  /** pagination defines an optional pagination info for the next request */
  pagination?: PageRequest;
}

/** AuctionRequest is the format for querying a specific auction */
export interface QueryAuctionRequest {
  /** Auction id */
  id: string;
}

/** AuctionResponse returns the details of the queried auction */
export interface QueryAuctionResponse {
  /** Auction details */
  auction?: Auction;
}

/** BidRequest is the format for querying a specific bid in an auction */
export interface QueryBidRequest {
  /** Auction id */
  auctionId: string;
  /** Bidder address */
  bidder: string;
}

/** BidResponse returns the details of the queried bid */
export interface QueryBidResponse {
  /** Bid details */
  bid?: Bid;
}

/** BidsRequest is the format for querying all bids in an auction */
export interface QueryBidsRequest {
  /** Auction id */
  auctionId: string;
}

/** BidsResponse returns details of all bids in an auction */
export interface QueryBidsResponse {
  /** List of bids in the auction */
  bids: Bid[];
}

/** AuctionsByBidderRequest is the format for querying all auctions containing a bidder address */
export interface QueryAuctionsByBidderRequest {
  /** Address of the bidder */
  bidderAddress: string;
}

/** AuctionsByBidderResponse returns all auctions containing a bidder */
export interface QueryAuctionsByBidderResponse {
  /** List of auctions */
  auctions?: Auctions;
}

/** AuctionsByOwnerRequest is the format for querying all auctions created by an owner */
export interface QueryAuctionsByOwnerRequest {
  /** Address of the owner */
  ownerAddress: string;
}

/** AuctionsByOwnerResponse returns all auctions created by an owner */
export interface QueryAuctionsByOwnerResponse {
  /** List of auctions */
  auctions?: Auctions;
}

/** BalanceRequest is the format to fetch all balances */
export interface QueryGetAuctionModuleBalanceRequest {}

export interface QueryGetAuctionModuleBalanceResponse {
  /** Set of all balances within the auction */
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

function createBaseQueryAuctionsRequest(): QueryAuctionsRequest {
  return { pagination: undefined };
}

export const QueryAuctionsRequest = {
  encode(
    message: QueryAuctionsRequest,
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
  ): QueryAuctionsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAuctionsRequest();
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

  fromJSON(object: any): QueryAuctionsRequest {
    return {
      pagination: isSet(object.pagination)
        ? PageRequest.fromJSON(object.pagination)
        : undefined,
    };
  },

  toJSON(message: QueryAuctionsRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAuctionsRequest>, I>>(
    object: I
  ): QueryAuctionsRequest {
    const message = createBaseQueryAuctionsRequest();
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageRequest.fromPartial(object.pagination)
        : undefined;
    return message;
  },
};

function createBaseQueryAuctionsResponse(): QueryAuctionsResponse {
  return { auctions: undefined, pagination: undefined };
}

export const QueryAuctionsResponse = {
  encode(
    message: QueryAuctionsResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.auctions !== undefined) {
      Auctions.encode(message.auctions, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryAuctionsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAuctionsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.auctions = Auctions.decode(reader, reader.uint32());
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

  fromJSON(object: any): QueryAuctionsResponse {
    return {
      auctions: isSet(object.auctions)
        ? Auctions.fromJSON(object.auctions)
        : undefined,
      pagination: isSet(object.pagination)
        ? PageRequest.fromJSON(object.pagination)
        : undefined,
    };
  },

  toJSON(message: QueryAuctionsResponse): unknown {
    const obj: any = {};
    message.auctions !== undefined &&
      (obj.auctions = message.auctions
        ? Auctions.toJSON(message.auctions)
        : undefined);
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAuctionsResponse>, I>>(
    object: I
  ): QueryAuctionsResponse {
    const message = createBaseQueryAuctionsResponse();
    message.auctions =
      object.auctions !== undefined && object.auctions !== null
        ? Auctions.fromPartial(object.auctions)
        : undefined;
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageRequest.fromPartial(object.pagination)
        : undefined;
    return message;
  },
};

function createBaseQueryAuctionRequest(): QueryAuctionRequest {
  return { id: "" };
}

export const QueryAuctionRequest = {
  encode(
    message: QueryAuctionRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAuctionRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAuctionRequest();
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

  fromJSON(object: any): QueryAuctionRequest {
    return {
      id: isSet(object.id) ? String(object.id) : "",
    };
  },

  toJSON(message: QueryAuctionRequest): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAuctionRequest>, I>>(
    object: I
  ): QueryAuctionRequest {
    const message = createBaseQueryAuctionRequest();
    message.id = object.id ?? "";
    return message;
  },
};

function createBaseQueryAuctionResponse(): QueryAuctionResponse {
  return { auction: undefined };
}

export const QueryAuctionResponse = {
  encode(
    message: QueryAuctionResponse,
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
  ): QueryAuctionResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAuctionResponse();
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

  fromJSON(object: any): QueryAuctionResponse {
    return {
      auction: isSet(object.auction)
        ? Auction.fromJSON(object.auction)
        : undefined,
    };
  },

  toJSON(message: QueryAuctionResponse): unknown {
    const obj: any = {};
    message.auction !== undefined &&
      (obj.auction = message.auction
        ? Auction.toJSON(message.auction)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAuctionResponse>, I>>(
    object: I
  ): QueryAuctionResponse {
    const message = createBaseQueryAuctionResponse();
    message.auction =
      object.auction !== undefined && object.auction !== null
        ? Auction.fromPartial(object.auction)
        : undefined;
    return message;
  },
};

function createBaseQueryBidRequest(): QueryBidRequest {
  return { auctionId: "", bidder: "" };
}

export const QueryBidRequest = {
  encode(
    message: QueryBidRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.auctionId !== "") {
      writer.uint32(10).string(message.auctionId);
    }
    if (message.bidder !== "") {
      writer.uint32(18).string(message.bidder);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryBidRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryBidRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.auctionId = reader.string();
          break;
        case 2:
          message.bidder = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryBidRequest {
    return {
      auctionId: isSet(object.auctionId) ? String(object.auctionId) : "",
      bidder: isSet(object.bidder) ? String(object.bidder) : "",
    };
  },

  toJSON(message: QueryBidRequest): unknown {
    const obj: any = {};
    message.auctionId !== undefined && (obj.auctionId = message.auctionId);
    message.bidder !== undefined && (obj.bidder = message.bidder);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryBidRequest>, I>>(
    object: I
  ): QueryBidRequest {
    const message = createBaseQueryBidRequest();
    message.auctionId = object.auctionId ?? "";
    message.bidder = object.bidder ?? "";
    return message;
  },
};

function createBaseQueryBidResponse(): QueryBidResponse {
  return { bid: undefined };
}

export const QueryBidResponse = {
  encode(
    message: QueryBidResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.bid !== undefined) {
      Bid.encode(message.bid, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryBidResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryBidResponse();
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

  fromJSON(object: any): QueryBidResponse {
    return {
      bid: isSet(object.bid) ? Bid.fromJSON(object.bid) : undefined,
    };
  },

  toJSON(message: QueryBidResponse): unknown {
    const obj: any = {};
    message.bid !== undefined &&
      (obj.bid = message.bid ? Bid.toJSON(message.bid) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryBidResponse>, I>>(
    object: I
  ): QueryBidResponse {
    const message = createBaseQueryBidResponse();
    message.bid =
      object.bid !== undefined && object.bid !== null
        ? Bid.fromPartial(object.bid)
        : undefined;
    return message;
  },
};

function createBaseQueryBidsRequest(): QueryBidsRequest {
  return { auctionId: "" };
}

export const QueryBidsRequest = {
  encode(
    message: QueryBidsRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.auctionId !== "") {
      writer.uint32(10).string(message.auctionId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryBidsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryBidsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.auctionId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryBidsRequest {
    return {
      auctionId: isSet(object.auctionId) ? String(object.auctionId) : "",
    };
  },

  toJSON(message: QueryBidsRequest): unknown {
    const obj: any = {};
    message.auctionId !== undefined && (obj.auctionId = message.auctionId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryBidsRequest>, I>>(
    object: I
  ): QueryBidsRequest {
    const message = createBaseQueryBidsRequest();
    message.auctionId = object.auctionId ?? "";
    return message;
  },
};

function createBaseQueryBidsResponse(): QueryBidsResponse {
  return { bids: [] };
}

export const QueryBidsResponse = {
  encode(
    message: QueryBidsResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.bids) {
      Bid.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryBidsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryBidsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.bids.push(Bid.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryBidsResponse {
    return {
      bids: Array.isArray(object?.bids)
        ? object.bids.map((e: any) => Bid.fromJSON(e))
        : [],
    };
  },

  toJSON(message: QueryBidsResponse): unknown {
    const obj: any = {};
    if (message.bids) {
      obj.bids = message.bids.map((e) => (e ? Bid.toJSON(e) : undefined));
    } else {
      obj.bids = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryBidsResponse>, I>>(
    object: I
  ): QueryBidsResponse {
    const message = createBaseQueryBidsResponse();
    message.bids = object.bids?.map((e) => Bid.fromPartial(e)) || [];
    return message;
  },
};

function createBaseQueryAuctionsByBidderRequest(): QueryAuctionsByBidderRequest {
  return { bidderAddress: "" };
}

export const QueryAuctionsByBidderRequest = {
  encode(
    message: QueryAuctionsByBidderRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.bidderAddress !== "") {
      writer.uint32(10).string(message.bidderAddress);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryAuctionsByBidderRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAuctionsByBidderRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.bidderAddress = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAuctionsByBidderRequest {
    return {
      bidderAddress: isSet(object.bidderAddress)
        ? String(object.bidderAddress)
        : "",
    };
  },

  toJSON(message: QueryAuctionsByBidderRequest): unknown {
    const obj: any = {};
    message.bidderAddress !== undefined &&
      (obj.bidderAddress = message.bidderAddress);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAuctionsByBidderRequest>, I>>(
    object: I
  ): QueryAuctionsByBidderRequest {
    const message = createBaseQueryAuctionsByBidderRequest();
    message.bidderAddress = object.bidderAddress ?? "";
    return message;
  },
};

function createBaseQueryAuctionsByBidderResponse(): QueryAuctionsByBidderResponse {
  return { auctions: undefined };
}

export const QueryAuctionsByBidderResponse = {
  encode(
    message: QueryAuctionsByBidderResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.auctions !== undefined) {
      Auctions.encode(message.auctions, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryAuctionsByBidderResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAuctionsByBidderResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.auctions = Auctions.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAuctionsByBidderResponse {
    return {
      auctions: isSet(object.auctions)
        ? Auctions.fromJSON(object.auctions)
        : undefined,
    };
  },

  toJSON(message: QueryAuctionsByBidderResponse): unknown {
    const obj: any = {};
    message.auctions !== undefined &&
      (obj.auctions = message.auctions
        ? Auctions.toJSON(message.auctions)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAuctionsByBidderResponse>, I>>(
    object: I
  ): QueryAuctionsByBidderResponse {
    const message = createBaseQueryAuctionsByBidderResponse();
    message.auctions =
      object.auctions !== undefined && object.auctions !== null
        ? Auctions.fromPartial(object.auctions)
        : undefined;
    return message;
  },
};

function createBaseQueryAuctionsByOwnerRequest(): QueryAuctionsByOwnerRequest {
  return { ownerAddress: "" };
}

export const QueryAuctionsByOwnerRequest = {
  encode(
    message: QueryAuctionsByOwnerRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.ownerAddress !== "") {
      writer.uint32(10).string(message.ownerAddress);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryAuctionsByOwnerRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAuctionsByOwnerRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.ownerAddress = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAuctionsByOwnerRequest {
    return {
      ownerAddress: isSet(object.ownerAddress)
        ? String(object.ownerAddress)
        : "",
    };
  },

  toJSON(message: QueryAuctionsByOwnerRequest): unknown {
    const obj: any = {};
    message.ownerAddress !== undefined &&
      (obj.ownerAddress = message.ownerAddress);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAuctionsByOwnerRequest>, I>>(
    object: I
  ): QueryAuctionsByOwnerRequest {
    const message = createBaseQueryAuctionsByOwnerRequest();
    message.ownerAddress = object.ownerAddress ?? "";
    return message;
  },
};

function createBaseQueryAuctionsByOwnerResponse(): QueryAuctionsByOwnerResponse {
  return { auctions: undefined };
}

export const QueryAuctionsByOwnerResponse = {
  encode(
    message: QueryAuctionsByOwnerResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.auctions !== undefined) {
      Auctions.encode(message.auctions, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryAuctionsByOwnerResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAuctionsByOwnerResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.auctions = Auctions.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAuctionsByOwnerResponse {
    return {
      auctions: isSet(object.auctions)
        ? Auctions.fromJSON(object.auctions)
        : undefined,
    };
  },

  toJSON(message: QueryAuctionsByOwnerResponse): unknown {
    const obj: any = {};
    message.auctions !== undefined &&
      (obj.auctions = message.auctions
        ? Auctions.toJSON(message.auctions)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAuctionsByOwnerResponse>, I>>(
    object: I
  ): QueryAuctionsByOwnerResponse {
    const message = createBaseQueryAuctionsByOwnerResponse();
    message.auctions =
      object.auctions !== undefined && object.auctions !== null
        ? Auctions.fromPartial(object.auctions)
        : undefined;
    return message;
  },
};

function createBaseQueryGetAuctionModuleBalanceRequest(): QueryGetAuctionModuleBalanceRequest {
  return {};
}

export const QueryGetAuctionModuleBalanceRequest = {
  encode(
    _: QueryGetAuctionModuleBalanceRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryGetAuctionModuleBalanceRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetAuctionModuleBalanceRequest();
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

  fromJSON(_: any): QueryGetAuctionModuleBalanceRequest {
    return {};
  },

  toJSON(_: QueryGetAuctionModuleBalanceRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<QueryGetAuctionModuleBalanceRequest>, I>
  >(_: I): QueryGetAuctionModuleBalanceRequest {
    const message = createBaseQueryGetAuctionModuleBalanceRequest();
    return message;
  },
};

function createBaseQueryGetAuctionModuleBalanceResponse(): QueryGetAuctionModuleBalanceResponse {
  return { balance: [] };
}

export const QueryGetAuctionModuleBalanceResponse = {
  encode(
    message: QueryGetAuctionModuleBalanceResponse,
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
  ): QueryGetAuctionModuleBalanceResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetAuctionModuleBalanceResponse();
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

  fromJSON(object: any): QueryGetAuctionModuleBalanceResponse {
    return {
      balance: Array.isArray(object?.balance)
        ? object.balance.map((e: any) => Coin.fromJSON(e))
        : [],
    };
  },

  toJSON(message: QueryGetAuctionModuleBalanceResponse): unknown {
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
    I extends Exact<DeepPartial<QueryGetAuctionModuleBalanceResponse>, I>
  >(object: I): QueryGetAuctionModuleBalanceResponse {
    const message = createBaseQueryGetAuctionModuleBalanceResponse();
    message.balance = object.balance?.map((e) => Coin.fromPartial(e)) || [];
    return message;
  },
};

/** Query defines the gRPC querier interface for the auction module */
export interface Query {
  /** Params queries auction module params */
  Params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
  /** Auctions queries all auctions */
  Auctions(request: QueryAuctionsRequest): Promise<QueryAuctionsResponse>;
  /** GetAuction queries an auction */
  GetAuction(request: QueryAuctionRequest): Promise<QueryAuctionResponse>;
  /** GetBid queries an auction bid */
  GetBid(request: QueryBidRequest): Promise<QueryBidResponse>;
  /** GetBids queries all auction bids */
  GetBids(request: QueryBidsRequest): Promise<QueryBidsResponse>;
  /** AuctionsByBidder queries auctions by bidder */
  AuctionsByBidder(
    request: QueryAuctionsByBidderRequest
  ): Promise<QueryAuctionsByBidderResponse>;
  /** AuctionsByOwner queries auctions by owner */
  AuctionsByOwner(
    request: QueryAuctionsByOwnerRequest
  ): Promise<QueryAuctionsByOwnerResponse>;
  /** GetAuctionModuleBalance queries the auction module account balance */
  GetAuctionModuleBalance(
    request: QueryGetAuctionModuleBalanceRequest
  ): Promise<QueryGetAuctionModuleBalanceResponse>;
}

export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.Params = this.Params.bind(this);
    this.Auctions = this.Auctions.bind(this);
    this.GetAuction = this.GetAuction.bind(this);
    this.GetBid = this.GetBid.bind(this);
    this.GetBids = this.GetBids.bind(this);
    this.AuctionsByBidder = this.AuctionsByBidder.bind(this);
    this.AuctionsByOwner = this.AuctionsByOwner.bind(this);
    this.GetAuctionModuleBalance = this.GetAuctionModuleBalance.bind(this);
  }
  Params(request: QueryParamsRequest): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request("cerc.auction.v1.Query", "Params", data);
    return promise.then((data) =>
      QueryParamsResponse.decode(new _m0.Reader(data))
    );
  }

  Auctions(request: QueryAuctionsRequest): Promise<QueryAuctionsResponse> {
    const data = QueryAuctionsRequest.encode(request).finish();
    const promise = this.rpc.request("cerc.auction.v1.Query", "Auctions", data);
    return promise.then((data) =>
      QueryAuctionsResponse.decode(new _m0.Reader(data))
    );
  }

  GetAuction(request: QueryAuctionRequest): Promise<QueryAuctionResponse> {
    const data = QueryAuctionRequest.encode(request).finish();
    const promise = this.rpc.request(
      "cerc.auction.v1.Query",
      "GetAuction",
      data
    );
    return promise.then((data) =>
      QueryAuctionResponse.decode(new _m0.Reader(data))
    );
  }

  GetBid(request: QueryBidRequest): Promise<QueryBidResponse> {
    const data = QueryBidRequest.encode(request).finish();
    const promise = this.rpc.request("cerc.auction.v1.Query", "GetBid", data);
    return promise.then((data) =>
      QueryBidResponse.decode(new _m0.Reader(data))
    );
  }

  GetBids(request: QueryBidsRequest): Promise<QueryBidsResponse> {
    const data = QueryBidsRequest.encode(request).finish();
    const promise = this.rpc.request("cerc.auction.v1.Query", "GetBids", data);
    return promise.then((data) =>
      QueryBidsResponse.decode(new _m0.Reader(data))
    );
  }

  AuctionsByBidder(
    request: QueryAuctionsByBidderRequest
  ): Promise<QueryAuctionsByBidderResponse> {
    const data = QueryAuctionsByBidderRequest.encode(request).finish();
    const promise = this.rpc.request(
      "cerc.auction.v1.Query",
      "AuctionsByBidder",
      data
    );
    return promise.then((data) =>
      QueryAuctionsByBidderResponse.decode(new _m0.Reader(data))
    );
  }

  AuctionsByOwner(
    request: QueryAuctionsByOwnerRequest
  ): Promise<QueryAuctionsByOwnerResponse> {
    const data = QueryAuctionsByOwnerRequest.encode(request).finish();
    const promise = this.rpc.request(
      "cerc.auction.v1.Query",
      "AuctionsByOwner",
      data
    );
    return promise.then((data) =>
      QueryAuctionsByOwnerResponse.decode(new _m0.Reader(data))
    );
  }

  GetAuctionModuleBalance(
    request: QueryGetAuctionModuleBalanceRequest
  ): Promise<QueryGetAuctionModuleBalanceResponse> {
    const data = QueryGetAuctionModuleBalanceRequest.encode(request).finish();
    const promise = this.rpc.request(
      "cerc.auction.v1.Query",
      "GetAuctionModuleBalance",
      data
    );
    return promise.then((data) =>
      QueryGetAuctionModuleBalanceResponse.decode(new _m0.Reader(data))
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
