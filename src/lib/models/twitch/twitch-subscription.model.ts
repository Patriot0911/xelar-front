import { IGenericList } from '../generic-response.model';

export type TLocalEventStatus = 'pending' | 'verified' | 'revoked';
export type TRawSubscriptionStatus =
  | 'enabled'
  | 'webhook_callback_verification_pending'
  | 'webhook_callback_verification_failed'
  | 'authorization_revoked'
  | 'user_removed'
  | string;

export interface ITwitchSubscriptionAppInfo {
  id: string;
  name: string;
  clientId: string;
  status: string;
}

export interface ITwitchSubscriptionStreamerInfo {
  id: string;
  broadcasterId: string;
  twitchLogin: string;
  displayName: string;
  profileImageUrl: string | null;
}

export interface ITwitchLocalSubscription {
  id: string;
  subscriptionId: string | null;
  event: string;
  eventStatus: TLocalEventStatus;
  appCost: number;
  createdAt: string;
  twitchApp: ITwitchSubscriptionAppInfo | null;
  streamer: ITwitchSubscriptionStreamerInfo | null;
}

export type TTwitchLocalSubscriptionsList = IGenericList<ITwitchLocalSubscription>;

export interface IRawSubscriptionLocalEntity {
  id: string;
  eventStatus: TLocalEventStatus;
  streamerId: string;
  streamerLogin: string | null;
}

export interface IRawTwitchSubscription {
  subscriptionId: string;
  status: TRawSubscriptionStatus;
  event: string;
  cost: number;
  createdAt: string;
  condition: Record<string, unknown>;
  transport: { method: string; callback: string };
  twitchApp: { clientId: string };
  isOrphaned: boolean;
  localEntity: IRawSubscriptionLocalEntity | null;
}

export interface IRawTwitchSubscriptionsMeta {
  total: number;
  totalCost: number;
  maxTotalCost: number;
  cursor: string | null;
}

export interface IRawTwitchSubscriptionsResponse {
  items: IRawTwitchSubscription[];
  meta: IRawTwitchSubscriptionsMeta;
}

export interface IDeleteTwitchSubscriptionPayload {
  subscriptionId: string;
  clientId: string;
}
