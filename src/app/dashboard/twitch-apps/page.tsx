'use client';

import { useState } from 'react';
import { LuTv, LuChevronDown, LuExternalLink } from 'react-icons/lu';
import { EmptyState } from '@/components/ui/empty-state';
import { StatCard } from '@/components/ui/stat-card';
import { TwitchAppsTable } from '@/components/twitch-apps/TwitchAppsTable';
import { AddTwitchAppModal } from '@/components/twitch-apps/AddTwitchAppModal';
import useTwitchAppsQuery from '@/hooks/queries/twitch/useTwitchAppsQuery';
import { TwitchAppType } from '@/lib/models/twitch/twitch-app.model';
import styles from './page.module.scss';

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
  const filteredApps = filter === 'all'
    ? apps
    : apps.filter((a) => a.type === filter);
  const hasApps = !isLoading && apps.length > 0;

  return (
    <>
      {/* Page header */}
      <div className={styles.pageHead}>
        <div className={styles.pageHeadLeft}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowDot} />
            Integration · OAuth source
          </div>
          <div className={styles.headMeta}>
            <h1 className={styles.headTitle}>Twitch Apps</h1>
            <span className={styles.badge}>registered</span>
          </div>
        </div>

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
      </div>

      {/* Stats */}
      <div className={styles.stats}>
        <StatCard
          label="Active apps"
          value={isLoading ? '—' : apps.length}
          sub="/ 5 plan limit"
        />
        <StatCard
          label="Events · 24h"
          value="—"
          sub="no data yet"
        />
        <StatCard
          label="Channels routed"
          value="—"
          sub="→ Discord · TG"
        />
        <StatCard
          label="Webhook health"
          value="—"
          sub="last 7d"
        />
      </div>

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

      {/* Content */}
      {isLoading || hasApps ? (
        <TwitchAppsTable apps={filteredApps} isLoading={isLoading} />
      ) : (
        <EmptyState
          icon={<LuTv size={24} />}
          title="No Twitch apps yet"
          description="Register a Twitch application to start routing stream events through Xelar. Takes about 90 seconds."
          action={<AddTwitchAppModal />}
        />
      )}
    </>
  );
}
