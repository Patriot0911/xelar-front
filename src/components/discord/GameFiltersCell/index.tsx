'use client';

import useGameNamesQuery from '@/hooks/queries/twitch/useGameNamesQuery';
import Loading from '@/components/ui/Loading';
import { IGameFiltersCellProps } from './GameFiltersCell';

import styles from './styles.module.scss';

const GameFiltersNames = ({ gameIds }: { gameIds: string[] }) => {
  const { data, isLoading } = useGameNamesQuery(gameIds);

  if (isLoading && !data) {
    return <Loading type="inline" title="Loading games" />;
  }

  const byId = new Map((data ?? []).map((game) => [game.id, game.name]));

  return (
    <div className={styles.chips}>
      {gameIds.map((id) => (
        <span key={id} className={styles.chip}>{byId.get(id) ?? id}</span>
      ))}
    </div>
  );
};

const GameFiltersCell = ({ gameFilters }: IGameFiltersCellProps) => {
  if (!gameFilters?.length) {
    return <span className={styles.all}>All games</span>;
  }

  return <GameFiltersNames gameIds={gameFilters} />;
};

export default GameFiltersCell;
