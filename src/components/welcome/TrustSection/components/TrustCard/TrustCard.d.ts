import { IWelcomeTrustPoint } from '@/lib/models/welcome';

export interface ITrustCardProps extends Omit<IWelcomeTrustPoint, 'id'> {};
