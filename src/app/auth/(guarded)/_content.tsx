'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import FormInput from '@/components/ui/FormInput';
import DiscordButton from '@/components/ui/buttons/DiscordButton';
import Button from '@/components/ui/buttons/Button';
import { AuthWrapper } from '@/components/auth/AuthWrapper';
import { LuArrowRight, LuEye, LuEyeOff } from 'react-icons/lu';
import { TSignInForm, TSignUpForm, signInSchema, signUpSchema } from './auth.scheme';
import useLoginByEmailMutation from '@/hooks/mutations/auth/useLoginByEmailMutation';
import useRegisterByEmailMutation from '@/hooks/mutations/auth/useRegisterByEmailMutation';
import AnimatedHeight from '@/components/ui/AnimatedHeight';
import {
  AUTH_MODE_ORDER,
  AUTH_TOGGLE_TRANSITION,
  AuthMode,
  AuthSlideDirection,
  authFormVariants,
  authHeadlineVariants,
  authLabelVariants,
} from './auth.motion';

import styles from './styles.module.scss';

const DISCORD_AUTH_URL = `${process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001'}/api/auth/discord`;

function SignInForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const loginMutation = useLoginByEmailMutation();
  const methods = useForm<TSignInForm>({
    resolver: zodResolver(signInSchema),
    mode: 'onTouched',
    reValidateMode: 'onChange',
  });

  useEffect(() => {
    if (loginMutation.isSuccess) router.replace('/dashboard');
  }, [loginMutation.isSuccess, router]);

  return (
    <FormProvider {...methods}>
      <div className={styles.form}>
        <FormInput<TSignInForm>
          name="email"
          label="Email"
          required
          type="email"
          autoComplete="email"
          placeholder="you@your-domain.com"
          hideErrorMessage
        />
        <FormInput<TSignInForm>
          name="password"
          label="Password"
          required
          type={showPassword ? 'text' : 'password'}
          autoComplete="current-password"
          placeholder="your password"
          icon={showPassword ? <LuEyeOff size={13} /> : <LuEye size={13} />}
          onIconClick={() => setShowPassword((v) => !v)}
          hideErrorMessage
        />
        {loginMutation.isError && (
          <p className={styles.mutationError}>
            {loginMutation.error?.message ?? 'Something went wrong'}
          </p>
        )}
        <Button
          type="submit"
          className={styles.submitBtn}
          disabled={!methods.formState.isValid || loginMutation.isSuccess}
          isLoading={loginMutation.isPending}
          rightIcon={<LuArrowRight size={15} />}
          onClick={methods.handleSubmit((data) => loginMutation.mutate(data))}
        >
          Sign in
        </Button>
      </div>
    </FormProvider>
  );
}

function SignUpForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const registerMutation = useRegisterByEmailMutation();
  const methods = useForm<TSignUpForm>({
    resolver: zodResolver(signUpSchema),
    mode: 'onTouched',
    reValidateMode: 'onChange',
  });

  useEffect(() => {
    if (registerMutation.isSuccess) router.replace('/dashboard');
  }, [registerMutation.isSuccess, router]);

  return (
    <FormProvider {...methods}>
      <div className={styles.form}>
        <FormInput<TSignUpForm>
          name="displayName"
          label="Display Name"
          required
          autoComplete="name"
          placeholder="e.g. MyHero"
          hideErrorMessage
        />
        <FormInput<TSignUpForm>
          name="email"
          label="Email"
          required
          type="email"
          autoComplete="email"
          placeholder="you@your-domain.com"
          hideErrorMessage
        />
        <FormInput<TSignUpForm>
          name="password"
          label="Password"
          required
          type={showPassword ? 'text' : 'password'}
          autoComplete="new-password"
          placeholder="create a strong password"
          hint="min 8 chars"
          icon={showPassword ? <LuEyeOff size={13} /> : <LuEye size={13} />}
          onIconClick={() => setShowPassword((v) => !v)}
          hideErrorMessage
        />
        {registerMutation.isError && (
          <p className={styles.mutationError}>
            {registerMutation.error?.message ?? 'Something went wrong'}
          </p>
        )}
        <Button
          type="submit"
          className={styles.submitBtn}
          disabled={!methods.formState.isValid || registerMutation.isSuccess}
          isLoading={registerMutation.isPending}
          rightIcon={<LuArrowRight size={15} />}
          onClick={methods.handleSubmit((data) => registerMutation.mutate(data))}
        >
          Create account
        </Button>
      </div>
    </FormProvider>
  );
}

