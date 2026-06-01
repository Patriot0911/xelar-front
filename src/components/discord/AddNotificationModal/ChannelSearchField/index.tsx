'use client';

import { useEffect, useRef, useState } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { LuHash, LuSearch, LuX, LuLoader, LuMegaphone } from 'react-icons/lu';
import DiscordService from '@/lib/services/discord.service';
import PortalDropdown from '@/components/ui/PortalDropdown';
import type { IDiscordChannelModel } from '@/lib/models/discord';
import type { TAddNotificationForm } from '../add-notification.scheme';
import styles from './styles.module.scss';

interface IChannelSearchFieldProps {
  guildId: string;
}

const ChannelSearchField = ({ guildId }: IChannelSearchFieldProps) => {
  const { control } = useFormContext<TAddNotificationForm>();
  const { field } = useController({ name: 'channelId', control });

  const [channels, setChannels] = useState<IDiscordChannelModel[]>([]);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<IDiscordChannelModel | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const anchorRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);

    DiscordService.getGuildChannels(guildId)
      .then((data) => { if (!cancelled) setChannels(data); })
      .finally(() => { if (!cancelled) setIsLoading(false); });

    return () => { cancelled = true; };
  }, [guildId]);

  useEffect(() => {
    if (!isOpen) return;
    const onClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (anchorRef.current && !anchorRef.current.contains(target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, [isOpen]);

  const filtered = query.trim()
    ? channels.filter((ch) => ch.name.toLowerCase().includes(query.toLowerCase()))
    : channels;

  const handleSelect = (ch: IDiscordChannelModel) => {
    setSelected(ch);
    field.onChange(ch.id);
    setQuery('');
    setIsOpen(false);
  };

  const handleClear = () => {
    setSelected(null);
    field.onChange('');
    setQuery('');
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const showList = isOpen && !selected && filtered.length > 0;
  const showEmpty = isOpen && !selected && !isLoading && filtered.length === 0;

  return (
    <div className={styles.root}>
      <div className={styles.labelRow}>
        <label className={styles.label}>Discord Channel</label>
      </div>

      {selected ? (
        <div className={styles.selectedCard}>
          <LuHash size={14} className={styles.selectedIcon} />
          <span className={styles.selectedName}>{selected.name}</span>
          {selected.topic && (
            <span className={styles.selectedTopic}>{selected.topic}</span>
          )}
          <button
            type="button"
            className={styles.clearBtn}
            onClick={handleClear}
            aria-label="Clear selection"
          >
            <LuX size={14} />
          </button>
        </div>
      ) : (
        <div className={styles.inputWrap} ref={anchorRef}>
          {isLoading
            ? <LuLoader size={14} className={styles.loader} />
            : <LuSearch size={14} className={styles.searchIcon} />
          }
          <input
            ref={inputRef}
            className={styles.input}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsOpen(true)}
            placeholder={isLoading ? 'Loading channels…' : 'Search channels…'}
            disabled={isLoading}
            autoComplete="off"
          />
          {!isLoading && channels.length > 0 && (
            <span className={styles.count}>{channels.length}</span>
          )}
        </div>
      )}

      <PortalDropdown anchorRef={anchorRef} isOpen={showList}>
        <div className={styles.dropdown}>
          {filtered.map((ch) => (
            <button
              key={ch.id}
              type="button"
              className={styles.option}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => handleSelect(ch)}
            >
              <LuHash size={13} className={styles.optionIcon} />
              <span className={styles.optionName}>{ch.name}</span>
              {ch.topic && (
                <span className={styles.optionTopic}>{ch.topic}</span>
              )}
            </button>
          ))}
        </div>
      </PortalDropdown>

      <PortalDropdown anchorRef={anchorRef} isOpen={showEmpty}>
        <div className={styles.empty}>
          <LuMegaphone size={14} />
          {query ? 'No channels match your search.' : 'No text channels found.'}
        </div>
      </PortalDropdown>

      <span className={styles.hint}>
        The bot must have permission to post in the selected channel.
      </span>
    </div>
  );
};

export default ChannelSearchField;
