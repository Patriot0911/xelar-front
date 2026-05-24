import styles from './styles.module.scss';

const WorkspaceCard = () => {
  return (
    <div className={styles['workspace-card']}>
      <div className={styles['space-mark']}>X</div>
      <div className={styles.serverMeta}>
        <span className={styles.serverEyebrow}>
          <span className={styles.serverLive} />
          active workspace
        </span>
        <span className={styles.serverName}>Xelar</span>
      </div>
      {/* <button className={styles.serverChev} type="button" aria-label="Switch workspace">
        <LuChevronsUpDown size={12} />
      </button> */}
    </div>
  );
}

export default WorkspaceCard;
