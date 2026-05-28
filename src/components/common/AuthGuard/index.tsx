'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/hooks/redux';
import { authStatusSelector } from '@/hooks/redux/auth';
import { IAuthGuardProps } from './AuthGuard';

const AuthGuard = ({ children, guestOnly, redirectTo }: IAuthGuardProps) => {
  const router = useRouter();
  const status = useAppSelector(authStatusSelector);

  const isAuthenticated = status == 'authenticated';
  const canAccess = guestOnly ? !isAuthenticated : isAuthenticated;

  useEffect(() => {
    if (status === 'init') {
      return;
    }

    if (!canAccess) {
      const redirect =  !guestOnly ? '/auth' : '/dashboard';
      router.replace(redirectTo ?? redirect);
      return;
    }
  }, [canAccess, status, guestOnly]);

  if (!canAccess) {
    return null;
  }

  return <>{children}</>;
}

export default AuthGuard;
