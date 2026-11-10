import { Transition, Variants } from 'framer-motion';

export type AuthMode = 'sign-in' | 'sign-up';

// Tabs order — used to derive the slide direction.
export const AUTH_MODE_ORDER: Record<AuthMode, number> = {
  'sign-in': 0,
  'sign-up': 1,
};

// 1 — moving to a tab on the right, -1 — to a tab on the left.
export type AuthSlideDirection = 1 | -1;

export const AUTH_EASE = [0.2, 0.7, 0.2, 1] as const;

export const AUTH_TOGGLE_TRANSITION: Transition = {
  type: 'spring',
  stiffness: 420,
  damping: 34,
};

export const authHeadlineVariants: Variants = {
  enter: (direction: AuthSlideDirection) => ({ opacity: 0, y: 8 * direction, filter: 'blur(4px)' }),
  center: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.28, ease: AUTH_EASE } },
  exit: (direction: AuthSlideDirection) => ({
    opacity: 0,
    y: -8 * direction,
    filter: 'blur(4px)',
    transition: { duration: 0.16, ease: 'easeIn' },
  }),
};

export const authFormVariants: Variants = {
  enter: (direction: AuthSlideDirection) => ({ opacity: 0, x: 24 * direction }),
  center: { opacity: 1, x: 0, transition: { duration: 0.3, ease: AUTH_EASE } },
  exit: (direction: AuthSlideDirection) => ({
    opacity: 0,
    x: -24 * direction,
    transition: { duration: 0.18, ease: 'easeIn' },
  }),
};

export const authLabelVariants: Variants = {
  enter: { opacity: 0, y: 6 },
  center: { opacity: 1, y: 0, transition: { duration: 0.22, ease: AUTH_EASE } },
  exit: { opacity: 0, y: -6, transition: { duration: 0.12, ease: 'easeIn' } },
};
