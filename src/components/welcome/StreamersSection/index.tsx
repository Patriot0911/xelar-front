import SectionHeading from '@/components/ui/SectionHeading';
import { WelcomeSectionId } from '@/lib/constants/welcome';
import PublicService from '@/lib/services/public.service';
import WelcomeSection from '../WelcomeSection';
import ShowcaseStats from './components/ShowcaseStats';
import StreamersMarquee from './components/StreamersMarquee';

import styles from './styles.module.scss';

const TITLE_ID = 'streamers-title';

/**
 * Async server component: the showcase is fetched on the server and cached by Next (ISR),
 * so it is part of the HTML and costs the browser no extra request.
 * Renders nothing when the API is unavailable or nobody is listed yet.
 */
const StreamersSection = async () => {
  const showcase = await PublicService.getStreamersShowcase();
  if (!showcase || showcase.streamers.length === 0) return null;

  const { streamers, stats, activityWindowDays } = showcase;

  return (
    <WelcomeSection id={WelcomeSectionId.Streamers} labelledBy={TITLE_ID} className={styles.section}>
      <SectionHeading
        id={TITLE_ID}
        eyebrow="On Xelar"
        title="Streamers already on autopilot"
        description={`Ranked by notifications delivered to their communities over the last ${activityWindowDays} days.`}
      />
      <ShowcaseStats stats={stats} activityWindowDays={activityWindowDays} />
      <StreamersMarquee streamers={streamers} activityWindowDays={activityWindowDays} />
    </WelcomeSection>
  );
}

export default StreamersSection;
