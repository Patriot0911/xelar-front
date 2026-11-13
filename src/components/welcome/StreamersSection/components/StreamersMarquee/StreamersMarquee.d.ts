import { IShowcaseStreamer } from '@/lib/models/welcome';

export interface IStreamersMarqueeProps {
  streamers: IShowcaseStreamer[];
  activityWindowDays: number;
};
