import { ADMINISTRATOR, hasBitFlagPermission } from './utils';

/** Discord "Manage Server" — required by Discord to add a bot to a server. */
export const MANAGE_GUILD = 0x20;

/** How the current user reaches a server in Xelar (mirrors the backend guild filter). */
export type TGuildAccessRole = 'owner' | 'admin' | 'manager';

export const GUILD_ACCESS_ROLE_LABELS: Record<TGuildAccessRole, string> = {
  owner: 'Owner',
  admin: 'Admin',
  manager: 'Manager',
};

interface IGuildAccessLike {
  owner: boolean;
  permissions: string;
}

export const getGuildAccessRole = (guild: IGuildAccessLike): TGuildAccessRole => {
  if (guild.owner) return 'owner';
  if (hasBitFlagPermission(guild.permissions, ADMINISTRATOR)) return 'admin';
  return 'manager';
};

/** Discord only lets a member with Manage Server (owners / admins always have it) invite a bot. */
export const canInviteBot = (guild: IGuildAccessLike): boolean =>
  guild.owner
  || hasBitFlagPermission(guild.permissions, ADMINISTRATOR)
  || hasBitFlagPermission(guild.permissions, MANAGE_GUILD);

const ROLE_RANK: Record<TGuildAccessRole, number> = { owner: 0, admin: 1, manager: 2 };

/**
 * Servers list order: connected servers first, then servers without the bot that we own,
 * then the rest without the bot (admin / manager access); ties by role, then by name.
 */
export const compareGuildsForList = <G extends IGuildAccessLike & { hasBot: boolean; name: string }>(a: G, b: G) =>
  Number(b.hasBot) - Number(a.hasBot)
  || ROLE_RANK[getGuildAccessRole(a)] - ROLE_RANK[getGuildAccessRole(b)]
  || a.name.localeCompare(b.name);
