import { cn } from '@/lib/utils';
import { IWelcomeSectionProps } from './WelcomeSection';

import styles from './styles.module.scss';

const WelcomeSection = ({ id, labelledBy, className, children }: IWelcomeSectionProps) => {
  return (
    <section id={id} aria-labelledby={labelledBy} className={cn(styles.section, className)}>
      <div className={styles.inner}>{children}</div>
    </section>
  );
}

export default WelcomeSection;
