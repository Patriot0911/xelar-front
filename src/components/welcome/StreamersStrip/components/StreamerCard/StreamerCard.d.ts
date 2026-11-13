import { IShowcaseStreamer } from '@/lib/models/welcome';

export interface IStreamerCardProps {
  streamer: IShowcaseStreamer;
  activityWindowDays: number;
  /** Visual duplicate for the seamless marquee loop: hidden from assistive tech and the tab order. */
  isClone?: boolean;
};
