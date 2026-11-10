'use client';

import { LuArrowRight } from 'react-icons/lu';
import LinkButton from '@/components/ui/buttons/LinkButton';
import { useAppSelector } from '@/hooks/redux';
import { authStatusSelector } from '@/hooks/redux/auth';
import { IWelcomeCtaLinkProps } from './WelcomeCtaLink';

const WelcomeCtaLink = ({
  guestLabel = 'Get started',
  authenticatedLabel = 'Open dashboard',
  variant = 'primary',
  size = 'md',
  className,
}: IWelcomeCtaLinkProps) => {
  const isAuthenticated = useAppSelector(authStatusSelector) === 'authenticated';

  return (
    <LinkButton
      href={isAuthenticated ? '/dashboard' : '/auth'}
      variant={variant}
      size={size}
      className={className}
      rightIcon={<LuArrowRight size={15} />}
    >
      {isAuthenticated ? authenticatedLabel : guestLabel}
    </LinkButton>
  );
}

export default WelcomeCtaLink;
