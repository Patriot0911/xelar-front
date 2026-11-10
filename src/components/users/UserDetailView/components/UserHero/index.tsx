'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { LuAtSign, LuBan, LuCircleCheck, LuCopy } from 'react-icons/lu';
import { SiDiscord, SiTwitch } from 'react-icons/si';
import useUpdateUserStatusMutation from '@/hooks/mutations/users/useUpdateUserStatusMutation';
import HeroBanner from '@/components/ui/HeroBanner';
import ActionsMenu from '@/components/ui/ActionsMenu';
import { IActionsMenuItem } from '@/components/ui/ActionsMenu/ActionsMenu';
import ConfirmModal from '@/components/common/ConfirmModal';
import UserStatusBadge from '@/components/users/UserStatusBadge';
import { getInitials } from '@/lib/utils';
import { IUserHeroProps } from './UserHero';

import styles from './styles.module.scss';

const UserHero = ({ user }: IUserHeroProps) => {
  const [isBlockConfirmOpen, setIsBlockConfirmOpen] = useState(false);
  const statusMutation = useUpdateUserStatusMutation();
  const isActive = user.status === 'active';

  const setStatus = (status: typeof user.status) => {
    statusMutation.mutate(
      { userId: user.id, payload: { status } },
      { onSuccess: () => setIsBlockConfirmOpen(false) },
    );
  };

  const copy = async (value: string, what: string) => {
    try {
      await navigator.clipboard.writeText(value);
      toast.success(`${what} copied`);
    } catch {
      toast.error('Couldn’t copy to the clipboard');
    }
  };

  // Copy items appear only for the identifiers the account actually has.
  const copyActions: IActionsMenuItem[] = [
    { key: 'copy-id', label: 'Copy user ID', icon: LuCopy, onSelect: () => copy(user.id, 'User ID') },
    ...(user.discordId ? [{
      key: 'copy-discord-id',
      label: 'Copy Discord ID',
      icon: SiDiscord,
      onSelect: () => copy(user.discordId!, 'Discord ID'),
    }] : []),
    ...(user.twitchLogin ? [{
      key: 'copy-twitch-login',
      label: 'Copy Twitch login',
      icon: SiTwitch,
      onSelect: () => copy(user.twitchLogin!, 'Twitch login'),
    }] : []),
    ...(user.email ? [{
      key: 'copy-email',
      label: 'Copy email',
      icon: LuAtSign,
      onSelect: () => copy(user.email!, 'Email'),
    }] : []),
  ];

  const actions: IActionsMenuItem[] = [
    ...copyActions,
    isActive
      ? {
        key: 'block',
        label: 'Block user',
        description: 'Signs the user out and stops their notifications',
        icon: LuBan,
        variant: 'danger',
        disabled: statusMutation.isPending,
        // Blocking is disruptive, so it asks first; unblocking applies right away.
        onSelect: () => setIsBlockConfirmOpen(true),
      }
      : {
        key: 'unblock',
        label: 'Unblock user',
        icon: LuCircleCheck,
        disabled: statusMutation.isPending,
        onSelect: () => setStatus('active'),
      },
  ];

  return (
    <section className={styles.hero} aria-labelledby="user-hero-title">
      <HeroBanner seed={user.id} className={styles.banner} fadeInto="var(--panel)">
        <ActionsMenu items={actions} label="User actions" className={styles.actions} />
      </HeroBanner>

      <div className={styles.identity}>
        <div className={styles.avatarRing} data-status={user.status}>
          <div className={styles.avatar} aria-hidden>{getInitials(user.displayName)}</div>
        </div>
        <div className={styles.identityText}>
          <div className={styles.nameRow}>
            <h2 id="user-hero-title" className={styles.name}>{user.displayName}</h2>
            <UserStatusBadge status={user.status} />
          </div>
          <span className={styles.userId} title={user.id}>{user.id}</span>
        </div>
      </div>

      <ConfirmModal
        title={`Block ${user.displayName}?`}
        description="The user will be signed out and their notifications will stop until you unblock them."
        isOpen={isBlockConfirmOpen}
        isLoading={statusMutation.isPending}
        onConfirm={() => setStatus('blocked')}
        onCancel={() => setIsBlockConfirmOpen(false)}
        onClose={() => setIsBlockConfirmOpen(false)}
      />
    </section>
  );
};

export default UserHero;
