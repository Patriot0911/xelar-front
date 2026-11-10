import Link from 'next/link';
import XelarLogo from '@/components/ui/logos/XelarLogo';
import { WELCOME_NAV_LINKS } from '@/lib/constants/welcome';
import WelcomeCtaLink from '../WelcomeCtaLink';

import styles from './styles.module.scss';

const WelcomeHeader = () => {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" aria-label="Xelar home" className={styles.logo}>
          <XelarLogo responsive={false} />
        </Link>

        <nav aria-label="Primary" className={styles.nav}>
          {WELCOME_NAV_LINKS.map(({ href, label }) => (
            <a key={href} href={href} className={styles.navLink}>{label}</a>
          ))}
        </nav>

        <WelcomeCtaLink size="sm" guestLabel="Sign in" />
      </div>
    </header>
  );
}

export default WelcomeHeader;
