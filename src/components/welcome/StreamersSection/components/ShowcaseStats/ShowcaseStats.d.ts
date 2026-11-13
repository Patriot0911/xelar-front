import { IStreamersShowcase } from '@/lib/models/welcome';

export interface IShowcaseStatsProps extends Pick<IStreamersShowcase, 'stats' | 'activityWindowDays'> {};
