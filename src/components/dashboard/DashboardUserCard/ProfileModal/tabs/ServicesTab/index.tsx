'use client';

import { LuLink, LuUnlink } from 'react-icons/lu';
import { FaDiscord, FaTwitch } from 'react-icons/fa';
import useUnlinkDiscordMutation from '@/hooks/mutations/auth/useUnlinkDiscordMutation';
import useUnlinkTwitchMutation from '@/hooks/mutations/auth/useUnlinkTwitchMutation';
import useSetTwitchPersonalAuthMutation from '@/hooks/mutations/auth/useSetTwitchPersonalAuthMutation';
import Button from '@/components/ui/buttons/Button';
import styles from './styles.module.scss';
import useMeQuery from '@/hooks/queries/auth/useMeQuery';

export const DISCORD_LINK_INTENT_KEY = 'xelar_discord_link_intent';

const DISCORD_INITIATE_URL = `${process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001'}/api/auth/discord`;
const TWITCH_INITIATE_URL = `${process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001'}/api/auth/twitch`;

const ServicesTab = () => {
  const { data: meData } = useMeQuery();
  const unlinkDiscordMutation = useUnlinkDiscordMutation();
  const unlinkTwitchMutation = useUnlinkTwitchMutation();
  const setTwitchPersonalAuthMutation = useSetTwitchPersonalAuthMutation();
  const isDiscordLinked = !!meData?.discordId;
  const isTwitchLinked = !!meData?.twitchLogin;

  const handleLinkDiscord = () => {
    localStorage.setItem(DISCORD_LINK_INTENT_KEY, '1');
    const form = document.createElement('form');
    form.method = 'post';
    form.action = DISCORD_INITIATE_URL;
    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
  };

  const handleLinkTwitch = () => {
    window.location.href = TWITCH_INITIATE_URL;
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

      <div className={styles.service}>
        <div className={styles.serviceIcon}>
          <FaTwitch
            className={styles.discordLogo}
          />
        </div>
        <div className={styles.serviceMeta}>
          <span className={styles.serviceName}>Twitch</span>
          <span className={styles.serviceStatus}>
            <span
              className={styles.statusDot}
              data-linked={isTwitchLinked ? 'true' : 'false'}
            />
            {isTwitchLinked ? `Connected · ${meData!.twitchLogin}` : 'Not connected'}
          </span>
        </div>
        {isTwitchLinked ? (
          <>
            <Button
              variant="secondary"
              size="sm"
              isLoading={setTwitchPersonalAuthMutation.isPending}
              onClick={() => setTwitchPersonalAuthMutation.mutate(!meData!.allowPersonalSubscriptions)}
            >
              {meData!.allowPersonalSubscriptions ? 'Disable free subscriptions' : 'Enable free subscriptions'}
            </Button>
            <Button
              variant="danger"
              size="sm"
              leftIcon={<LuUnlink size={12} />}
              isLoading={unlinkTwitchMutation.isPending}
              onClick={() => unlinkTwitchMutation.mutate()}
            >
              Unlink
            </Button>
          </>
        ) : (
          <Button
            variant="secondary"
            size="sm"
            leftIcon={<LuLink size={12} />}
            onClick={handleLinkTwitch}
          >
            Connect
          </Button>
        )}
      </div>
    </div>
  );
};

export default ServicesTab;
