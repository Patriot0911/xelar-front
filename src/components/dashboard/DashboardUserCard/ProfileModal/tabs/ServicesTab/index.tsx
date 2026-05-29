'use client';

import { LuLink, LuUnlink } from 'react-icons/lu';
import { FaDiscord } from 'react-icons/fa';
import useUnlinkDiscordMutation from '@/hooks/mutations/auth/useUnlinkDiscordMutation';
import Button from '@/components/ui/buttons/Button';
import styles from './styles.module.scss';
import useMeQuery from '@/hooks/queries/auth/useMeQuery';

export const DISCORD_LINK_INTENT_KEY = 'xelar_discord_link_intent';

const DISCORD_INITIATE_URL = `${process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001'}/api/auth/discord`;

const ServicesTab = () => {
  const { data: meData } = useMeQuery();
  const unlinkDiscordMutation = useUnlinkDiscordMutation();
  const isDiscordLinked = !!meData?.discordId;

  const handleLinkDiscord = () => {
    localStorage.setItem(DISCORD_LINK_INTENT_KEY, '1');
    const form = document.createElement('form');
    form.method = 'post';
    form.action = DISCORD_INITIATE_URL;
    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
  };

  return (
    <div className={styles.list}>
      <div className={styles.service}>
        <div className={styles.serviceIcon}>
          <FaDiscord
            className={styles.discordLogo}
          />
        </div>
        <div className={styles.serviceMeta}>
          <span className={styles.serviceName}>Discord</span>
          <span className={styles.serviceStatus}>
            <span
              className={styles.statusDot}
              data-linked={isDiscordLinked ? 'true' : 'false'}
            />
            {isDiscordLinked ? `Connected · ${meData!.discordId}` : 'Not connected'}
          </span>
        </div>
        {isDiscordLinked ? (
          <Button
            variant="danger"
            size="sm"
            leftIcon={<LuUnlink size={12} />}
            isLoading={unlinkDiscordMutation.isPending}
            onClick={() => unlinkDiscordMutation.mutate()}
          >
            Unlink
          </Button>
        ) : (
          <Button
            variant="secondary"
            size="sm"
            leftIcon={<LuLink size={12} />}
            onClick={handleLinkDiscord}
          >
            Connect
          </Button>
        )}
      </div>
    </div>
  );
};

export default ServicesTab;
