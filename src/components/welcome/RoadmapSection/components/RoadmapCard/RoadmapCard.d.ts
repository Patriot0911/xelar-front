import { IRoadmapItem } from '@/lib/models/welcome';

export interface IRoadmapCardProps extends Omit<IRoadmapItem, 'id'> {};
