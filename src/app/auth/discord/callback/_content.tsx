'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { LuCheck, LuX, LuArrowLeft } from 'react-icons/lu';
import { useAppDispatch } from '@/store/hooks';
import { setAuth } from '@/store/slices/auth.slice';
import { authApi } from '@/lib/api/auth.api';
import { Logo } from '@/components/common/logo';
import styles from './page.module.scss';

type Status = 'loading' | 'success' | 'error';

export function DiscordCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();

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

    authApi
      .discordCallback(code)
      .then((data) => {
        dispatch(setAuth({ user: data.user, tokens: data.tokens }));
        setStatus('success');
        setTimeout(() => router.replace('/dashboard'), 1500);
      })
      .catch((err) => {
        setStatus('error');
        setErrorMsg(err?.response?.data?.message ?? 'Authentication failed. Please try again.');
      });
  }, [searchParams, dispatch, router]);

  return (
    <div className={styles.page}>
      <div className={styles.bgAura} aria-hidden="true">
        <div className={styles.aura} />
        <div className={styles.aura} />
      </div>

      <div className={styles.card}>
        <Logo size={28} className={styles.logo} />

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
