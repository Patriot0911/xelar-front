import { IStreamerCellProps } from './StreamerCell';

import styles from './styles.module.scss';

const StreamerCell = ({ streamer }: IStreamerCellProps) => {
  if (!streamer) return <span>—</span>;

  return (
    <div className={styles.streamer}>
      {streamer.profileImageUrl ? (
        <img
          src={streamer.profileImageUrl}
          alt={streamer.displayName}
          className={styles.avatar}
          width={24}
          height={24}
        />
      ) : (
        <div className={styles.avatarFallback} aria-hidden>
          {streamer.displayName[0].toUpperCase()}
        </div>
      )}
      <span className={styles.name}>{streamer.displayName}</span>
    </div>
  );
};

export default StreamerCell;
