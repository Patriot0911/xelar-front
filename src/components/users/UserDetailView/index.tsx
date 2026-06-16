'use client';

import { useEffect, useState } from 'react';
import { LuCheck, LuTrash2, LuPencil } from 'react-icons/lu';
import useUserDetailQuery from '@/hooks/queries/users/useUserDetailQuery';
import useUserSessionsQuery from '@/hooks/queries/users/useUserSessionsQuery';
import useUpdateUserStatusMutation from '@/hooks/mutations/users/useUpdateUserStatusMutation';
import useUpdateUserBalanceMutation from '@/hooks/mutations/users/useUpdateUserBalanceMutation';
import useUpdateUserRolesMutation from '@/hooks/mutations/users/useUpdateUserRolesMutation';
import useDeleteUserSessionMutation from '@/hooks/mutations/users/useDeleteUserSessionMutation';
import useRolesQuery from '@/hooks/queries/roles/useRolesQuery';
import UsersService from '@/lib/services/users.service';
import { IUserNotificationLog, IUserItem } from '@/lib/models/users/user.model';
import Button from '@/components/ui/buttons/Button';
import Modal from '@/components/ui/Modal';
import { useQuery } from '@tanstack/react-query';
import { UsersQueryKey } from '@/lib/constants/users';

import styles from './styles.module.scss';

