'use client';

import { use, useState } from 'react';
import PageHeader from '@/components/ui/PageHeader';
import PageContent from '@/components/ui/PageContent';
import GuildNotificationsView from '@/components/discord/GuildNotificationsView';
import GuildManagementView from '@/components/discord/GuildManagementView';
import styles from './styles.module.scss';

type PageTab = 'notifications' | 'management';

interface IProps {
  params: Promise<{ guildId: string }>;
}

export default function GuildNotificationsPage({ params }: IProps) {
  const { guildId } = use(params);
  const [tab, setTab] = useState<PageTab>('notifications');

  return (
    <>
      <PageHeader
        eyebrow="Discord · Server"
        title="Server Dashboard"
      />
      <PageContent>
        <div className={styles.pageTabs}>
          <button
            className={`${styles.pageTab} ${tab === 'notifications' ? styles.pageTabActive : ''}`}
            onClick={() => setTab('notifications')}
          >
            Notifications
          </button>
          <button
            className={`${styles.pageTab} ${tab === 'management' ? styles.pageTabActive : ''}`}
            onClick={() => setTab('management')}
          >
            Management
          </button>
        </div>

        {tab === 'notifications' ? (
          <GuildNotificationsView guildId={guildId} />
        ) : (
          <GuildManagementView />
        )}
      </PageContent>
    </>
  );
}
