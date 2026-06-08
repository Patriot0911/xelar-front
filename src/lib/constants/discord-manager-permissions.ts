export enum DiscordManagerPermission {
  ManageGuild     = '32',
  ManageRoles     = '268435456',
  ManageChannels  = '16',
  ManageMessages  = '8192',
  ManageWebhooks  = '536870912',
  ModerateMembers = '1099511627776',
  KickMembers     = '2',
  BanMembers      = '4',
}

export const MANAGER_PERMISSION_LABELS: Record<DiscordManagerPermission, string> = {
  [DiscordManagerPermission.ManageGuild]:     'Manage Server',
  [DiscordManagerPermission.ManageRoles]:     'Manage Roles',
  [DiscordManagerPermission.ManageChannels]:  'Manage Channels',
  [DiscordManagerPermission.ManageMessages]:  'Manage Messages',
  [DiscordManagerPermission.ManageWebhooks]:  'Manage Webhooks',
  [DiscordManagerPermission.ModerateMembers]: 'Moderate Members',
  [DiscordManagerPermission.KickMembers]:     'Kick Members',
  [DiscordManagerPermission.BanMembers]:      'Ban Members',
};

export const MANAGER_PERMISSION_OPTIONS = Object.values(DiscordManagerPermission).map((value) => ({
  value,
  label: MANAGER_PERMISSION_LABELS[value],
}));
