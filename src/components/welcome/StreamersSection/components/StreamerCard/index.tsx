import { LuBadgeCheck, LuFlame } from 'react-icons/lu';
import { formatCompactNumber, getInitials } from '@/lib/utils';
import { IStreamerCardProps } from './StreamerCard';

import styles from './styles.module.scss';

const StreamerCard = ({ streamer, activityWindowDays, isClone = false }: IStreamerCardProps) => {
  const { twitchLogin, displayName, profileImageUrl, isPartner, isTopActive, rank, notificationsDelivered, communitiesReached } = streamer;

  return (
    <a
      href={`https://www.twitch.tv/${encodeURIComponent(twitchLogin)}`}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.card}
      data-top={isTopActive}
      tabIndex={isClone ? -1 : undefined}
      aria-label={`${displayName} on Twitch`}
    >
      <span className={styles.rank} aria-hidden="true">#{rank}</span>

      <div className={styles.head}>
        <span className={styles.avatar}>
          {profileImageUrl
            ? <img src={profileImageUrl} alt="" width={48} height={48} loading="lazy" decoding="async" />
            : <span className={styles.initials}>{getInitials(displayName)}</span>}
        </span>

        <div className={styles.identity}>
          <span className={styles.name}>
            <span className={styles.nameText}>{displayName}</span>
            {isPartner && <LuBadgeCheck className={styles.partner} size={15} aria-label="Twitch Partner" />}
          </span>
          <span className={styles.login}>@{twitchLogin}</span>
        </div>
      </div>

      {isTopActive && (
        <span className={styles.topBadge}>
          <LuFlame size={12} aria-hidden="true" />
          Top active
        </span>
      )}

      <dl className={styles.stats}>
        <div>
          <dt>Alerts · {activityWindowDays}d</dt>
          <dd>{formatCompactNumber(notificationsDelivered)}</dd>
        </div>
        <div>
          <dt>Servers</dt>
          <dd>{formatCompactNumber(communitiesReached)}</dd>
        </div>
      </dl>
    </a>
  );
}

export default StreamerCard;
