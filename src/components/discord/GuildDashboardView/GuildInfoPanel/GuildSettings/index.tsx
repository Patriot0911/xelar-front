
import useDiscordGuildInfoQuery from '@/hooks/queries/discord/useDiscordGuildInfoQuery';
import ManagerPermissionSelect from './ManagerPermissionSelect';
import { ADMINISTRATOR, hasBitFlagPermission } from '@/lib/utils';
import { IGuildSettingsProps } from './GuildSettings';
import { useMemo } from 'react';

import styles from './styles.module.scss';

const GuildSettings = ({ guildId, }: IGuildSettingsProps) => {
  const { data: guild,  isLoading: infoLoading } = useDiscordGuildInfoQuery(guildId);

  const isAdmin = useMemo<boolean>(
    () => !infoLoading && (
      !!guild?.owner
      || !!(
        guild?.permissions
        && hasBitFlagPermission(guild?.permissions, ADMINISTRATOR)
      )
    ), [guild]
  );

  return (
    <div className={styles['settings']}>
      {/* <span className={styles['settings-title']}>Settings</span> */}
      <ManagerPermissionSelect
        guildId={guildId}
        managerPermission={guild?.managerPermission}
        disabled={!isAdmin || infoLoading}
      />
    </div>
  );
}

export default GuildSettings;
