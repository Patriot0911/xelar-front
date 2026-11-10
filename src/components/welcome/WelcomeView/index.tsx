import dynamic from 'next/dynamic';
import AuthBgEffects from '@/components/auth/AuthBgEffects';
import WelcomeHeader from '../WelcomeHeader';
import HeroSection from '../HeroSection';
import WelcomeJsonLd from '../WelcomeJsonLd';

import styles from './styles.module.scss';

// Below-the-fold sections are split into their own chunks. They are still
// server-rendered, so their content stays in the HTML for crawlers; the
// heavy client-only part (React Flow) is deferred inside LazyFlowDiagram.
const HowItWorksSection = dynamic(() => import('../HowItWorksSection'));
const TrustSection = dynamic(() => import('../TrustSection'));
const RoadmapSection = dynamic(() => import('../RoadmapSection'));
const JoinSection = dynamic(() => import('../JoinSection'));
const WelcomeFooter = dynamic(() => import('../WelcomeFooter'));

const WelcomeView = () => {
  return (
    <div className={styles.page}>
      <WelcomeJsonLd />
      <AuthBgEffects />
      <WelcomeHeader />

      <main className={styles.main}>
        <HeroSection />
        <HowItWorksSection />
        <TrustSection />
        <RoadmapSection />
        <JoinSection />
      </main>

      <WelcomeFooter />
    </div>
  );
}

export default WelcomeView;
