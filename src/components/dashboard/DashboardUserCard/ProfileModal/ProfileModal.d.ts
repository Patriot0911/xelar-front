import { IModalBaseProps } from '@/components/ui/Modal/Modal';

export type ProfileModalTab = 'profile' | 'sessions' | 'services';

export interface IProfileTabNavProps {
  activeTab: ProfileModalTab;
  onTabChange: (tab: ProfileModalTab) => void;
}

export interface IProfileModalProps extends IModalBaseProps {}