const AUTH_TABS: Array<{ mode: AuthMode; label: string }> = [
  { mode: 'sign-in', label: 'Sign in' },
  { mode: 'sign-up', label: 'Sign up' },
];

export function AuthPageContent() {
  const [{ mode, direction }, setState] = useState<{ mode: AuthMode; direction: AuthSlideDirection }>({
    mode: 'sign-up',
    direction: 1,
  });

  const setMode = (next: AuthMode) => {
    if (next === mode) {
      return;
    }
    setState({
      mode: next,
      direction: AUTH_MODE_ORDER[next] > AUTH_MODE_ORDER[mode] ? 1 : -1,
    });
  };

  const footer = (
    <>
      <div className={styles.footLinks}>
        <Link href="/terms">Terms</Link>
        <Link href="/privacy">Privacy</Link>
        <Link href="/status">Status</Link>
      </div>
      <AnimatePresence mode="wait" initial={false}>
        <motion.p
          key={mode}
          className={styles.footCta}
          variants={authLabelVariants}
          initial="enter"
          animate="center"
          exit="exit"
        >
          {mode === 'sign-up' ? (
            <>
              Have an account?{' '}
              <button className={styles.footLink} onClick={() => setMode('sign-in')}>
                Sign in
              </button>
            </>
          ) : (
            <>
              No account yet?{' '}
              <button className={styles.footLink} onClick={() => setMode('sign-up')}>
                Sign up
              </button>
            </>
          )}
        </motion.p>
      </AnimatePresence>
    </>
  );

  return (
    <MotionConfig reducedMotion="user">
      <AuthWrapper>
        <AuthWrapper.Content footer={footer}>
          <div className={styles.toggle} role="tablist" aria-label="Authentication mode">
            {AUTH_TABS.map((tab) => {
              const isActive = tab.mode === mode;

              return (
                <button
                  key={tab.mode}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={styles.toggleBtn}
                  data-active={isActive}
                  onClick={() => setMode(tab.mode)}
                >
                  {isActive && (
                    <motion.span
                      layoutId="auth-toggle-pill"
                      className={styles.togglePill}
                      transition={AUTH_TOGGLE_TRANSITION}
                    />
                  )}
                  <span className={styles.toggleLabel}>{tab.label}</span>
                </button>
              );
            })}
          </div>

          <AnimatedHeight>
            <AnimatePresence mode="wait" initial={false} custom={direction}>
              <motion.div
                key={mode}
                className={styles.heading}
                custom={direction}
                variants={authHeadlineVariants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                {mode === 'sign-up' ? (
                  <>
                    <h1 className={styles.headline}>
                      Wire your first{' '}
                      <span className={styles.grad}>bridge.</span>
                    </h1>
                    <p className={styles.sub}>
                      Pick how you want in. You don&apos;t have to stream — just follow channels you care about.
                    </p>
                  </>
                ) : (
                  <>
                    <h1 className={styles.headline}>
                      Welcome{' '}
                      <span className={styles.grad}>back.</span>
                    </h1>
                    <p className={styles.sub}>
                      Sign back in to pick up where you left off.
                    </p>
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </AnimatedHeight>

          <form method="post" action={DISCORD_AUTH_URL} style={{ width: '100%' }}>
            <DiscordButton
              type="submit"
              label={mode === 'sign-up' ? 'Sign up with Discord' : 'Sign in with Discord'}
            />
          </form>

          <div className={styles.divider}>or with email</div>

          <AnimatedHeight>
            <AnimatePresence mode="wait" initial={false} custom={direction}>
              <motion.div
                key={mode}
                custom={direction}
                variants={authFormVariants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                {mode === 'sign-in' ? <SignInForm /> : <SignUpForm />}
              </motion.div>
            </AnimatePresence>
          </AnimatedHeight>
        </AuthWrapper.Content>
      </AuthWrapper>
    </MotionConfig>
  );
}
