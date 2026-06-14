'use client';

import ManagerPermissionSection from './ManagerPermissionSection';
import GuildLogsSection from './GuildLogsSection';
import styles from './styles.module.scss';

interface IProps {
  guildId: string;
}

const GuildManagementView = ({ guildId }: IProps) => {
  return (
    <div className={styles.root}>
      <ManagerPermissionSection guildId={guildId} />
      <GuildLogsSection guildId={guildId} />
    </div>
  );
};

export default GuildManagementView;
