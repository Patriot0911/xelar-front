'use client';

import { useState } from 'react';
import { LuChevronDown, LuCheck, LuLoader, LuAtSign } from 'react-icons/lu';
import useDiscordGuildRolesQuery from '@/hooks/queries/discord/useDiscordGuildRolesQuery';
import type { IDiscordRoleModel } from '@/lib/models/discord';
import styles from './styles.module.scss';

interface IRoleMentionPickerProps {
  guildId: string;
}

const toColorHex = (color: number): string | null => {
  if (!color) return null;
  return `#${color.toString(16).padStart(6, '0')}`;
};

const RoleMentionPicker = ({ guildId }: IRoleMentionPickerProps) => {
  const { data: roles = [], isLoading } = useDiscordGuildRolesQuery(guildId);
  const [isOpen, setIsOpen]             = useState(false);
  const [copiedId, setCopiedId]         = useState<string | null>(null);

  const handleCopy = (role: IDiscordRoleModel) => {
    navigator.clipboard.writeText(`<@&${role.id}>`).then(() => {
      setCopiedId(role.id);
      setTimeout(() => setCopiedId(null), 1500);
    });
  };

  return (
    <div className={styles.root}>
      <button
        type="button"
        className={styles.header}
        onClick={() => setIsOpen((v) => !v)}
        disabled={isLoading}
      >
        <span className={styles.headerLeft}>
          {isLoading
            ? <LuLoader size={12} className={styles.spin} />
            : <LuAtSign size={12} />
          }
          <span className={styles.title}>Role Mentions</span>
          {!isLoading && roles.length > 0 && (
            <span className={styles.badge}>{roles.length}</span>
          )}
        </span>
        <LuChevronDown
          size={12}
          className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`}
        />
      </button>

      {isOpen && (
        <div className={styles.list}>
          {roles.length === 0 ? (
            <span className={styles.empty}>No roles found.</span>
          ) : (
            roles.map((role) => {
              const hex = toColorHex(role.color);
              return (
                <button
                  key={role.id}
                  type="button"
                  className={styles.role}
                  onClick={() => handleCopy(role)}
                  title={`Copy <@&${role.id}>`}
                >
                  <span
                    className={styles.colorDot}
                    style={{ background: hex ?? 'var(--ink-3)' }}
                  />
                  <span className={styles.roleName}>{role.name}</span>
                  {copiedId === role.id ? (
                    <LuCheck size={11} className={styles.copied} />
                  ) : (
                    <span className={styles.tag}>{`<@&${role.id}>`}</span>
                  )}
                </button>
              );
            })
          )}
        </div>
      )}
      <p className={styles.hint}>Click a role to copy its mention syntax to clipboard.</p>
    </div>
  );
};

export default RoleMentionPicker;
