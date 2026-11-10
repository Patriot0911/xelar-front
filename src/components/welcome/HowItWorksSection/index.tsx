import SectionHeading from '@/components/ui/SectionHeading';
import { WELCOME_STEPS, WelcomeSectionId } from '@/lib/constants/welcome';
import WelcomeSection from '../WelcomeSection';
import LazyFlowDiagram from '../LazyFlowDiagram';
import HowItWorksSteps from './components/HowItWorksSteps';

const TITLE_ID = 'how-it-works-title';

const HowItWorksSection = () => {
  return (
    <WelcomeSection id={WelcomeSectionId.HowItWorks} labelledBy={TITLE_ID}>
      <SectionHeading
        id={TITLE_ID}
        eyebrow="How it works"
        title="From “Go live” to a Discord ping in seconds"
        description="Xelar sits between Twitch and Discord. Here is the path every event takes on our side."
      />
      <LazyFlowDiagram />
      <HowItWorksSteps steps={WELCOME_STEPS} />
    </WelcomeSection>
  );
}

export default HowItWorksSection;
