import { EncodeObject, GeneratedType } from '@cosmjs/proto-signing';

import { MsgReserveAuthority, MsgReserveAuthorityResponse, MsgSetAuthorityBond, MsgSetAuthorityBondResponse } from '../../../proto2/cerc/registry/v1/tx';

export const typeUrlMsgReserveAuthority = '/cerc.registry.v1.MsgReserveAuthority';
export const typeUrlMsgSetAuthorityBond = '/cerc.registry.v1.MsgSetAuthorityBond';
export const typeUrlMsgReserveAuthorityResponse = '/cerc.registry.v1.MsgReserveAuthorityResponse';
export const typeUrlMsgSetAuthorityBondResponse = '/cerc.registry.v1.MsgSetAuthorityBondResponse';

export const registryTypes: ReadonlyArray<[string, GeneratedType]> = [
  [typeUrlMsgReserveAuthority, MsgReserveAuthority],
  [typeUrlMsgReserveAuthorityResponse, MsgReserveAuthorityResponse],
  [typeUrlMsgSetAuthorityBond, MsgSetAuthorityBond],
  [typeUrlMsgSetAuthorityBondResponse, MsgSetAuthorityBondResponse]
];

export interface MsgReserveAuthorityEncodeObject extends EncodeObject {
  readonly typeUrl: '/cerc.registry.v1.MsgReserveAuthority';
  readonly value: Partial<MsgReserveAuthority>;
}

export interface MsgSetAuthorityBondEncodeObject extends EncodeObject {
  readonly typeUrl: '/cerc.registry.v1.MsgSetAuthorityBond';
  readonly value: Partial<MsgSetAuthorityBond>;
}
