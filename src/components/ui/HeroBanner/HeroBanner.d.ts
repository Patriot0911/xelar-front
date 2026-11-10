import { PropsWithChildren } from 'react';

export interface IHeroBannerProps extends PropsWithChildren {
  /** Id the fallback gradient is generated from (stable per entity). */
  seed: string;
  /** Real banner image; the gradient is shown when it's missing or fails to load. */
  imageUrl?: string | null;
  className?: string;
  /** CSS colour the bottom of the banner fades into completely (e.g. `var(--panel)`), so it flows
   *  into the surface below. Without it the bottom only darkens for readability. */
  fadeInto?: string;
};
