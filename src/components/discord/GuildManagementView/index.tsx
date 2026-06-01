import { LuConstruction } from 'react-icons/lu';
import styles from './styles.module.scss';

const GuildManagementView = () => {
  return (
    <div className={styles.root}>
      <div className={styles.icon}>
        <LuConstruction size={32} />
      </div>
      <h3 className={styles.title}>Guild Management</h3>
      <p className={styles.sub}>
        Configure server settings, manage bot permissions, and control member roles directly from here. This feature is coming soon.
      </p>
      <div className={styles.chips}>
        <span className={styles.chip}>Bot Permissions</span>
        <span className={styles.chip}>Member Roles</span>
        <span className={styles.chip}>Server Settings</span>
        <span className={styles.chip}>Audit Log</span>
      </div>
    </div>
  );
};

export default GuildManagementView;