function StatusBadge({ status }: { status: IUserItem['status'] }) {
  return (
    <span className={styles.statusBadge} data-status={status}>
      <span className={styles.dot} />
      {status === 'active' ? 'Active' : 'Blocked'}
    </span>
  );
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleString('uk-UA', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function BalanceCard({ userId, balance }: { userId: string; balance: number }) {
  const [value, setValue] = useState(String(Number(balance).toFixed(1)));
  const mutation = useUpdateUserBalanceMutation();

  useEffect(() => {
    setValue(String(Number(balance).toFixed(1)));
  }, [balance]);

  function handleSave() {
    const parsed = parseFloat(value);
    if (isNaN(parsed) || parsed < 0 || parsed > 999.9) return;
    mutation.mutate({ userId, payload: { balance: parsed } });
  }

  return (
    <div className={styles.card}>
      <p className={styles.cardTitle}>Balance</p>
      <p className={styles.balanceValue}>{Number(balance).toFixed(1)}</p>
      <div className={styles.balanceForm}>
        <input
          className={styles.balanceInput}
          type="number"
          min={0}
          max={999.9}
          step={0.1}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Button
          size="sm"
          onClick={handleSave}
          isLoading={mutation.isPending}
          disabled={value === String(Number(balance).toFixed(1))}
        >
          Save
        </Button>
      </div>
    </div>
  );
}

function RolesCard({ userId, currentRoles }: { userId: string; currentRoles: string[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const { data: rolesData } = useRolesQuery();
  const mutation = useUpdateUserRolesMutation();

  function openModal() {
    const currentIds = (rolesData?.items ?? [])
      .filter((r) => currentRoles.includes(r.name))
      .map((r) => r.id);
    setSelected(currentIds);
    setIsOpen(true);
  }

  function toggleRole(id: string) {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  }

  function handleSave() {
    mutation.mutate(
      { userId, payload: { roleIds: selected } },
      { onSuccess: () => setIsOpen(false) }
    );
  }

  return (
    <>
      <div className={styles.card}>
        <p className={styles.cardTitle}>Roles</p>
        <div className={styles.rolesList}>
          {currentRoles.length
            ? currentRoles.map((r) => <span key={r} className={styles.roleBadge}>{r}</span>)
            : <span className={styles.noRoles}>No roles assigned</span>
          }
        </div>
        <div className={styles.cardActions}>
          <Button size="sm" variant="secondary" leftIcon={<LuPencil size={12} />} onClick={openModal}>
            Edit Roles
          </Button>
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} isLoading={mutation.isPending}>
        <Modal.ModalHeader
          category="Users · Roles"
          title="Edit User Roles"
          description="Select roles to assign to this user."
        />
        <Modal.ModalBody>
          <div className={styles.rolesModalGrid}>
            {(rolesData?.items ?? []).map((role) => {
              const checked = selected.includes(role.id);
              return (
                <button
                  key={role.id}
                  type="button"
                  className={styles.roleToggle}
                  data-checked={String(checked)}
                  onClick={() => toggleRole(role.id)}
                >
                  <span className={styles.roleToggleCheck}>
                    {checked && <LuCheck size={9} />}
                  </span>
                  {role.name}
                </button>
              );
            })}
          </div>
        </Modal.ModalBody>
        <Modal.ModalFooter>
          <Button variant="secondary" onClick={() => setIsOpen(false)}>Cancel</Button>
          <Button onClick={handleSave} isLoading={mutation.isPending}>Save Changes</Button>
        </Modal.ModalFooter>
      </Modal>
    </>
  );
}

function SessionsCard({ userId }: { userId: string }) {
  const { data: sessions, isLoading } = useUserSessionsQuery(userId);
  const deleteMutation = useDeleteUserSessionMutation();

  return (
    <div className={styles.card}>
      <p className={styles.cardTitle}>Active Sessions</p>
      {isLoading && <span className={styles.noSessions}>Loading…</span>}
      {!isLoading && !sessions?.length && (
        <span className={styles.noSessions}>No active sessions</span>
      )}
      <div className={styles.sessionsList}>
        {sessions?.map((session) => (
          <div key={session.id} className={styles.sessionItem}>
            <div className={styles.sessionInfo}>
              <span className={styles.sessionDate}>Created: {formatDate(session.createdAt)}</span>
              <span className={styles.sessionExpiry}>Expires: {formatDate(session.expiresAt)}</span>
            </div>
            <Button
              size="sm"
              variant="secondary"
              leftIcon={<LuTrash2 size={12} />}
              isLoading={deleteMutation.isPending}
              onClick={() => deleteMutation.mutate({ userId, sessionId: session.id })}
            >
              Revoke
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

function NotificationLogsCard({ userId }: { userId: string }) {
  const { data: logs, isLoading } = useQuery<IUserNotificationLog[]>({
    queryKey: [UsersQueryKey.Detail, userId, 'logs'],
    queryFn: () => UsersService.getUserNotificationLogs(userId),
  });

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
              <th>Streamer</th>
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
                <td>{log.streamerLogin}</td>
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

export function UserDetailView({ userId }: { userId: string }) {
  const { data: user, isLoading } = useUserDetailQuery(userId);
  const statusMutation = useUpdateUserStatusMutation();

  if (isLoading || !user) {
    return <div style={{ padding: 24, color: 'var(--ink-3)', fontSize: 14 }}>Loading…</div>;
  }

  function toggleStatus() {
    if (!user) return;
    statusMutation.mutate({
      userId,
      payload: { status: user.status === 'active' ? 'blocked' : 'active' },
    });
  }

  return (
    <div>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.avatar}>{user.displayName.slice(0, 2)}</div>
        <div className={styles.headerInfo}>
          <h2 className={styles.headerName}>{user.displayName}</h2>
          <div className={styles.headerMeta}>
            {user.email && <span className={styles.metaItem}>{user.email}</span>}
            {user.discordId && <span className={styles.metaItem}>Discord: {user.discordId}</span>}
            {user.twitchLogin && <span className={styles.metaItem}>Twitch: {user.twitchLogin}</span>}
            <span className={styles.metaItem}>Joined: {formatDate(user.createdAt)}</span>
          </div>
        </div>
        <StatusBadge status={user.status} />
        <Button
          size="sm"
          variant="secondary"
          isLoading={statusMutation.isPending}
          onClick={toggleStatus}
        >
          {user.status === 'active' ? 'Block' : 'Unblock'}
        </Button>
      </div>

      {/* Grid */}
      <div className={styles.grid}>
        <BalanceCard userId={userId} balance={user.balance} />
        <RolesCard userId={userId} currentRoles={user.roles} />
        <SessionsCard userId={userId} />
        <NotificationLogsCard userId={userId} />
      </div>
    </div>
  );
}
