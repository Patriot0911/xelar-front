'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { LuCheck, LuX, LuArrowLeft } from 'react-icons/lu';
import styles from './page.module.scss';
import useLinkTwitchMutation from '@/hooks/mutations/auth/useLinkTwitchMutation';

type Status = 'loading' | 'success' | 'error';

export function TwitchCallbackContent() {
  const redirectTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const linkTwitchMutation = useLinkTwitchMutation();

  const [status, setStatus] = useState<Status>('loading');
  const [errorMsg, setErrorMsg] = useState('');
  const called = useRef(false);

  useEffect(() => {
    if (called.current) return;
    called.current = true;

    const code = searchParams.get('code');
    const error = searchParams.get('error');

    if (error || !code) {
      setStatus('error');
      setErrorMsg(error === 'access_denied' ? 'Access denied by Twitch.' : 'Missing authorization code.');
      return;
    }

    linkTwitchMutation.mutate(code);
  }, [searchParams]);

  useEffect(() => {
    if (linkTwitchMutation.isPending || linkTwitchMutation.isIdle) return;

    if (linkTwitchMutation.isError) {
      setStatus('error');
      setErrorMsg(linkTwitchMutation.error?.message ?? 'Internal server error. Please try again later');
      return;
    }

    if (linkTwitchMutation.isSuccess) {
      setStatus('success');

      redirectTimer.current = setTimeout(
        () => router.replace('/dashboard'), 1500
      );

      return () => {
        if (redirectTimer.current) {
          clearTimeout(redirectTimer.current);
          redirectTimer.current = null;
        }
      };
    }
  }, [linkTwitchMutation.status]);

  return (
    <div className={styles.page}>
      <div className={styles.bgAura} aria-hidden="true">
        <div className={styles.aura} />
        <div className={styles.aura} />
      </div>

      <div className={styles.card}>
        {status === 'loading' && (
          <div className={styles.loading}>
            <div className={styles.spinner} />
            <div>
              <p className={styles.title}>Linking Twitch…</p>
              <p className={styles.sub}>Verifying your account, hold on.</p>
            </div>
          </div>
        )}

        {status === 'success' && (
          <div className={styles.success}>
            <div className={styles.checkCircle}>
              <LuCheck size={30} />
            </div>
            <p className={styles.title}>Twitch connected!</p>
            <p className={styles.sub}>Redirecting to your dashboard…</p>
          </div>
        )}

        {status === 'error' && (
          <div className={styles.error}>
            <div className={styles.errorIcon}>
              <LuX size={26} />
            </div>
            <p className={styles.title}>Something went wrong</p>
            <p className={styles.sub}>{errorMsg}</p>
            <a href="/dashboard" className={styles.retryLink}>
              <LuArrowLeft size={14} />
              Back to dashboard
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
