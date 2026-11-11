import { CSSProperties } from 'react';
import { INavItemIconProps } from './NavItemIcon';

import styles from './styles.module.scss';

/** Leading visual of a nav link: the item's icon, or its image (server logo / initials). */
const NavItemIcon = ({ item, size = 16 }: INavItemIconProps) => {
  if (item.icon) {
    const Icon = item.icon;
    return <Icon size={size} aria-hidden />;
  }

  const style = { '--nav-image-size': `${size + 2}px` } as CSSProperties;

  return item.image.url ? (
    <img src={item.image.url} alt="" className={styles.image} style={style} loading="lazy" />
  ) : (
    <span className={styles.fallback} style={style} aria-hidden>{item.image.fallback}</span>
  );
};

export default NavItemIcon;
