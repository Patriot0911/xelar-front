'use client';

import { useMemo, useState } from 'react';
import { LuSearch } from 'react-icons/lu';
import useDiscordGuildsQuery from '@/hooks/queries/discord/useDiscordGuildsQuery';
import { isDiscordAuthError } from '@/lib/models/discord';
import DiscordGuildCard from '../DiscordGuildCard';
import DiscordReconnectBlocker from '../DiscordReconnectBlocker';
import Loading from '@/components/ui/Loading';
import styles from './styles.module.scss';

type TGuildFilter = 'all' | 'active' | 'needs-bot';

const FILTERS: { key: TGuildFilter; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'active', label: 'Active' },
  { key: 'needs-bot', label: 'Needs bot' },
];

const DiscordGuildGrid = () => {
  const { data, isLoading, error } = useDiscordGuildsQuery();
  const [filter, setFilter] = useState<TGuildFilter>('all');
  const [search, setSearch] = useState('');

  const counts = useMemo(() => ({
    all: data?.length ?? 0,
    active: data?.filter((guild) => guild.hasBot).length ?? 0,
    'needs-bot': data?.filter((guild) => !guild.hasBot).length ?? 0,
  }), [data]);

  const filteredGuilds = useMemo(() => {
    if (!data) return [];

    const query = search.trim().toLowerCase();

    return data.filter((guild) => {
      if (filter === 'active' && !guild.hasBot) return false;
      if (filter === 'needs-bot' && guild.hasBot) return false;
      if (query && !guild.name.toLowerCase().includes(query)) return false;
      return true;
    }).sort((a, b) => a.hasBot === b.hasBot ? 0 : a.hasBot ? -1 : 1);
  }, [data, filter, search]);

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
        <p>No Discord servers found where you have management access.</p>
      </div>
    );
  }

  return (
    <>
      <div className={styles.toolbar}>
        <div className={styles.tabs}>
          {FILTERS.map(({ key, label }) => (
            <button
              key={key}
              type="button"
              className={`${styles.tab} ${filter === key ? styles.tabActive : ''}`}
              onClick={() => setFilter(key)}
            >
              {label}
              <span className={styles.tabCount}>{counts[key]}</span>
            </button>
          ))}
        </div>
        <div className={styles.searchWrap}>
          <LuSearch size={14} className={styles.searchIcon} />
          <input
            className={styles.searchInput}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search servers…"
            autoComplete="off"
          />
        </div>
      </div>

      {filteredGuilds.length ? (
        <div className={styles.grid}>
          {filteredGuilds.map((guild) => (
            <DiscordGuildCard key={guild.id} guild={guild} />
          ))}
        </div>
      ) : (
        <div className={styles.empty}>
          <p>No servers match your filters.</p>
        </div>
      )}
    </>
  );
};

export default DiscordGuildGrid;
