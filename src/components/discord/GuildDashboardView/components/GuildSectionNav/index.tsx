import { LuBell, LuScrollText, LuSettings2 } from 'react-icons/lu';
import { IconType } from 'react-icons';
import { GUILD_DASHBOARD_TAB_LABELS, GuildDashboardTab } from '@/lib/constants/guild-dashboard';
import { IGuildSectionNavProps } from './GuildSectionNav';

import styles from './styles.module.scss';

const ICONS: Record<GuildDashboardTab, IconType> = {
  [GuildDashboardTab.Notifications]: LuBell,
  [GuildDashboardTab.Logs]: LuScrollText,
  [GuildDashboardTab.Settings]: LuSettings2,
};

const GuildSectionNav = ({ value, onChange }: IGuildSectionNavProps) => (
  <nav className={styles.nav} role="tablist" aria-label="Server sections">
    {Object.values(GuildDashboardTab).map((tab) => {
      const Icon = ICONS[tab];
      const isActive = tab === value;

      return (
        <button
          key={tab}
          type="button"
          role="tab"
          aria-selected={isActive}
          data-active={isActive}
          className={styles.tab}
          onClick={() => onChange(tab)}
        >
          <Icon size={14} aria-hidden />
          {GUILD_DASHBOARD_TAB_LABELS[tab]}
        </button>
      );
    })}
  </nav>
);

export default GuildSectionNav;
