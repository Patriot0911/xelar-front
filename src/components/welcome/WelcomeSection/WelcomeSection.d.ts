import { PropsWithChildren } from 'react';

export interface IWelcomeSectionProps extends PropsWithChildren {
  id: string;
  labelledBy?: string;
  className?: string;
};
