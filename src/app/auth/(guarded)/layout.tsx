import AuthGuard from '@/components/common/AuthGuard';
import { PropsWithChildren } from 'react';

const AuthLayout = ({ children }: PropsWithChildren) => {
  return (
    <AuthGuard guestOnly>
      {children}
    </AuthGuard>
  );
}

export default AuthLayout;
