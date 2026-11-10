import { IModalBaseProps } from '@/components/ui/Modal/Modal';
import { ButtonVariant } from '@/components/ui/buttons/buttons';

export interface IConfirmModalProps extends IModalBaseProps {
  description: string;
  title: string;
  isLoading?: boolean;
  confirmLabel?: string;
  confirmVariant?: ButtonVariant;
  onConfirm: () => void;
  onCancel: () => void;
};
