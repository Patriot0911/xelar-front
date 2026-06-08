import { LuExternalLink } from 'react-icons/lu';
import PageHeader from '@/components/ui/PageHeader';
import PageContent from '@/components/ui/PageContent';
import DiscordGuildGrid from '@/components/discord/DiscordGuildGrid';
import { DISCORD_BOT_INVITE_URL } from '@/lib/constants/discord-bot-invite';
import styles from './styles.module.scss';

export default function DiscordServersPage() {
  return (
    <>
      <PageHeader
        eyebrow="Notifications · Discord"
        title="Discord Servers"
        description="Servers you manage — invite the bot to start sending Twitch notifications."
        actions={
          DISCORD_BOT_INVITE_URL ? (
            <a
              href={DISCORD_BOT_INVITE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.inviteBtn}
            >
              Invite Bot
              <LuExternalLink size={13} />
            </a>
          ) : null
        }
      />
      <PageContent>
        <DiscordGuildGrid />
      </PageContent>
    </>
  );
}
