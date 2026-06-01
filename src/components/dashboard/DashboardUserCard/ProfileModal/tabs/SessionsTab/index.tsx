'use client';

import { LuClock, LuTrash2 } from 'react-icons/lu';
import useSessionsQuery from '@/hooks/queries/auth/useSessionsQuery';
import useRevokeSessionMutation from '@/hooks/mutations/auth/useRevokeSessionMutation';
import Button from '@/components/ui/buttons/Button';
import styles from './styles.module.scss';

const formatDate = (dateStr: string) =>
  new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(dateStr));

const SessionsTab = () => {
  const { data: sessions, isLoading } = useSessionsQuery();
  const revokeSessionMutation = useRevokeSessionMutation();

  if (isLoading) {
    return <div className={styles.empty}>Loading sessions…</div>;
  }

  if (!sessions?.length) {
    return <div className={styles.empty}>No active sessions found.</div>;
  }

  return (
    <div className={styles.list}>
      {sessions.map((session) => (
        <div key={session.id} className={styles.session}>
          <LuClock size={14} className={styles.sessionIcon} />
          <div className={styles.sessionMeta}>
            <span className={styles.sessionId}>{session.id.slice(0, 8)}…</span>
            <div className={styles.sessionDates}>
              <span>Created {formatDate(session.createdAt)}</span>
              <span>Expires {formatDate(session.expiresAt)}</span>
            </div>
          </div>
          <Button
            variant="danger"
            size="sm"
            leftIcon={<LuTrash2 size={12} />}
            isLoading={revokeSessionMutation.isPending && revokeSessionMutation.variables === session.id}
            disabled={revokeSessionMutation.isPending}
            onClick={() => revokeSessionMutation.mutate(session.id)}
          >
            Revoke
          </Button>
        </div>
      ))}
    </div>
  );
};

export default SessionsTab;
