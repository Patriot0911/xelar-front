import { LuCheck } from 'react-icons/lu';
import { cn } from '@/lib/utils';
import { RoadmapStatus } from '@/lib/models/welcome';
import RoadmapStatusBadge from '../RoadmapStatusBadge';
import RoadmapFeature from '../RoadmapFeature';
import { IRoadmapReleaseProps } from './RoadmapRelease';

import styles from './styles.module.scss';

const RoadmapRelease = ({ version, title, summary, status, features }: IRoadmapReleaseProps) => {
  const titleId = `roadmap-release-${version.replace(/\W/g, '-')}`;

  return (
    <li className={cn(styles.release, styles[status])}>
      <span className={styles.node} aria-hidden="true">
        {status === RoadmapStatus.Done && <LuCheck size={10} strokeWidth={3} />}
      </span>

      <article className={styles.card} aria-labelledby={titleId}>
        <header className={styles.header}>
          <span className={styles.version}>v{version}</span>
          <RoadmapStatusBadge status={status} />
        </header>

        <div className={styles.intro}>
          <h3 id={titleId} className={styles.title}>{title}</h3>
          <p className={styles.summary}>{summary}</p>
        </div>

        <ul className={styles.features}>
          {features.map((feature) => (
            <RoadmapFeature
              key={feature.id}
              label={feature.label}
              status={feature.status ?? status}
            />
          ))}
        </ul>
      </article>
    </li>
  );
}

export default RoadmapRelease;
