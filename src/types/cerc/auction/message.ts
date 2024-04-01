import { EncodeObject, GeneratedType } from '@cosmjs/proto-signing';

import { MsgCommitBidResponse, MsgCommitBid, MsgRevealBid, MsgRevealBidResponse } from '../../../proto/cerc/auction/v1/tx';

export const typeUrlMsgCommitBid = '/cerc.auction.v1.MsgCommitBid';
export const typeUrlMsgCommitBidResponse = '/cerc.auction.v1.MsgCommitBidResponse';
export const typeUrlMsgRevealBid = '/cerc.auction.v1.MsgRevealBid';
export const typeUrlMsgRevealBidResponse = '/cerc.auction.v1.MsgRevealBidResponse';

export const auctionTypes: ReadonlyArray<[string, GeneratedType]> = [
  [typeUrlMsgCommitBid, MsgCommitBid],
  [typeUrlMsgCommitBidResponse, MsgCommitBidResponse],
  [typeUrlMsgRevealBid, MsgRevealBid],
  [typeUrlMsgRevealBidResponse, MsgRevealBidResponse]
];

export interface MsgCommitBidEncodeObject extends EncodeObject {
  readonly typeUrl: '/cerc.auction.v1.MsgCommitBid';
  readonly value: Partial<MsgCommitBid>;
}

export interface MsgRevealBidEncodeObject extends EncodeObject {
  readonly typeUrl: '/cerc.auction.v1.MsgRevealBid';
  readonly value: Partial<MsgRevealBid>;
}

export interface MessageMsgCommitBid {
  auctionId: string,
  commitHash: string,
}

export interface MessageMsgRevealBid {
  auctionId: string,
  reveal: string,
}
