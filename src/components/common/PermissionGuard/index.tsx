'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useHasPermission } from '@/hooks/shared/useHasPermission';
import { IPermissionGuardProps } from './PermissionGuard';

const PermissionGuard = ({
  children,
  requiredPermissions,
  redirectTo = '/dashboard',
}: IPermissionGuardProps) => {
  const router = useRouter();
  const hasPermission = useHasPermission(requiredPermissions);

  useEffect(() => {
    if (hasPermission === false) {
      router.replace(redirectTo);
    }
  }, [hasPermission, redirectTo, router]);

  if (hasPermission === undefined || hasPermission === false) {
    return null;
  }

  return <>{children}</>;
};

export default PermissionGuard;
