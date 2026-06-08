const BOT_CLIENT_ID = process.env.NEXT_PUBLIC_DISCORD_BOT_CLIENT_ID ?? '';
const BOT_PERMISSIONS = '277025770560';

export const DISCORD_BOT_INVITE_URL = BOT_CLIENT_ID
  ? `https://discord.com/oauth2/authorize?client_id=${BOT_CLIENT_ID}&permissions=${BOT_PERMISSIONS}&scope=bot+applications.commands`
  : null;
