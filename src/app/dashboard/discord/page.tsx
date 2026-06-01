import { LuExternalLink } from 'react-icons/lu';
import PageHeader from '@/components/ui/PageHeader';
import PageContent from '@/components/ui/PageContent';
import DiscordGuildGrid from '@/components/discord/DiscordGuildGrid';
import styles from './styles.module.scss';

const BOT_CLIENT_ID = process.env.NEXT_PUBLIC_DISCORD_BOT_CLIENT_ID ?? '';
const BOT_PERMISSIONS = '277025770560';
const INVITE_URL = BOT_CLIENT_ID
  ? `https://discord.com/oauth2/authorize?client_id=${BOT_CLIENT_ID}&permissions=${BOT_PERMISSIONS}&scope=bot+applications.commands`
  : null;

export default function DiscordServersPage() {
  return (
    <>
      <PageHeader
        eyebrow="Notifications · Discord"
        title="Discord Servers"
        description="Servers where both you and the bot are present."
        actions={
          INVITE_URL ? (
            <a
              href={INVITE_URL}
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
