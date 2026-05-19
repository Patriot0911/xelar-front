'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { LuCheck, LuX, LuArrowLeft } from 'react-icons/lu';
import styles from './page.module.scss';
import { useAppDispatch } from '@/hooks/redux';
import useDiscordCodeMutation from '@/hooks/mutations/auth/useDiscordCodeMutation';

type Status = 'loading' | 'success' | 'error';

export function DiscordCallbackContent() {
  const redirectTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const discordCodeMutation = useDiscordCodeMutation();

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
      setErrorMsg(error === 'access_denied' ? 'Access denied by Discord.' : 'Missing authorization code.');
      return;
    }

    discordCodeMutation.mutate(code);

  }, [searchParams, dispatch, router]);

  useEffect(() => {
    if (discordCodeMutation.isPending || discordCodeMutation.isIdle) {
      return;
    }

    if (discordCodeMutation.isError) {
      setStatus('error');
      setErrorMsg(
        discordCodeMutation.error?.message ?? 'Internal server error. Please try again later'
      );
      return;
    }

    if (discordCodeMutation.isSuccess) {
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
  }, [discordCodeMutation.status]);

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
              <p className={styles.title}>Connecting Discord…</p>
              <p className={styles.sub}>Verifying your account, hold on.</p>
            </div>
          </div>
        )}

        {status === 'success' && (
          <div className={styles.success}>
            <div className={styles.checkCircle}>
              <LuCheck size={30} />
            </div>
            <p className={styles.title}>You&apos;re in!</p>
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
            <a href="/auth" className={styles.retryLink}>
              <LuArrowLeft size={14} />
              Back to sign in
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
