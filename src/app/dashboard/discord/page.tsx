'use client';

import PageHeader from '@/components/ui/PageHeader';
import PageContent from '@/components/ui/PageContent';
import DiscordGuildGrid from '@/components/discord/DiscordGuildGrid';
import { DISCORD_BOT_INVITE_URL } from '@/lib/constants/discord-bot-invite';
import ExternalButton from '@/components/ui/buttons/ExternalButton';
import Notice from '@/components/ui/Notice';
import Loading from '@/components/ui/Loading';
import AsyncBoundary from '@/components/common/AsyncBoundary';
import DiscordReconnectBlocker from '@/components/discord/DiscordReconnectBlocker';
import { isDiscordAuthError } from '@/lib/errors';

export default function DiscordServersPage() {
  return (
    <>
      <PageHeader
        eyebrow="Notifications · Discord"
        title="Discord Servers"
        description="Servers you manage — invite the bot to start sending Twitch notifications."
        actions={DISCORD_BOT_INVITE_URL && (
          <ExternalButton href={DISCORD_BOT_INVITE_URL} label="Invite Bot" />
        )}
      />
      <PageContent>
        <Notice title="Who can add Xelar to a server">
          <ul>
            <li>
              Discord lets you invite a bot only with the <strong>Manage Server</strong> permission on that server —
              the <strong>owner</strong> and <strong>administrators</strong> always have it.
            </li>
            <li>
              This list shows servers where you are the owner, an administrator, or have the
              {' '}<strong>manager permission</strong> chosen in the server&apos;s Xelar settings.
            </li>
            <li>
              Managers without Manage Server can work with notifications once the bot is added, but an owner or admin has to invite it.
            </li>
          </ul>
        </Notice>
        <AsyncBoundary
          loading={(
            <Loading
              type="block"
              tone="discord"
              title="Loading servers"
              description="Fetching the Discord servers you manage…"
            />
          )}
          renderError={(error) => (isDiscordAuthError(error) ? <DiscordReconnectBlocker /> : undefined)}
        >
          <DiscordGuildGrid />
        </AsyncBoundary>
      </PageContent>
    </>
  );
}
