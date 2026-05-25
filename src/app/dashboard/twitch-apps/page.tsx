'use client';

import { useState } from 'react';
import { LuExternalLink } from 'react-icons/lu';
import styles from './page.module.scss';
import PageHeader from '@/components/ui/PageHeader';
import TwitchAppModal from '@/components/twitch-apps/TwitchAppModal';
import { AddTwitchAppModal } from '@/components/twitch-apps/AddTwitchAppModal';

export default function TwitchAppsPage() {
  const [isOpenAppModal, setIsOpenAppModal] = useState(false);
  return (
    <>
      {/* Page header */}
      <PageHeader
        eyebrow="Integration · OAuth source"
        title="Twitch Apps"
      >
        <div className={styles.pageHeadRight}>
          {/* <a
            href="https://dev.twitch.tv/console/apps"
            target="_blank"
            rel="noreferrer"
            className={styles.btnGhost}
          >
            <LuExternalLink size={13} style={{ marginRight: 6 }} />
            Twitch Dev Console
          </a> */}
          <AddTwitchAppModal />
          <button onClick={() => setIsOpenAppModal(true)}>Test</button>
          <TwitchAppModal
            isOpen={isOpenAppModal}
            onClose={() => setIsOpenAppModal(false)}
          />
        </div>
      </PageHeader>
    </>
  );
}
