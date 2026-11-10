import { ITrustCardProps } from './TrustCard';

import styles from './styles.module.scss';

const TrustCard = ({ icon: Icon, title, description }: ITrustCardProps) => {
  return (
    <li className={styles.card}>
      <span className={styles.icon} aria-hidden="true">
        <Icon size={18} />
      </span>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
    </li>
  );
}

export default TrustCard;
