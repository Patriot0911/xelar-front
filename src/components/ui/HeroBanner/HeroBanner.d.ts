import { PropsWithChildren } from 'react';

export interface IHeroBannerProps extends PropsWithChildren {
  /** Id the fallback gradient is generated from (stable per entity). */
  seed: string;
  /** Real banner image; the gradient is shown when it's missing or fails to load. */
  imageUrl?: string | null;
  className?: string;
};
