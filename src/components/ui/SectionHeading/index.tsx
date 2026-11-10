import { cn } from '@/lib/utils';
import { ISectionHeadingProps } from './SectionHeading';

import styles from './styles.module.scss';

const SectionHeading = ({
  id,
  eyebrow,
  title,
  description,
  align = 'left',
  as: Heading = 'h2',
  className,
}: ISectionHeadingProps) => {
  return (
    <header className={cn(styles.root, styles[align], className)}>
      {eyebrow && (
        <span className={styles.eyebrow}>
          <span className={styles.eyebrowDot} aria-hidden="true" />
          {eyebrow}
        </span>
      )}
      <Heading id={id} className={styles.title}>{title}</Heading>
      {description && <p className={styles.description}>{description}</p>}
    </header>
  );
}

export default SectionHeading;
