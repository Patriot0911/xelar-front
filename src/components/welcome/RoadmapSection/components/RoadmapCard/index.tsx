import { cn } from '@/lib/utils';
import { ROADMAP_STATUS_LABELS } from '@/lib/constants/welcome';
import { IRoadmapCardProps } from './RoadmapCard';

import styles from './styles.module.scss';

const RoadmapCard = ({ title, description, status }: IRoadmapCardProps) => {
  return (
    <li className={styles.card}>
      <span className={cn(styles.status, styles[status])}>
        <span className={styles.statusDot} aria-hidden="true" />
        {ROADMAP_STATUS_LABELS[status]}
      </span>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
    </li>
  );
}

export default RoadmapCard;
