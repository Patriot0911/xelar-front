'use client';

import { LuRefreshCw } from 'react-icons/lu';
import useStreamerDetailQuery from '@/hooks/queries/streamers/useStreamerDetailQuery';
import useStreamerNotificationLogsQuery from '@/hooks/queries/streamers/useStreamerNotificationLogsQuery';
import useUpdateStreamerMutation from '@/hooks/mutations/streamers/useUpdateStreamerMutation';
import useSyncStreamerMutation from '@/hooks/mutations/streamers/useSyncStreamerMutation';
import Button from '@/components/ui/buttons/Button';
import Switch from '@/components/ui/Switch';

import styles from './styles.module.scss';

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleString('uk-UA', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function FlagsCard({ streamerId, isInternal }: { streamerId: string; isInternal: boolean }) {
  const mutation = useUpdateStreamerMutation();

  return (
    <div className={styles.card}>
      <p className={styles.cardTitle}>Flags</p>
      <Switch
        checked={isInternal}
        onChange={(checked) => mutation.mutate({ streamerId, payload: { isInternal: checked } })}
        label="Internal streamer"
        hint="Mark this streamer as an internal/test account."
      />
    </div>
  );
}

function AccountCard({ userDisplayName, userEmail, allowPersonalSubscriptions }: {
  userDisplayName: string | null;
  userEmail: string | null;
  allowPersonalSubscriptions: boolean;
}) {
  return (
    <div className={styles.card}>
      <p className={styles.cardTitle}>Account</p>
      {userDisplayName ? (
        <div className={styles.linkedInfo}>
          <span className={styles.linkedName}>{userDisplayName}</span>
          {userEmail && <span className={styles.linkedEmail}>{userEmail}</span>}
        </div>
      ) : (
        <span className={styles.noRoles}>No linked platform account</span>
      )}
      <div className={styles.cardActions}>
        <span className={styles.twitchCell} data-enabled={String(allowPersonalSubscriptions)}>
          Personal subscriptions: {allowPersonalSubscriptions ? 'Allowed' : 'Disabled'}
        </span>
      </div>
    </div>
  );
}

function NotificationLogsCard({ streamerId }: { streamerId: string }) {
  const { data: logs, isLoading } = useStreamerNotificationLogsQuery(streamerId);

  return (
    <div className={`${styles.card} ${styles.fullWidthCard}`}>
      <p className={styles.cardTitle}>Notification Logs</p>
      {isLoading && <span className={styles.noSessions}>Loading…</span>}
      {!isLoading && !logs?.length && (
        <span className={styles.noSessions}>No logs found</span>
      )}
      {!!logs?.length && (
        <table className={styles.logsTable}>
          <thead>
            <tr>
              <th>Type</th>
              <th>Status</th>
              <th>Event</th>
              <th>Error</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.id}>
                <td><span className={styles.logTypeBadge}>{log.notificationType}</span></td>
                <td><span className={styles.logStatusBadge} data-status={log.status}>{log.status}</span></td>
                <td>{log.eventType}</td>
                <td>
                  {log.errorMessage
                    ? <span className={styles.errorText} title={log.errorMessage}>{log.errorMessage}</span>
                    : '—'
                  }
                </td>
                <td className={styles.sessionDate}>{formatDate(log.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export function StreamerDetailView({ streamerId }: { streamerId: string }) {
  const { data: streamer, isLoading } = useStreamerDetailQuery(streamerId);
  const syncMutation = useSyncStreamerMutation();

  if (isLoading || !streamer) {
    return <div style={{ padding: 24, color: 'var(--ink-3)', fontSize: 14 }}>Loading…</div>;
  }

  return (
    <div>
      <div className={styles.header}>
        {streamer.profileImageUrl ? (
          <img src={streamer.profileImageUrl} alt={streamer.displayName} className={styles.avatarImg} width={48} height={48} />
        ) : (
          <div className={styles.avatar}>{streamer.displayName.slice(0, 2)}</div>
        )}
        <div className={styles.headerInfo}>
          <h2 className={styles.headerName}>{streamer.displayName}</h2>
          <div className={styles.headerMeta}>
            <span className={styles.metaItem}>@{streamer.twitchLogin}</span>
            <span className={styles.metaItem}>Broadcaster ID: {streamer.broadcasterId}</span>
            <span className={styles.metaItem}>Added: {formatDate(streamer.createdAt)}</span>
          </div>
        </div>
        {streamer.isPartner && <span className={styles.flag} data-flag="partner">Partner</span>}
        <Button
          size="sm"
          variant="secondary"
          leftIcon={<LuRefreshCw size={12} />}
          isLoading={syncMutation.isPending}
          onClick={() => syncMutation.mutate(streamerId)}
        >
          Sync from Twitch
        </Button>
      </div>

      <div className={styles.grid}>
        <FlagsCard streamerId={streamerId} isInternal={streamer.isInternal} />
        <AccountCard
          userDisplayName={streamer.linkedUserDisplayName}
          userEmail={streamer.linkedUserEmail}
          allowPersonalSubscriptions={streamer.allowPersonalSubscriptions}
        />
        <NotificationLogsCard streamerId={streamerId} />
      </div>
    </div>
  );
}
