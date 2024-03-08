import { EncodeObject, GeneratedType } from '@cosmjs/proto-signing';

import { MsgReserveAuthority, MsgReserveAuthorityResponse, MsgSetAuthorityBond, MsgSetAuthorityBondResponse, MsgSetRecord, MsgSetRecordResponse } from '../../../proto2/cerc/registry/v1/tx';

export const typeUrlMsgReserveAuthority = '/cerc.registry.v1.MsgReserveAuthority';
export const typeUrlMsgSetRecord = '/cerc.registry.v1.MsgSetRecord';
export const typeUrlMsgSetAuthorityBond = '/cerc.registry.v1.MsgSetAuthorityBond';
export const typeUrlMsgReserveAuthorityResponse = '/cerc.registry.v1.MsgReserveAuthorityResponse';
export const typeUrlMsgSetRecordResponse = '/cerc.registry.v1.MsgSetRecordResponse';
export const typeUrlMsgSetAuthorityBondResponse = '/cerc.registry.v1.MsgSetAuthorityBondResponse';

export const registryTypes: ReadonlyArray<[string, GeneratedType]> = [
  [typeUrlMsgReserveAuthority, MsgReserveAuthority],
  [typeUrlMsgReserveAuthorityResponse, MsgReserveAuthorityResponse],
  [typeUrlMsgSetRecord, MsgSetRecord],
  [typeUrlMsgSetRecordResponse, MsgSetRecordResponse],
  [typeUrlMsgSetAuthorityBond, MsgSetAuthorityBond],
  [typeUrlMsgSetAuthorityBondResponse, MsgSetAuthorityBondResponse]
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
