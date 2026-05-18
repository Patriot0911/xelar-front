'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useIsAuthenticated } from '@/hooks/shared/useIsAuthenticated';

export default function RootPage() {
  const router = useRouter();
  const isAuthenticated = useIsAuthenticated();

  useEffect(() => {
    router.replace(isAuthenticated ? '/dashboard' : '/auth');
  }, [isAuthenticated, router]);

  return null;
}
