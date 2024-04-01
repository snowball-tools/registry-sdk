import { GeneratedType } from '@cosmjs/proto-signing';

import {
  MsgSendResponse
} from '../../../proto/cosmos/bank/v1beta1/tx';

export const typeUrlMsgSendResponse = '/cosmos.bank.v1beta1.MsgSendResponse';

export const bankTypes: ReadonlyArray<[string, GeneratedType]> = [
  [typeUrlMsgSendResponse, MsgSendResponse]
];

export interface MessageMsgSendCoins {
  destinationAddress: string;
  amount: string;
  denom: string;
}
