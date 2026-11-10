import { PropsWithChildren, ReactNode } from 'react';

export interface IUserInfoItemProps extends PropsWithChildren {
  label: string;
  action?: ReactNode;
  fullWidth?: boolean;
  mono?: boolean;
};
