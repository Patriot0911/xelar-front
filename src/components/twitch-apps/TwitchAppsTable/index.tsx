'use client';

import { LuTv, LuEllipsis, LuZap, LuShield, LuLock } from 'react-icons/lu';
import { ITwitchAppShortModel, TwitchAppType, TwitchAppHealth } from '@/lib/models/twitch/twitch-app.model';
import styles from './styles.module.scss';

interface TwitchAppsTableProps {
  apps: ITwitchAppShortModel[];
  isLoading?: boolean;
}

function SkeletonRow() {
  return (
    <div className={styles.skeletonRow}>
      <div className={styles.skeletonNameCell}>
        <div className={styles.skeletonMark} />
        <div className={styles.skeletonLines}>
          <div className={styles.skeletonText} style={{ width: '55%' }} />
          <div className={styles.skeletonText} style={{ width: '40%', height: '10px' }} />
        </div>
      </div>
      <div className={styles.skeletonText} style={{ width: '75%' }} />
      <div className={styles.skeletonBadge} />
      <div className={styles.skeletonBadge} />
      <div className={styles.skeletonText} style={{ width: '40%' }} />
      <div className={styles.skeletonText} style={{ width: '60%' }} />
      <div />
    </div>
  );
}

const TYPE_ICON: Record<TwitchAppType, React.ElementType> = {
  active:   LuZap,
  internal: LuShield,
  locked:   LuLock,
};

const TYPE_LABEL: Record<TwitchAppType, string> = {
  active:   'Active',
  internal: 'Internal',
  locked:   'Locked',
};

function TypeBadge({ type }: { type?: TwitchAppType }) {
  if (!type) return <span className={styles.cellMuted}>—</span>;
  const Icon = TYPE_ICON[type];
  return (
    <span className={`${styles.typeBadge} ${styles[type]}`}>
      <Icon size={11} />
      {TYPE_LABEL[type]}
    </span>
  );
}

function HealthDot({ health }: { health?: TwitchAppHealth }) {
  if (!health) return <span className={styles.cellMuted}>—</span>;
  return (
    <span className={`${styles.healthBadge} ${styles[`health_${health}`]}`}>
      <span className={styles.healthDot} />
      {health === 'healthy' ? 'Healthy' : 'Degraded'}
    </span>
  );
}

export function TwitchAppsTable({ apps, isLoading }: TwitchAppsTableProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.thead}>
        <span>Name</span>
        <span>Client ID</span>
        <span>Type</span>
        <span>Health</span>
        <span>Load</span>
        <span>Last event</span>
        <span />
      </div>

      {isLoading ? (
        <>
          <SkeletonRow />
          <SkeletonRow />
          <SkeletonRow />
        </>
      ) : (
        apps.map((app) => (
          <div key={app.id} className={styles.trow}>
            <div className={styles.nameCell}>
              <div className={styles.nameMark}>
                <LuTv size={15} />
              </div>
              <div className={styles.nameStack}>
                <span className={styles.nameText}>{app.name}</span>
                {app.scope && (
                  <span className={styles.nameScope}>{app.scope}</span>
                )}
              </div>
            </div>

            <span className={styles.clientIdCell}>{app.clientId}</span>

            <TypeBadge type={app.type} />

            <HealthDot health={app.health} />

            <span className={styles.loadCell}>
              {app.load !== undefined ? `${app.load}%` : <span className={styles.cellMuted}>—</span>}
            </span>

            <span className={styles.dateCell}>
              {app.lastEvent
                ? app.lastEvent
                : new Date(app.createdAt).toLocaleDateString('uk-UA')}
            </span>

            <div className={styles.actions}>
              <button
                type="button"
                className={styles.menuBtn}
                aria-label="More"
              >
                <LuEllipsis size={14} />
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
