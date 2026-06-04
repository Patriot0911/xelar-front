'use client';

import ManagerRoleSection from './ManagerRoleSection';
import GuildLogsSection from './GuildLogsSection';
import styles from './styles.module.scss';

interface IProps {
  guildId: string;
}

const GuildManagementView = ({ guildId }: IProps) => {
  return (
    <div className={styles.root}>
      <ManagerRoleSection guildId={guildId} />
      <GuildLogsSection guildId={guildId} />
    </div>
  );
};

export default GuildManagementView;
