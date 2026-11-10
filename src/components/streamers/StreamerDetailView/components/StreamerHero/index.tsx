'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { LuCopy, LuExternalLink, LuRefreshCw, LuUser } from 'react-icons/lu';
import { SiTwitch } from 'react-icons/si';
import useSyncStreamerMutation from '@/hooks/mutations/streamers/useSyncStreamerMutation';
import HeroBanner from '@/components/ui/HeroBanner';
import ActionsMenu from '@/components/ui/ActionsMenu';
import { IActionsMenuItem } from '@/components/ui/ActionsMenu/ActionsMenu';
import { getInitials } from '@/lib/utils';
import { IStreamerHeroProps } from './StreamerHero';

import styles from './styles.module.scss';

const StreamerHero = ({ streamer }: IStreamerHeroProps) => {
  const router = useRouter();
  const syncMutation = useSyncStreamerMutation();
  const [hasAvatarError, setHasAvatarError] = useState(false);
  const showAvatar = Boolean(streamer.profileImageUrl) && !hasAvatarError;

  const copy = async (value: string, what: string) => {
    try {
      await navigator.clipboard.writeText(value);
      toast.success(`${what} copied`);
    } catch {
      toast.error('Couldn’t copy to the clipboard');
    }
  };

  const actions: IActionsMenuItem[] = [
    {
      key: 'sync',
      label: syncMutation.isPending ? 'Syncing…' : 'Sync from Twitch',
      description: 'Refresh name, avatar and partner status',
      icon: LuRefreshCw,
      disabled: syncMutation.isPending,
      onSelect: () => syncMutation.mutate(streamer.id),
    },
    {
      key: 'open-twitch',
      label: 'Open on Twitch',
      icon: SiTwitch,
      onSelect: () => window.open(`https://www.twitch.tv/${streamer.twitchLogin}`, '_blank', 'noopener,noreferrer'),
    },
    ...(streamer.linkedUserId ? [{
      key: 'open-user',
      label: 'Open linked user',
      icon: LuUser,
      onSelect: () => router.push(`/dashboard/users/${streamer.linkedUserId}`),
    }] : []),
    { key: 'copy-login', label: 'Copy Twitch login', icon: LuCopy, onSelect: () => copy(streamer.twitchLogin, 'Twitch login') },
    { key: 'copy-broadcaster-id', label: 'Copy broadcaster ID', icon: LuCopy, onSelect: () => copy(streamer.broadcasterId, 'Broadcaster ID') },
    { key: 'copy-id', label: 'Copy streamer ID', icon: LuCopy, onSelect: () => copy(streamer.id, 'Streamer ID') },
  ];

  return (
    <section className={styles.hero} aria-labelledby="streamer-hero-title">
      <HeroBanner seed={streamer.id} className={styles.banner} fadeInto="var(--panel)">
        <ActionsMenu items={actions} label="Streamer actions" className={styles.actions} />
      </HeroBanner>

      <div className={styles.identity}>
        <div className={styles.avatarRing}>
          <div className={styles.avatar}>
            {showAvatar
              ? <img src={streamer.profileImageUrl!} alt="" width={88} height={88} onError={() => setHasAvatarError(true)} />
              : <span aria-hidden>{getInitials(streamer.displayName)}</span>}
          </div>
        </div>
        <div className={styles.identityText}>
          <div className={styles.nameRow}>
            <h2 id="streamer-hero-title" className={styles.name}>{streamer.displayName}</h2>
            {streamer.isPartner && <span className={styles.badge} data-flag="partner">Partner</span>}
            {streamer.isInternal && <span className={styles.badge} data-flag="internal">Internal</span>}
          </div>
          <a
            href={`https://www.twitch.tv/${streamer.twitchLogin}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.login}
          >
            @{streamer.twitchLogin}
            <LuExternalLink size={11} aria-hidden />
          </a>
        </div>
      </div>
    </section>
  );
};

export default StreamerHero;
