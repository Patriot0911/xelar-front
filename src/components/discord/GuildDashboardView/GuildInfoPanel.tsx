'use client';

import { useEffect, useState } from 'react';
import { LuUsers, LuCircleDot, LuBell, LuCoins } from 'react-icons/lu';
import useDiscordGuildsQuery from '@/hooks/queries/discord/useDiscordGuildsQuery';
import useDiscordGuildInfoQuery from '@/hooks/queries/discord/useDiscordGuildInfoQuery';
import useSetManagerPermissionMutation from '@/hooks/mutations/discord/useSetManagerPermissionMutation';
import { MANAGER_PERMISSION_OPTIONS } from '@/lib/constants/discord-manager-permissions';
import styles from './styles.module.scss';;
import Select from '@/components/ui/Select';
import Button from '@/components/ui/buttons/Button';

interface IGuildInfoPanelProps {
  guildId: string;
}

const GuildInfoPanel = ({ guildId }: IGuildInfoPanelProps) => {
  const { data: guilds } = useDiscordGuildsQuery();
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
        <Select
          onChange={(e) => {
            console.log('Selected permission:', e);
            setSelected(e);
          }}
          value={selected}
          label="Manager Permission"
          hideErrorMessage
          hideOptionalFlag
          hint="The permission level for the manager."
          options={MANAGER_PERMISSION_OPTIONS}
        >
          <Select.Selected>
            {(item) => <span>{item.label}</span>}
          </Select.Selected>
          <Select.Area>
            <Select.Option>
              {(item) => <span>{item.label}</span>}
            </Select.Option>
          </Select.Area>
        </Select>

        <Button
          onClick={() => mutation.mutate({ guildId, permission: selected || null })}
          disabled={isSettingsLoading || mutation.isPending}
          variant="secondary"
        >
          {mutation.isPending ? 'Saving…' : mutation.isSuccess ? 'Saved!' : 'Save'}
        </Button>
      </div>
    </div>
  );
};

export default GuildInfoPanel;
