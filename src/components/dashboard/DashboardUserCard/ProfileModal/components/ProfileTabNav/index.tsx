import { cn } from '@/lib/utils';
import { IProfileTabNavProps, ProfileModalTab } from '../../ProfileModal';
import styles from './styles.module.scss';

const TABS: { key: ProfileModalTab; label: string }[] = [
  { key: 'profile', label: 'Profile' },
  { key: 'sessions', label: 'Sessions' },
  { key: 'services', label: 'Services' },
];

const ProfileTabNav = ({ activeTab, onTabChange }: IProfileTabNavProps) => {
  return (
    <nav className={styles.nav} aria-label="Profile sections">
      {TABS.map(({ key, label }) => (
        <button
          key={key}
          type="button"
          className={cn(styles.tab, activeTab === key && styles.tabActive)}
          onClick={() => onTabChange(key)}
          aria-current={activeTab === key ? 'page' : undefined}
        >
          {label}
        </button>
      ))}
    </nav>
  );
};

export default ProfileTabNav;
