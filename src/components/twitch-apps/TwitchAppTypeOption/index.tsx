import { twitchAppStates } from '@/lib/constants/twitch-app-status';
import { ITwitchAppTypeOptionProps } from './TwitchAppTypeOption';

import styles from './styles.module.scss';

const TwitchAppStatusMark = ({ val }: { val: string; }) => {
  const Mark = twitchAppStates[val].icon;
  return <Mark size={14} />;
}

const TwitchAppTypeOption = ({ item, }: ITwitchAppTypeOptionProps) => {
  return (
    <div className={styles['type-item']}>
      <span className={`${styles['type-mark']} ${styles[item.value]}`}>
        <TwitchAppStatusMark val={item.value} />
      </span>
      <div>
        <span className={styles['name']}>{item.label}</span>
        <span className={styles['desc']}>{twitchAppStates[item.value].description}</span>
      </div>
    </div>
  );
}

export default TwitchAppTypeOption;
