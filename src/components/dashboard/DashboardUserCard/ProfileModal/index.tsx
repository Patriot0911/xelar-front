'use client';

import { useState } from 'react';
import Modal from '@/components/ui/Modal';
import useMeQuery from '@/hooks/queries/auth/useMeQuery';
import ProfileUserInfo from './components/ProfileUserInfo';
import ProfileTabNav from './components/ProfileTabNav';
import SessionsTab from './tabs/SessionsTab';
import ServicesTab from './tabs/ServicesTab';
import ProfileTab from './tabs/ProfileTab';
import { IProfileModalProps, ProfileModalTab } from './ProfileModal';
import styles from './styles.module.scss';

const ProfileModal = ({ onClose, ...props }: IProfileModalProps) => {
  const [activeTab, setActiveTab] = useState<ProfileModalTab>('profile');
  const { data: meData } = useMeQuery();

  return (
    <Modal {...props} onClose={onClose} className={styles.modal}>
      <ProfileUserInfo meData={meData} />
      <ProfileTabNav activeTab={activeTab} onTabChange={setActiveTab} />
      <div className={styles.tabContent}>
        {activeTab === 'sessions' && <SessionsTab />}
        {activeTab === 'services' && <ServicesTab />}
        {activeTab === 'profile' && <ProfileTab />}
      </div>
    </Modal>
  );
};

export default ProfileModal;
