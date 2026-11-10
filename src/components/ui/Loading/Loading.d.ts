/**
 * spinner — bare ring (inside buttons, overlays, small slots)
 * inline  — small ring + label in one row (table cells, inline placeholders)
 * block   — centred ring + title/description that fills a content area (page or section loading)
 * card    — glowing card with ring + title/description (full-screen flows such as OAuth callbacks)
 */
export type LoadingType = 'spinner' | 'inline' | 'block' | 'card';

export type LoadingTone = 'accent' | 'discord' | 'twitch';

export type LoadingSize = 'sm' | 'md' | 'lg';

export interface ILoadingProps {
  type?: LoadingType;
  tone?: LoadingTone;
  size?: LoadingSize;
  title?: string;
  description?: string;
  className?: string;
};
