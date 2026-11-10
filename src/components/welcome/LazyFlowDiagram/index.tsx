'use client';

import dynamic from 'next/dynamic';
import { useRef } from 'react';
import useInView from '@/hooks/shared/useInView';
import useMediaQuery from '@/hooks/shared/useMediaQuery';

import styles from './styles.module.scss';

const FlowDiagramPlaceholder = () => (
  <div className={styles.placeholder} aria-hidden="true">
    <span className={styles.shimmer} />
  </div>
);

// React Flow is client-only and heavy — keep it out of the initial bundle and the SSR pass.
const FlowDiagram = dynamic(() => import('../FlowDiagram'), {
  ssr: false,
  loading: FlowDiagramPlaceholder,
});

const LazyFlowDiagram = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef);
  const isCompact = useMediaQuery('(max-width: 768px)');

  return (
    <div
      ref={containerRef}
      className={styles.frame}
      role="img"
      aria-label="Diagram: Twitch EventSub sends an event to the Xelar receiver, which queues it for the router; the router delivers it to your Discord server through the Xelar bot or a webhook."
    >
      {isInView
        ? <FlowDiagram direction={isCompact ? 'vertical' : 'horizontal'} />
        : <FlowDiagramPlaceholder />}
    </div>
  );
}

export default LazyFlowDiagram;
