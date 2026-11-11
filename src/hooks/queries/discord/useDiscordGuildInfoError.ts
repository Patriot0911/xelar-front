import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import DiscordService, { DiscordQueryKey } from '@/lib/services/discord.service';
import type { IDiscordGuildInfoModel } from '@/lib/models/discord/discord-guild-info.model';

/**
 * Watches the guild-info query that `useDiscordGuildInfoQuery` (the hero) loads, without fetching
 * or suspending itself — lets the page above the hero's boundary react to its error.
 * Only errors from this visit count: a cached one from an earlier visit is ignored, so the hero
 * mounts and asks again (access may have come back in the meantime).
 */
const useDiscordGuildInfoError = (guildId: string) => {
  const [mountedAt] = useState(() => Date.now());
  const { error, errorUpdatedAt } = useQuery<IDiscordGuildInfoModel>({
    queryKey: [DiscordQueryKey.GuildInfo, guildId],
    queryFn: () => DiscordService.getGuildInfo(guildId),
    enabled: false,
    throwOnError: false,
  });

  return error && errorUpdatedAt >= mountedAt ? error : null;
};

export default useDiscordGuildInfoError;
