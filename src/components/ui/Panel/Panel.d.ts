import { PropsWithChildren, ReactNode } from 'react';

export interface IPanelProps extends PropsWithChildren {
  title?: string;
  titleId?: string;
  actions?: ReactNode;
  className?: string;
};
