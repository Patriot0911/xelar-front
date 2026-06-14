'use client';

import { useEffect, useState } from 'react';
import useDiscordGuildInfoQuery from '@/hooks/queries/discord/useDiscordGuildInfoQuery';
import useSetManagerPermissionMutation from '@/hooks/mutations/discord/useSetManagerPermissionMutation';
import { MANAGER_PERMISSION_OPTIONS } from '@/lib/constants/discord-manager-permissions';
import styles from './styles.module.scss';

interface IProps {
  guildId: string;
}

const ManagerPermissionSection = ({ guildId }: IProps) => {
  const { data: info, isLoading: infoLoading } = useDiscordGuildInfoQuery(guildId);
  const mutation = useSetManagerPermissionMutation();

  const [selected, setSelected] = useState<string>('');

  useEffect(() => {
    if (info !== undefined) {
      setSelected(info.managerPermission ?? '');
    }
  }, [info]);

  useEffect(() => {
    if (mutation.isSuccess) {
      const t = setTimeout(() => mutation.reset(), 2500);
      return () => clearTimeout(t);
    }
  }, [mutation.isSuccess]);

  const isLoading = infoLoading;
  const isPending = mutation.isPending;

  const handleSave = () => {
    mutation.mutate({ guildId, permission: selected || null });
  };

  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Access Control</h2>
        <p className={styles.sectionSub}>
          By default only Discord server Administrators can manage notifications for this server.
          You can optionally grant access to members with a specific permission.
        </p>
      </div>

      <div className={styles.card}>
        <div className={styles.roleRow}>
          <div className={styles.selectWrapper}>
            <span className={styles.label}>Manager Permission</span>
            <select
              className={styles.select}
              value={selected}
              onChange={(e) => setSelected(e.target.value)}
              disabled={isLoading || isPending}
            >
              <option value="">No permission — Admins only</option>
              {MANAGER_PERMISSION_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <button
            className={`${styles.saveBtn} ${mutation.isSuccess ? styles.saved : ''}`}
            onClick={handleSave}
            disabled={isLoading || isPending}
          >
            {isPending ? 'Saving…' : mutation.isSuccess ? 'Saved!' : 'Save'}
          </button>
        </div>

        {mutation.isError && (
          <p className={styles.error}>Failed to save. Check your permissions.</p>
        )}

        <p className={styles.hint}>
          Members with this permission will be able to add and manage notifications for this server.
        </p>
      </div>
    </section>
  );
};

export default ManagerPermissionSection;
