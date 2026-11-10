'use client';

import { LuShieldCheck } from 'react-icons/lu';
import useDiscordGuildInfoQuery from '@/hooks/queries/discord/useDiscordGuildInfoQuery';
import { ADMINISTRATOR, hasBitFlagPermission } from '@/lib/utils';
import ManagerPermissionSelect from './components/ManagerPermissionSelect';
import { IGuildSettingsPanelProps } from './GuildSettingsPanel';

import styles from './styles.module.scss';

/** Suspense component: render inside an `AsyncBoundary`. */
const GuildSettingsPanel = ({ guildId }: IGuildSettingsPanelProps) => {
  const { data: guild } = useDiscordGuildInfoQuery(guildId);
  const isAdmin = guild.owner || hasBitFlagPermission(guild.permissions, ADMINISTRATOR);

  return (
    <section className={styles.panel} aria-labelledby="guild-settings-access">
      <header className={styles.header}>
        <span className={styles.icon} aria-hidden><LuShieldCheck size={16} /></span>
        <div>
          <h3 id="guild-settings-access" className={styles.title}>Access</h3>
          <p className={styles.description}>
            Members with this Discord permission can add and manage notifications for this server.
            {!isAdmin && ' Only the owner or an administrator can change it.'}
          </p>
        </div>
      </header>
      <div className={styles.field}>
        <ManagerPermissionSelect
          guildId={guildId}
          managerPermission={guild.managerPermission}
          disabled={!isAdmin}
        />
      </div>
    </section>
  );
};

export default GuildSettingsPanel;
