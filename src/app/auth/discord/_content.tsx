import DiscordButton from '@/components/ui/buttons/DiscordButton';

const DISCORD_AUTH_URL = `${process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001'}/api/auth/discord`;

export function AuthDiscordPageContent() {
  return (
    <form method="post" action={DISCORD_AUTH_URL}>
      Test
      <DiscordButton type='submit' />
    </form>
  );
}
