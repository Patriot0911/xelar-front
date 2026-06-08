'use client';

import { useEffect, useState } from 'react';
import { LuUsers, LuCircleDot, LuBell, LuCoins } from 'react-icons/lu';
import useDiscordGuildsQuery from '@/hooks/queries/discord/useDiscordGuildsQuery';
import useDiscordGuildInfoQuery from '@/hooks/queries/discord/useDiscordGuildInfoQuery';
import useSetManagerPermissionMutation from '@/hooks/mutations/discord/useSetManagerPermissionMutation';
import { MANAGER_PERMISSION_OPTIONS } from '@/lib/constants/discord-manager-permissions';
import styles from './styles.module.scss';

interface IGuildInfoPanelProps {
  guildId: string;
}

const GuildInfoPanel = ({ guildId }: IGuildInfoPanelProps) => {
  const { data: guilds }                        = useDiscordGuildsQuery();
  const { data: info,  isLoading: infoLoading } = useDiscordGuildInfoQuery(guildId);
  const mutation = useSetManagerPermissionMutation();

  const [selected, setSelected] = useState('');

  useEffect(() => {
    if (info !== undefined) setSelected(info.managerPermission ?? '');
  }, [info]);

  useEffect(() => {
    if (mutation.isSuccess) {
      const t = setTimeout(() => mutation.reset(), 2500);
      return () => clearTimeout(t);
    }
  }, [mutation.isSuccess]);

  const guild = guilds?.find(g => g.id === guildId);

  const iconUrl = guild?.icon
    ? `https://cdn.discordapp.com/icons/${guildId}/${guild.icon}${guild.icon.startsWith('a_') ? '.gif' : '.png'}?size=128`
    : null;

  const isSettingsLoading = infoLoading;

  return (
    <div className={styles.infoCard}>
      {/* Guild identity */}
      <div className={styles.identity}>
        {iconUrl ? (
          <img src={iconUrl} alt={guild?.name ?? ''} className={styles.guildIcon} />
        ) : (
          <div className={styles.guildIconFallback}>
            {guild?.name?.[0]?.toUpperCase() ?? '?'}
          </div>
        )}
        <h2 className={styles.guildName}>{guild?.name ?? '—'}</h2>
      </div>

      {/* Stats */}
      <div className={styles.stats}>
        <div className={styles.stat}>
          <LuUsers size={12} className={styles.statIcon} />
          <span className={styles.statLabel}>Members</span>
          <span className={styles.statValue}>{guild?.memberCount ?? '—'}</span>
        </div>
        <div className={styles.stat}>
          <LuCircleDot size={12} className={styles.statIcon} />
          <span className={styles.statLabel}>Online</span>
          <span className={styles.statValue}>{guild?.presenceCount ?? '—'}</span>
        </div>
        <div className={styles.stat}>
          <LuBell size={12} className={styles.statIcon} />
          <span className={styles.statLabel}>Notifications</span>
          <span className={styles.statValue}>{guild?.notificationCount ?? '—'}</span>
        </div>
        <div className={styles.stat}>
          <LuCoins size={12} className={styles.statIcon} />
          <span className={styles.statLabel}>Balance</span>
          <span className={styles.statValue}>{guild?.balance ?? '—'}</span>
        </div>
      </div>

      <div className={styles.separator} />

      {/* Settings */}
      <div className={styles.settings}>
        <h3 className={styles.settingsTitle}>Settings</h3>

        <div className={styles.field}>
          <label className={styles.fieldLabel}>Manager Permission</label>
          <select
            className={styles.fieldSelect}
            value={selected}
            onChange={e => setSelected(e.target.value)}
            disabled={isSettingsLoading || mutation.isPending}
          >
            <option value="">No permission — Admins only</option>
            {MANAGER_PERMISSION_OPTIONS.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>

        {mutation.isError && (
          <p className={styles.fieldError}>Failed to save. Check permissions.</p>
        )}

        <button
          className={`${styles.saveBtn} ${mutation.isSuccess ? styles.saveBtnSaved : ''}`}
          onClick={() => mutation.mutate({ guildId, permission: selected || null })}
          disabled={isSettingsLoading || mutation.isPending}
        >
          {mutation.isPending ? 'Saving…' : mutation.isSuccess ? 'Saved!' : 'Save'}
        </button>
      </div>
    </div>
  );
};

export default GuildInfoPanel;
