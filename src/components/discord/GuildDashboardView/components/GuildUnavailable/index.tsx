'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { LuBookmark, LuBookmarkX } from 'react-icons/lu';
import ErrorState from '@/components/ui/ErrorState';
import Button from '@/components/ui/buttons/Button';
import useFavoriteGuilds from '@/hooks/shared/useFavoriteGuilds';
import GuildHeroFallback from '../GuildHeroFallback';
import { IGuildUnavailableProps } from './GuildUnavailable';

import styles from './styles.module.scss';

const GUILDS_PATH = '/dashboard/discord';

/**
 * Replaces the whole server page when a *favorite* server can't be opened (deleted, bot removed,
 * access lost — deliberately not told apart). Both choices lead back to the server list.
 */
const GuildUnavailable = ({ favorite }: IGuildUnavailableProps) => {
  const router = useRouter();
  const { remove } = useFavoriteGuilds();

  const handleRemove = () => {
    remove(favorite.id);
    toast.success(`${favorite.name} removed from favorites`);
    router.push(GUILDS_PATH);
  };

  const handleKeep = () => router.push(GUILDS_PATH);

  return (
    <GuildHeroFallback guildId={favorite.id}>
      <ErrorState
        variant="forbidden"
        compact
        className={styles.state}
        title={`Can’t open ${favorite.name}`}
        description="Unfortunately, this server isn’t available to you right now. It’s still in your favorites — you can remove it or keep it for later."
        actions={(
          <>
            <Button variant="danger" size="sm" leftIcon={<LuBookmarkX size={14} />} onClick={handleRemove}>
              Remove from favorites
            </Button>
            <Button variant="ghost" size="sm" leftIcon={<LuBookmark size={14} />} onClick={handleKeep}>
              Keep and go back
            </Button>
          </>
        )}
      />
    </GuildHeroFallback>
  );
};

export default GuildUnavailable;
