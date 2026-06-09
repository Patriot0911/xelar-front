'use client';

import { LuExternalLink } from 'react-icons/lu';
import PageHeader from '@/components/ui/PageHeader';
import PageContent from '@/components/ui/PageContent';
import DiscordGuildGrid from '@/components/discord/DiscordGuildGrid';
import { DISCORD_BOT_INVITE_URL } from '@/lib/constants/discord-bot-invite';
import Button from '@/components/ui/buttons/Button';

export default function DiscordServersPage() {
  return (
    <>
      <PageHeader
        eyebrow="Notifications · Discord"
        title="Discord Servers"
        description="Servers you manage — invite the bot to start sending Twitch notifications."
        actions={(
          <>
            {DISCORD_BOT_INVITE_URL && (
              <Button variant="secondary" onClick={() => window.open(DISCORD_BOT_INVITE_URL!, '_blank')}>
                Invite Bot <LuExternalLink size={13} />
              </Button>
            )}
          </>
        )}
      />
      <PageContent>
        <DiscordGuildGrid />
      </PageContent>
    </>
  );
}
