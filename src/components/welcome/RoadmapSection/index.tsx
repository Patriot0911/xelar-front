import SectionHeading from '@/components/ui/SectionHeading';
import { ROADMAP_RELEASES, WelcomeSectionId } from '@/lib/constants/welcome';
import WelcomeSection from '../WelcomeSection';
import RoadmapRelease from './components/RoadmapRelease';

import styles from './styles.module.scss';

const TITLE_ID = 'roadmap-title';

const RoadmapSection = () => {
  return (
    <WelcomeSection id={WelcomeSectionId.Roadmap} labelledBy={TITLE_ID}>
      <SectionHeading
        id={TITLE_ID}
        eyebrow="Roadmap"
        title="Where Xelar is heading"
        description="What is available today and what the next releases will bring."
      />
      <ol className={styles.timeline}>
        {ROADMAP_RELEASES.map(({ id, ...release }) => (
          <RoadmapRelease key={id} {...release} />
        ))}
      </ol>
    </WelcomeSection>
  );
}

export default RoadmapSection;
