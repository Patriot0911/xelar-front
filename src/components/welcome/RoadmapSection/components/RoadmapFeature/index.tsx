import { LuCheck } from 'react-icons/lu';
import { cn } from '@/lib/utils';
import { ROADMAP_STATUS_LABELS } from '@/lib/constants/welcome';
import { RoadmapStatus } from '@/lib/models/welcome';
import { IRoadmapFeatureProps } from './RoadmapFeature';

import styles from './styles.module.scss';

const RoadmapFeature = ({ label, status }: IRoadmapFeatureProps) => {
  return (
    <li className={cn(styles.feature, styles[status])}>
      <span className={styles.marker} aria-hidden="true">
        {status === RoadmapStatus.Done && <LuCheck size={10} strokeWidth={3} />}
      </span>
      <span className={styles.label}>{label}</span>
      <span className={styles.srOnly}>({ROADMAP_STATUS_LABELS[status]})</span>
    </li>
  );
}

export default RoadmapFeature;
