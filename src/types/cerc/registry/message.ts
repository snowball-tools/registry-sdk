import { EncodeObject, GeneratedType } from '@cosmjs/proto-signing';

import { MsgReserveAuthority, MsgReserveAuthorityResponse, MsgSetAuthorityBond, MsgSetAuthorityBondResponse, MsgSetRecord, MsgSetRecordResponse, MsgSetName, MsgSetNameResponse, MsgDeleteNameAuthority, MsgDeleteNameAuthorityResponse } from '../../../proto2/cerc/registry/v1/tx';

export const typeUrlMsgReserveAuthority = '/cerc.registry.v1.MsgReserveAuthority';
export const typeUrlMsgSetRecord = '/cerc.registry.v1.MsgSetRecord';
export const typeUrlMsgSetAuthorityBond = '/cerc.registry.v1.MsgSetAuthorityBond';
export const typeUrlMsgReserveAuthorityResponse = '/cerc.registry.v1.MsgReserveAuthorityResponse';
export const typeUrlMsgSetRecordResponse = '/cerc.registry.v1.MsgSetRecordResponse';
export const typeUrlMsgSetAuthorityBondResponse = '/cerc.registry.v1.MsgSetAuthorityBondResponse';
export const typeUrlMsgSetName = '/cerc.registry.v1.MsgSetName';
export const typeUrlMsgSetNameResponse = '/cerc.registry.v1.MsgSetNameResponse';
export const typeUrlMsgDeleteNameAuthority = '/cerc.registry.v1.MsgDeleteNameAuthority';
export const typeUrlMsgDeleteNameAuthorityResponse = '/cerc.registry.v1.MsgDeleteNameAuthorityResponse';

export const registryTypes: ReadonlyArray<[string, GeneratedType]> = [
  [typeUrlMsgReserveAuthority, MsgReserveAuthority],
  [typeUrlMsgReserveAuthorityResponse, MsgReserveAuthorityResponse],
  [typeUrlMsgSetRecord, MsgSetRecord],
  [typeUrlMsgSetRecordResponse, MsgSetRecordResponse],
  [typeUrlMsgSetAuthorityBond, MsgSetAuthorityBond],
  [typeUrlMsgSetAuthorityBondResponse, MsgSetAuthorityBondResponse],
  [typeUrlMsgSetName, MsgSetName],
  [typeUrlMsgSetNameResponse, MsgSetNameResponse],
  [typeUrlMsgDeleteNameAuthority, MsgDeleteNameAuthority],
  [typeUrlMsgDeleteNameAuthorityResponse, MsgDeleteNameAuthorityResponse]
];

export interface MsgReserveAuthorityEncodeObject extends EncodeObject {
  readonly typeUrl: '/cerc.registry.v1.MsgReserveAuthority';
  readonly value: Partial<MsgReserveAuthority>;
}

export interface MsgSetRecordEncodeObject extends EncodeObject {
  readonly typeUrl: '/cerc.registry.v1.MsgSetRecord';
  readonly value: Partial<MsgSetRecord>;
}

export interface MsgSetAuthorityBondEncodeObject extends EncodeObject {
  readonly typeUrl: '/cerc.registry.v1.MsgSetAuthorityBond';
  readonly value: Partial<MsgSetAuthorityBond>;
}

export interface MsgSetNameEncodeObject extends EncodeObject {
  readonly typeUrl: '/cerc.registry.v1.MsgSetName';
  readonly value: Partial<MsgSetName>;
}

export interface MsgDeleteNameAuthorityEncodeObject extends EncodeObject {
  readonly typeUrl: '/cerc.registry.v1.MsgDeleteNameAuthority';
  readonly value: Partial<MsgDeleteNameAuthority>;
}
