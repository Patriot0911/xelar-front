'use client';

import useDiscordGuildsQuery from '@/hooks/queries/discord/useDiscordGuildsQuery';
import { isDiscordAuthError } from '@/lib/models/discord';
import DiscordGuildCard from '../DiscordGuildCard';
import DiscordReconnectBlocker from '../DiscordReconnectBlocker';
import Loading from '@/components/ui/Loading';
import styles from './styles.module.scss';

const DiscordGuildGrid = () => {
  const { data, isLoading, error } = useDiscordGuildsQuery();

  if (isDiscordAuthError(error)) {
    return <DiscordReconnectBlocker />;
  }

  if (isLoading) {
    return (
      <div className={styles.center}>
        <Loading />
      </div>
    );
  }

  if (!data?.length) {
    return (
      <div className={styles.empty}>
        <p>No Discord servers found where both you and the bot are present.</p>
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      {data.map((guild) => (
        <DiscordGuildCard key={guild.id} guild={guild} />
      ))}
    </div>
  );
};

export default DiscordGuildGrid;
