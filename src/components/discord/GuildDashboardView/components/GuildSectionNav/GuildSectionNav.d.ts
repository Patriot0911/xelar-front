import { GuildDashboardTab } from '@/lib/constants/guild-dashboard';

export interface IGuildSectionNavProps {
  value: GuildDashboardTab;
  onChange: (tab: GuildDashboardTab) => void;
};
