import { LuArrowDown } from 'react-icons/lu';
import AuthVisual from '@/components/auth/AuthVisual';
import LinkButton from '@/components/ui/buttons/LinkButton';
import { WelcomeSectionId } from '@/lib/constants/welcome';
import WelcomeCtaLink from '../WelcomeCtaLink';

import styles from './styles.module.scss';

const HeroSection = () => {
  return (
    <section id={WelcomeSectionId.Hero} aria-labelledby="hero-title" className={styles.hero}>
      <div className={styles.inner}>
        <div className={styles.copy}>
          <span className={styles.kicker}>
            <span className={styles.kickerDot} aria-hidden="true" />
            Twitch → Discord, in real time
          </span>

          <h1 id="hero-title" className={styles.title}>
            Your stream goes live.{' '}
            <span className={styles.grad}>Your community knows.</span>
          </h1>

          <p className={styles.lead}>
            Xelar listens to Twitch and delivers stream events straight to your Discord channels and webhooks.
            Set up a notification once — Xelar handles the rest, every time you hit &quot;Go live&quot;.
          </p>

          <div className={styles.actions}>
            <WelcomeCtaLink size="lg" />
            <LinkButton
              href={`#${WelcomeSectionId.HowItWorks}`}
              variant="outline"
              size="lg"
              rightIcon={<LuArrowDown size={15} />}
            >
              See how it works
            </LinkButton>
          </div>
        </div>

        <AuthVisual className={styles.visual} />
      </div>
    </section>
  );
}

export default HeroSection;
