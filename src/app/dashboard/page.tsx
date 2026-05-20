'use client';

import { LuZap, LuArrowRight } from 'react-icons/lu';
import { Button } from '@/components/ui/button';
import { StatCard } from '@/components/ui/stat-card';
import { EmptyState } from '@/components/ui/empty-state';
import { PageHeader } from '@/components/ui/PageHeader';
import styles from './page.module.scss';

const STATS = [
  { label: 'Active bridges', value: '0', sub: 'No bridges yet' },
  { label: 'Events sent', value: '0', sub: 'All time' },
  { label: 'Channels wired', value: '0', sub: 'Discord channels' },
  { label: 'Uptime', value: '—', sub: 'No active bridges' },
];

export default function DashboardPage() {
  return (
    <>
      <PageHeader eyebrow="Dashboard" title="Overview" />

      <div className={styles.statsGrid}>
        {STATS.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      <EmptyState
        icon={<LuZap size={24} />}
        title="No bridges yet"
        description="Connect a Twitch channel and a Discord server to start routing stream events automatically."
        action={
          <Button size="sm">
            Create your first bridge
            <LuArrowRight size={14} />
          </Button>
        }
      />
    </>
  );
}
