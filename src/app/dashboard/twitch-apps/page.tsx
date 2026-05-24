'use client';

import { useState } from 'react';
import { LuChevronDown, LuExternalLink } from 'react-icons/lu';
import { AddTwitchAppModal } from '@/components/twitch-apps/AddTwitchAppModal';
import useTwitchAppsQuery from '@/hooks/queries/twitch/useTwitchAppsQuery';
import { TwitchAppType } from '@/lib/models/twitch/twitch-app.model';
import styles from './page.module.scss';
import PageHeader from '@/components/ui/PageHeader';

type FilterTab = 'all' | TwitchAppType;

const TABS: { key: FilterTab; label: string }[] = [
  { key: 'all',      label: 'All' },
  { key: 'active',   label: 'Active' },
  { key: 'internal', label: 'Internal' },
  { key: 'locked',   label: 'Locked' },
];

export default function TwitchAppsPage() {
  const { data, isLoading } = useTwitchAppsQuery();
  const [filter, setFilter] = useState<FilterTab>('all');

  const apps = data?.items ?? [];
  const hasApps = !isLoading && apps.length > 0;

  return (
    <>
      {/* Page header */}
      <PageHeader
        eyebrow="Integration · OAuth source"
        title="Twitch Apps"
      >
        <div className={styles.pageHeadRight}>
          <a
            href="https://dev.twitch.tv/console/apps"
            target="_blank"
            rel="noreferrer"
            className={styles.btnGhost}
          >
            <LuExternalLink size={13} style={{ marginRight: 6 }} />
            Twitch Dev Console
          </a>
          <AddTwitchAppModal />
        </div>
      </PageHeader>

      {/* Filter bar */}
      {(isLoading || hasApps) && (
        <div className={styles.filterBar}>
          <div className={styles.tabs}>
            {TABS.map(({ key, label }) => (
              <button
                key={key}
                type="button"
                className={`${styles.tab} ${filter === key ? styles.tabActive : ''}`}
                onClick={() => setFilter(key)}
              >
                {label}
              </button>
            ))}
          </div>

          <div className={styles.filterRight}>
            <button type="button" className={styles.healthFilter}>
              Health · all
              <LuChevronDown size={12} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
