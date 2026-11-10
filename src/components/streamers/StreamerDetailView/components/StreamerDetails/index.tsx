'use client';

import Link from 'next/link';
import useUpdateStreamerMutation from '@/hooks/mutations/streamers/useUpdateStreamerMutation';
import InfoItem from '@/components/ui/InfoItem';
import Switch from '@/components/ui/Switch';
import { formatDateTime } from '@/lib/utils';
import { IStreamerDetailsProps } from './StreamerDetails';

import styles from './styles.module.scss';

const StreamerDetails = ({ streamer }: IStreamerDetailsProps) => {
  const updateMutation = useUpdateStreamerMutation();

  return (
    <div className={styles.details}>
      <section className={styles.group} aria-labelledby="streamer-details-twitch">
        <h3 id="streamer-details-twitch" className={styles.title}>Twitch</h3>
        <dl className={styles.grid}>
          <InfoItem label="Login" mono>@{streamer.twitchLogin}</InfoItem>
          <InfoItem label="Broadcaster ID" mono>{streamer.broadcasterId}</InfoItem>
          <InfoItem label="Partner">
            <span className={styles.flag} data-enabled={String(streamer.isPartner)}>
              {streamer.isPartner ? 'Yes' : 'No'}
            </span>
          </InfoItem>
          <InfoItem label="Added" mono>{formatDateTime(streamer.createdAt)}</InfoItem>
        </dl>
      </section>

      <section className={styles.group} aria-labelledby="streamer-details-flags">
        <h3 id="streamer-details-flags" className={styles.title}>Flags</h3>
        <Switch
          checked={streamer.isInternal}
          disabled={updateMutation.isPending}
          onChange={(checked) => updateMutation.mutate({ streamerId: streamer.id, payload: { isInternal: checked } })}
          label="Internal streamer"
          hint="Internal / test account"
        />
      </section>

      <section className={`${styles.group} ${styles.wide}`} aria-labelledby="streamer-details-account">
        <h3 id="streamer-details-account" className={styles.title}>Linked account</h3>
        <dl className={styles.grid}>
          <InfoItem label="User">
            {streamer.linkedUserId && (
              <Link href={`/dashboard/users/${streamer.linkedUserId}`} className={styles.userLink}>
                {streamer.linkedUserDisplayName ?? streamer.linkedUserId}
              </Link>
            )}
          </InfoItem>
          <InfoItem label="Email" mono>{streamer.linkedUserEmail}</InfoItem>
          <InfoItem label="Personal subscriptions">
            <span className={styles.flag} data-enabled={String(streamer.allowPersonalSubscriptions)}>
              {streamer.allowPersonalSubscriptions ? 'Allowed' : 'Disabled'}
            </span>
          </InfoItem>
        </dl>
      </section>
    </div>
  );
};

export default StreamerDetails;
