import SectionHeading from '@/components/ui/SectionHeading';
import { ROADMAP_ITEMS, WelcomeSectionId } from '@/lib/constants/welcome';
import WelcomeSection from '../WelcomeSection';
import RoadmapCard from './components/RoadmapCard';

import styles from './styles.module.scss';

const TITLE_ID = 'roadmap-title';

// TODO: roadmap content is a placeholder — see ROADMAP_ITEMS in lib/constants/welcome.ts
const RoadmapSection = () => {
  return (
    <WelcomeSection id={WelcomeSectionId.Roadmap} labelledBy={TITLE_ID}>
      <SectionHeading
        id={TITLE_ID}
        eyebrow="Roadmap"
        title="What we are building next"
        description="A short look at what has shipped and what is coming."
      />
      <ol className={styles.list}>
        {ROADMAP_ITEMS.map(({ id, ...item }) => (
          <RoadmapCard key={id} {...item} />
        ))}
      </ol>
    </WelcomeSection>
  );
}

export default RoadmapSection;
