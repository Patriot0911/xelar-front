import { LuBadgeCheck, LuBell, LuFlame, LuServer } from 'react-icons/lu';
import { formatCompactNumber, getInitials } from '@/lib/utils';
import { IStreamerCardProps } from './StreamerCard';

import styles from './styles.module.scss';

/** Compact translucent tile in the style of `DiscordGuildCard`: logo, name, one meta row. */
const StreamerCard = ({ streamer, activityWindowDays, isClone = false }: IStreamerCardProps) => {
  const { twitchLogin, displayName, profileImageUrl, isPartner, isTopActive, notificationsDelivered, communitiesReached } = streamer;

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
      <span className={styles.avatar}>
        {profileImageUrl
          ? <img src={profileImageUrl} alt="" width={44} height={44} loading="lazy" decoding="async" />
          : <span className={styles.initials}>{getInitials(displayName)}</span>}
      </span>

      <span className={styles.info}>
        <span className={styles.name}>
          <span className={styles.nameText}>{displayName}</span>
          {isPartner && <LuBadgeCheck className={styles.partner} size={14} aria-label="Twitch Partner" />}
        </span>

        <span className={styles.meta}>
          {isTopActive && (
            <span className={styles.top}>
              <LuFlame size={11} aria-hidden="true" />
              Top
            </span>
          )}
          <span className={styles.metaItem} title={`Alerts delivered in the last ${activityWindowDays} days`}>
            <LuBell size={11} aria-hidden="true" />
            {formatCompactNumber(notificationsDelivered)}
          </span>
          <span className={styles.metaItem} title="Discord servers reached">
            <LuServer size={11} aria-hidden="true" />
            {formatCompactNumber(communitiesReached)}
          </span>
        </span>
      </span>
    </a>
  );
}

export default StreamerCard;
