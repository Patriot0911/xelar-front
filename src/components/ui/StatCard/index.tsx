import { cn } from '@/lib/utils';
import { StatCardProps } from './StatCard';

import styles from './styles.module.scss';

const StatCard = ({ label, value, sub, className }: StatCardProps) => {
  return (
    <div className={cn(styles.card, className)}>
      <span className={styles.label}>{label}</span>
      <span className={styles.value}>{value}</span>
      {sub && <span className={styles.sub}>{sub}</span>}
    </div>
  );
}

export default StatCard;
