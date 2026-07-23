import { useQuery } from '@tanstack/react-query';
import TwitchAppService from '@/lib/services/twitch-app.service';
import type { ITwitchCategoryModel } from '@/lib/models/twitch/twitch-category.model';

const useGameNamesQuery = (gameIds: string[]) => {
  const key = [...gameIds].sort().join(',');

  return useQuery<ITwitchCategoryModel[]>({
    queryKey: ['twitch-game-names', key],
    queryFn: () => TwitchAppService.getGamesByIds(gameIds),
    enabled: gameIds.length > 0,
    staleTime: 10 * 60 * 1000,
  });
};

export default useGameNamesQuery;
