import { LuInfo, LuTriangleAlert } from 'react-icons/lu';
import { cn } from '@/lib/utils';
import { INoticeProps } from './Notice';

import styles from './styles.module.scss';

const TONE_ICONS = {
  info: <LuInfo size={16} />,
  warning: <LuTriangleAlert size={16} />,
};

/** Highlighted "important to know" block — rules, prerequisites, limits — placed above the content it explains. */
const Notice = ({ title, children, tone = 'info', icon, className }: INoticeProps) => (
  <aside className={cn(styles.root, styles[tone], className)}>
    <span className={styles.icon} aria-hidden>{icon ?? TONE_ICONS[tone]}</span>
    <div className={styles.text}>
      <p className={styles.title}>{title}</p>
      {children && <div className={styles.body}>{children}</div>}
    </div>
  </aside>
);

export default Notice;
