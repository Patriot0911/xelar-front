import { PropsWithChildren } from 'react';

export interface IAuthGuardProps extends PropsWithChildren {
  guestOnly?: boolean;
  redirectTo?: string;
};
