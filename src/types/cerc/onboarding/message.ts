import { EncodeObject, GeneratedType } from '@cosmjs/proto-signing';

import { MsgOnboardParticipantResponse, MsgOnboardParticipant } from '../../../proto/cerc/onboarding/v1/tx';

export const typeUrlMsgOnboardParticipant = '/cerc.onboarding.v1.MsgOnboardParticipant';
export const typeUrlMsgOnboardParticipantResponse = '/cerc.onboarding.v1.MsgOnboardParticipantResponse';

export const onboardingTypes: ReadonlyArray<[string, GeneratedType]> = [
  [typeUrlMsgOnboardParticipant, MsgOnboardParticipant],
  [typeUrlMsgOnboardParticipantResponse, MsgOnboardParticipantResponse]
];

export interface MsgOnboardParticipantEncodeObject extends EncodeObject {
  readonly typeUrl: '/cerc.onboarding.v1.MsgOnboardParticipant';
  readonly value: Partial<MsgOnboardParticipant>;
}

interface ethPayload {
  address: string
  msg: string
}

export interface MessageMsgOnboardParticipant {
  ethPayload: ethPayload
  ethSignature: string
  role: string
  kycId: string
}
