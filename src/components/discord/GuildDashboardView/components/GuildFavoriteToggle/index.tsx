'use client';

import { toast } from 'sonner';
import { LuBookmark, LuBookmarkCheck } from 'react-icons/lu';
import useFavoriteGuilds from '@/hooks/shared/useFavoriteGuilds';
import { FAVORITE_GUILDS_LIMIT } from '@/lib/favorite-guilds';
import { cn } from '@/lib/utils';
import { IGuildFavoriteToggleProps } from './GuildFavoriteToggle';

import styles from './styles.module.scss';

/** Bookmark in the hero's top-left corner: saves the server to favorites (shown in the nav) or removes it. */
const GuildFavoriteToggle = ({ guild, className }: IGuildFavoriteToggleProps) => {
  const { isFavorite, isFull, add, remove } = useFavoriteGuilds();
  const isSaved = isFavorite(guild.id);
  const label = isSaved ? 'Remove from favorites' : 'Add to favorites';
  const hint = !isSaved && isFull
    ? `Favorites are full (${FAVORITE_GUILDS_LIMIT}/${FAVORITE_GUILDS_LIMIT})`
    : label;

  const handleClick = () => {
    if (isSaved) {
      remove(guild.id);
      toast.success(`${guild.name} removed from favorites`);
      return;
    }

    // Not disabled when full: a click explains why instead of the button silently doing nothing.
    if (add(guild) === 'limit') {
      toast.error(`You can keep up to ${FAVORITE_GUILDS_LIMIT} favorite servers. Remove one to add this server.`);
      return;
    }
    toast.success(`${guild.name} added to favorites`);
  };

  return (
    <button
      type="button"
      className={cn(styles.toggle, isSaved && styles.saved, className)}
      aria-pressed={isSaved}
      aria-label={label}
      title={hint}
      onClick={handleClick}
    >
      {isSaved ? <LuBookmarkCheck size={17} aria-hidden /> : <LuBookmark size={17} aria-hidden />}
    </button>
  );
};

export default GuildFavoriteToggle;
