import { ButtonSize, LinkButtonVariant } from '@/components/ui/buttons/buttons';

export interface IWelcomeCtaLinkProps {
  guestLabel?: string;
  authenticatedLabel?: string;
  variant?: LinkButtonVariant;
  size?: ButtonSize;
  className?: string;
};
