import { cn } from '@/lib/utils';
import { ROADMAP_STATUS_LABELS } from '@/lib/constants/welcome';
import { IRoadmapStatusBadgeProps } from './RoadmapStatusBadge';

import styles from './styles.module.scss';

const RoadmapStatusBadge = ({ status, className }: IRoadmapStatusBadgeProps) => {
  return (
    <span className={cn(styles.badge, styles[status], className)}>
      <span className={styles.dot} aria-hidden="true" />
      {ROADMAP_STATUS_LABELS[status]}
    </span>
  );
}

export default RoadmapStatusBadge;
