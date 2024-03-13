import { EncodeObject, GeneratedType } from '@cosmjs/proto-signing';

import {
  MsgCreateBond,
  MsgRefillBond,
  MsgWithdrawBond,
  MsgCancelBond,
  MsgCreateBondResponse,
  MsgRefillBondResponse,
  MsgWithdrawBondResponse,
  MsgCancelBondResponse
} from '../../../proto2/cerc/bond/v1/tx';

export const typeUrlMsgCreateBond = '/cerc.bond.v1.MsgCreateBond';
export const typeUrlMsgRefillBond = '/cerc.bond.v1.MsgRefillBond';
export const typeUrlMsgWithdrawBond = '/cerc.bond.v1.MsgWithdrawBond';
export const typeUrlMsgCancelBond = '/cerc.bond.v1.MsgCancelBond';
export const typeUrlMsgCreateBondResponse = '/cerc.bond.v1.MsgCreateBondResponse';
export const typeUrlMsgRefillBondResponse = '/cerc.bond.v1.MsgRefillBondResponse';
export const typeUrlMsgWithdrawBondResponse = '/cerc.bond.v1.MsgWithdrawBondResponse';
export const typeUrlMsgCancelBondResponse = '/cerc.bond.v1.MsgCancelBondResponse';

export const bondTypes: ReadonlyArray<[string, GeneratedType]> = [
  [typeUrlMsgCreateBond, MsgCreateBond],
  [typeUrlMsgCreateBondResponse, MsgCreateBondResponse],
  [typeUrlMsgRefillBond, MsgRefillBond],
  [typeUrlMsgRefillBondResponse, MsgRefillBondResponse],
  [typeUrlMsgWithdrawBond, MsgWithdrawBond],
  [typeUrlMsgWithdrawBondResponse, MsgWithdrawBondResponse],
  [typeUrlMsgCancelBond, MsgCancelBond],
  [typeUrlMsgCancelBondResponse, MsgCancelBondResponse]
];

export interface MsgCreateBondEncodeObject extends EncodeObject {
  readonly typeUrl: '/cerc.bond.v1.MsgCreateBond';
  readonly value: Partial<MsgCreateBond>;
}

export interface MsgRefillBondEncodeObject extends EncodeObject {
  readonly typeUrl: '/cerc.bond.v1.MsgRefillBond';
  readonly value: Partial<MsgRefillBond>;
}

export interface MsgWithdrawBondEncodeObject extends EncodeObject {
  readonly typeUrl: '/cerc.bond.v1.MsgWithdrawBond';
  readonly value: Partial<MsgWithdrawBond>;
}

export interface MsgCancelBondEncodeObject extends EncodeObject {
  readonly typeUrl: '/cerc.bond.v1.MsgCancelBond';
  readonly value: Partial<MsgCancelBond>;
}

export interface MessageMsgCreateBond {
  amount: string
  denom: string
}

export interface MessageMsgRefillBond {
  id: string,
  amount: string
  denom: string
}

export interface MessageMsgWithdrawBond {
  id: string
  amount: string
  denom: string
}

export interface MessageMsgCancelBond {
  id: string
}

export interface MessageMsgAssociateBond {
  bondId: string,
  recordId: string
}

export interface MessageMsgDissociateBond {
  recordId: string
}

export interface MessageMsgDissociateRecords {
  bondId: string
}

export interface MessageMsgReAssociateRecords {
  newBondId: string
  oldBondId: string
}
