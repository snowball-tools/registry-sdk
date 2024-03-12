import { EncodeObject, GeneratedType } from '@cosmjs/proto-signing';

import { MsgReserveAuthority, MsgReserveAuthorityResponse, MsgSetAuthorityBond, MsgSetAuthorityBondResponse, MsgSetRecord, MsgSetRecordResponse, MsgSetName, MsgSetNameResponse, MsgDeleteName, MsgDeleteNameResponse, MsgAssociateBond, MsgAssociateBondResponse, MsgDissociateBond, MsgDissociateBondResponse, MsgDissociateRecords, MsgReassociateRecords, MsgDissociateRecordsResponse, MsgReassociateRecordsResponse } from '../../../proto2/cerc/registry/v1/tx';

export const typeUrlMsgReserveAuthority = '/cerc.registry.v1.MsgReserveAuthority';
export const typeUrlMsgSetRecord = '/cerc.registry.v1.MsgSetRecord';
export const typeUrlMsgSetAuthorityBond = '/cerc.registry.v1.MsgSetAuthorityBond';
export const typeUrlMsgReserveAuthorityResponse = '/cerc.registry.v1.MsgReserveAuthorityResponse';
export const typeUrlMsgSetRecordResponse = '/cerc.registry.v1.MsgSetRecordResponse';
export const typeUrlMsgSetAuthorityBondResponse = '/cerc.registry.v1.MsgSetAuthorityBondResponse';
export const typeUrlMsgSetName = '/cerc.registry.v1.MsgSetName';
export const typeUrlMsgSetNameResponse = '/cerc.registry.v1.MsgSetNameResponse';
export const typeUrlMsgDeleteName = '/cerc.registry.v1.MsgDeleteName';
export const typeUrlMsgDeleteNameResponse = '/cerc.registry.v1.MsgDeleteNameResponse';
export const typeUrlMsgAssociateBond = '/cerc.registry.v1.MsgAssociateBond';
export const typeUrlMsgDissociateBond = '/cerc.registry.v1.MsgDissociateBond';
export const typeUrlMsgAssociateBondResponse = '/cerc.registry.v1.MsgAssociateBondResponse';
export const typeUrlMsgDissociateBondResponse = '/cerc.registry.v1.MsgDissociateBondResponse';
export const typeUrlMsgDissociateRecords = '/cerc.registry.v1.MsgDissociateRecords';
export const typeUrlMsgReassociateRecords = '/cerc.registry.v1.MsgReassociateRecords';
export const typeUrlMsgDissociateRecordsResponse = '/cerc.registry.v1.MsgDissociateRecordsResponse';
export const typeUrlMsgReassociateRecordsResponse = '/cerc.registry.v1.MsgReassociateRecordsResponse';

export const registryTypes: ReadonlyArray<[string, GeneratedType]> = [
  [typeUrlMsgReserveAuthority, MsgReserveAuthority],
  [typeUrlMsgReserveAuthorityResponse, MsgReserveAuthorityResponse],
  [typeUrlMsgSetRecord, MsgSetRecord],
  [typeUrlMsgSetRecordResponse, MsgSetRecordResponse],
  [typeUrlMsgSetAuthorityBond, MsgSetAuthorityBond],
  [typeUrlMsgSetAuthorityBondResponse, MsgSetAuthorityBondResponse],
  [typeUrlMsgSetName, MsgSetName],
  [typeUrlMsgSetNameResponse, MsgSetNameResponse],
  [typeUrlMsgDeleteName, MsgDeleteName],
  [typeUrlMsgDeleteNameResponse, MsgDeleteNameResponse],
  [typeUrlMsgAssociateBond, MsgAssociateBond],
  [typeUrlMsgAssociateBondResponse, MsgAssociateBondResponse],
  [typeUrlMsgDissociateBond, MsgDissociateBond],
  [typeUrlMsgDissociateBondResponse, MsgDissociateBondResponse],
  [typeUrlMsgDissociateRecords, MsgDissociateRecords],
  [typeUrlMsgReassociateRecords, MsgReassociateRecords],
  [typeUrlMsgDissociateRecordsResponse, MsgDissociateRecordsResponse],
  [typeUrlMsgReassociateRecordsResponse, MsgReassociateRecordsResponse]
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

export interface MsgDeleteNameEncodeObject extends EncodeObject {
  readonly typeUrl: '/cerc.registry.v1.MsgDeleteName';
  readonly value: Partial<MsgDeleteName>;
}

export interface MsgAssociateBondEncodeObject extends EncodeObject {
  readonly typeUrl: '/cerc.registry.v1.MsgAssociateBond';
  readonly value: Partial<MsgAssociateBond>;
}

export interface MsgDissociateBondEncodeObject extends EncodeObject {
  readonly typeUrl: '/cerc.registry.v1.MsgDissociateBond';
  readonly value: Partial<MsgDissociateBond>;
}

export interface MsgDissociateRecordsEncodeObject extends EncodeObject {
  readonly typeUrl: '/cerc.registry.v1.MsgDissociateRecords';
  readonly value: Partial<MsgDissociateRecords>;
}

export interface MsgReassociateRecordsEncodeObject extends EncodeObject {
  readonly typeUrl: '/cerc.registry.v1.MsgReassociateRecords';
  readonly value: Partial<MsgReassociateRecords>;
}
