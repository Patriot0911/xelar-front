import { IModalBaseProps } from '@/components/ui/Modal/Modal';

export interface IConfirmModalProps extends IModalBaseProps {
  description: string;
  title: string;
  isLoading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};
