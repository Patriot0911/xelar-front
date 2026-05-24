import { PropsWithChildren, ReactNode } from 'react';

export interface IPageHeaderProps extends PropsWithChildren {
  eyebrow?: string;
  title: string;
  count?: number;
  description?: string;
  actions?: ReactNode;
};
