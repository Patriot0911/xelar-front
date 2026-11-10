import LinkButton from '@/components/ui/buttons/LinkButton';
import ErrorState from '@/components/ui/ErrorState';

import styles from './error.module.scss';

export default function NotFound() {
  return (
    <main className={styles.page}>
      <ErrorState
        variant="not-found"
        title="Page not found"
        description="The page you’re looking for doesn’t exist or has been moved."
        actions={<LinkButton href="/dashboard" size="sm">Go to dashboard</LinkButton>}
      />
    </main>
  );
}
