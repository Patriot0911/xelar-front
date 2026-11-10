import SectionHeading from '@/components/ui/SectionHeading';
import { WELCOME_TRUST_POINTS, WelcomeSectionId } from '@/lib/constants/welcome';
import WelcomeSection from '../WelcomeSection';
import TrustCard from './components/TrustCard';

import styles from './styles.module.scss';

const TITLE_ID = 'trust-title';

const TrustSection = () => {
  return (
    <WelcomeSection id={WelcomeSectionId.Trust} labelledBy={TITLE_ID}>
      <SectionHeading
        id={TITLE_ID}
        eyebrow="Why Xelar"
        title="Built to be boring — in the best way"
        description="Notifications are only useful when they always arrive, exactly once. That is what the architecture is designed around."
      />
      <ul className={styles.grid}>
        {WELCOME_TRUST_POINTS.map(({ id, ...point }) => (
          <TrustCard key={id} {...point} />
        ))}
      </ul>
    </WelcomeSection>
  );
}

export default TrustSection;
