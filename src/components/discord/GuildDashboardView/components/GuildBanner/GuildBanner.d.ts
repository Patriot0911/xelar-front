import { PropsWithChildren } from 'react';

export interface IGuildBannerProps extends PropsWithChildren {
  guildId: string;
  banner: string | null;
  className?: string;
};
