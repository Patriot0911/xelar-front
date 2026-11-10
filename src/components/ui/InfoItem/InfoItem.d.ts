import { PropsWithChildren, ReactNode } from 'react';

export interface IInfoItemProps extends PropsWithChildren {
  label: string;
  action?: ReactNode;
  fullWidth?: boolean;
  mono?: boolean;
};
