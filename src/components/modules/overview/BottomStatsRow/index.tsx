import TopStreamersCard from '../TopStreamersCard';
import NotificationSplitCard from '../NotificationSplitCard';

import styles from './styles.module.scss';

const BottomStatsRow = () => (
  <div className={styles.row}>
    <TopStreamersCard />
    <NotificationSplitCard />
  </div>
);

export default BottomStatsRow;
