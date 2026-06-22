import { PropsWithChildren, ReactNode } from 'react';
import AuthBgEffects from '../AuthBgEffects';
import AuthVisual from '../AuthVisual';

import styles from './styles.module.scss';

function AuthWrapper({ children }: PropsWithChildren) {
  return (
    <div className={styles.page}>
      <AuthBgEffects />
      {children}
      <AuthVisual />
    </div>
  );
}

interface ContentProps extends PropsWithChildren {
  footer?: ReactNode;
}

function Content({ children, footer }: ContentProps) {
  return (
    <div className={styles.panel}>
      <div className={styles.panelBody}>
        {children}
      </div>
      {footer && (
        <div className={styles.panelFoot}>
          {footer}
        </div>
      )}
    </div>
  );
}

function DiscordHeadline() {
  return (
    <>
      <h1 className={styles.headline}>
        Wire your first{' '}
        <span className={styles.grad}>bridge.</span>
      </h1>
      <p className={styles.sub}>
        Connect Discord to start routing stream events. Your bridges run quietly — you just show up when it matters.
      </p>
    </>
  );
}

AuthWrapper.DiscordHeadline = DiscordHeadline;
AuthWrapper.Content = Content;

export { AuthWrapper };
