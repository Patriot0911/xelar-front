import { LuLock, LuShield, LuZap } from 'react-icons/lu';

export enum TwitchAppStatus {
  Active = 'active',
  Internal = 'internal',
  Locked = 'locked',
};

export const twitchAppStates: Record<string, any> = {
  [TwitchAppStatus.Active]: {
    description: 'In the least-loaded pool',
    icon: LuZap,
  },
  [TwitchAppStatus.Internal]: {
    description: 'System use only',
    icon: LuShield,
  },
  [TwitchAppStatus.Locked]: {
    description: 'Excluded from rotation',
    icon: LuLock,
  },
};
