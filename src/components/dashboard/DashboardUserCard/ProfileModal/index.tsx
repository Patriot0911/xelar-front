'use client';

import { useState } from 'react';
import { LuLogOut } from 'react-icons/lu';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/buttons/Button';
import ConfirmModal from '@/components/common/ConfirmModal';
import useMeQuery from '@/hooks/queries/auth/useMeQuery';
import useLogoutMutation from '@/hooks/mutations/auth/useLogoutMutation';
import ProfileUserInfo from './components/ProfileUserInfo';
import ProfileTabNav from './components/ProfileTabNav';
import SessionsTab from './tabs/SessionsTab';
import ServicesTab from './tabs/ServicesTab';
import ProfileTab from './tabs/ProfileTab';
import { IProfileModalProps, ProfileModalTab } from './ProfileModal';
import styles from './styles.module.scss';

const ProfileModal = ({ onClose, ...props }: IProfileModalProps) => {
  const [activeTab, setActiveTab] = useState<ProfileModalTab>('profile');
  const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState(false);
  const { data: meData } = useMeQuery();
  const logoutMutation = useLogoutMutation();

  const closeLogoutConfirm = () => {
    if (logoutMutation.isPending) return;
    setIsLogoutConfirmOpen(false);
  };

  // Reset the confirm step so it doesn't reappear next time the modal opens.
  const handleClose = () => {
    setIsLogoutConfirmOpen(false);
    onClose();
  };

  return (
    <>
      <Modal {...props} onClose={handleClose} className={styles.modal}>
        <ProfileUserInfo
          meData={meData}
          action={
            <Button
              variant="ghost"
              size="sm"
              leftIcon={<LuLogOut size={14} />}
              onClick={() => setIsLogoutConfirmOpen(true)}
            >
              Sign out
            </Button>
          }
        />
        <ProfileTabNav activeTab={activeTab} onTabChange={setActiveTab} />
        <div className={styles.tabContent}>
          {activeTab === 'sessions' && <SessionsTab />}
          {activeTab === 'services' && <ServicesTab />}
          {activeTab === 'profile' && <ProfileTab />}
        </div>
      </Modal>

      <ConfirmModal
        isOpen={props.isOpen && isLogoutConfirmOpen}
        title="Sign out"
        description="Are you sure you want to sign out of your account on this device?"
        confirmLabel="Sign out"
        confirmVariant="danger"
        isLoading={logoutMutation.isPending}
        onConfirm={() => logoutMutation.mutate()}
        onCancel={closeLogoutConfirm}
        onClose={closeLogoutConfirm}
      />
    </>
  );
};

export default ProfileModal;
