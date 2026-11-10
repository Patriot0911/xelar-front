import XelarLogo from '@/components/ui/logos/XelarLogo';
import { WELCOME_NAV_LINKS } from '@/lib/constants/welcome';

import styles from './styles.module.scss';

const WelcomeFooter = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <XelarLogo responsive={false} />
        <nav aria-label="Footer" className={styles.links}>
          {WELCOME_NAV_LINKS.map(({ href, label }) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </nav>
        <span className={styles.copy}>© {new Date().getFullYear()} Xelar</span>
      </div>
    </footer>
  );
}

export default WelcomeFooter;
