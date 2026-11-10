import { SiDiscord } from 'react-icons/si';
import SectionHeading from '@/components/ui/SectionHeading';
import LinkButton from '@/components/ui/buttons/LinkButton';
import { DISCORD_BOT_INVITE_URL } from '@/lib/constants/discord-bot-invite';
import { WelcomeSectionId } from '@/lib/constants/welcome';
import WelcomeSection from '../WelcomeSection';
import WelcomeCtaLink from '../WelcomeCtaLink';

import styles from './styles.module.scss';

const TITLE_ID = 'join-title';

const JoinSection = () => {
  return (
    <WelcomeSection id={WelcomeSectionId.Join} labelledBy={TITLE_ID}>
      <div className={styles.card}>
        <div className={styles.glow} aria-hidden="true" />
        <SectionHeading
          id={TITLE_ID}
          align="center"
          eyebrow="Join Xelar"
          title="Wire your first bridge in a couple of minutes"
          description="Sign in with Discord, pick a streamer and a channel — your community hears about the next stream automatically."
        />
        <div className={styles.actions}>
          <WelcomeCtaLink size="lg" guestLabel="Create a free account" />
          {DISCORD_BOT_INVITE_URL && (
            <LinkButton
              href={DISCORD_BOT_INVITE_URL}
              variant="outline"
              size="lg"
              leftIcon={<SiDiscord size={16} />}
            >
              Add bot to Discord
            </LinkButton>
          )}
        </div>
      </div>
    </WelcomeSection>
  );
}

export default JoinSection;
