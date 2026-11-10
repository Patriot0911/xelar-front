import { IGuildStatProps } from './GuildStat';

import styles from './styles.module.scss';

const GuildStat = ({ icon: Icon, label, value, hint }: IGuildStatProps) => (
  <div className={styles.stat}>
    <dt className={styles.label}>
      <Icon size={12} aria-hidden />
      {label}
    </dt>
    <dd className={styles.value}>
      {value}
      {hint && <span className={styles.hint}>{hint}</span>}
    </dd>
  </div>
);

export default GuildStat;
