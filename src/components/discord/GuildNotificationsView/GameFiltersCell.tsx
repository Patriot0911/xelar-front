import useGameNamesQuery from '@/hooks/queries/twitch/useGameNamesQuery';
import styles from './styles.module.scss';

const GameFiltersCell = ({ gameFilters }: { gameFilters: string[] }) => {
  if (!gameFilters?.length) {
    return <span className={styles.gamesAll}>All games</span>;
  }

  return <GameFiltersCellNames gameIds={gameFilters} />;
};

const GameFiltersCellNames = ({ gameIds }: { gameIds: string[] }) => {
  const { data, isLoading } = useGameNamesQuery(gameIds);

  if (isLoading && !data) {
    return <span className={styles.gamesAll}>Loading…</span>;
  }

  const byId = new Map((data ?? []).map((g) => [g.id, g.name]));

  return (
    <div className={styles.gamesChips}>
      {gameIds.map((id) => (
        <span key={id} className={styles.gamesChip}>{byId.get(id) ?? id}</span>
      ))}
    </div>
  );
};

export default GameFiltersCell;
