export enum GuildDashboardTab {
  Notifications = 'notifications',
  Logs = 'logs',
  Settings = 'settings',
}

export const GUILD_DASHBOARD_TAB_LABELS: Record<GuildDashboardTab, string> = {
  [GuildDashboardTab.Notifications]: 'Notifications',
  [GuildDashboardTab.Logs]: 'Logs',
  [GuildDashboardTab.Settings]: 'Settings',
};
