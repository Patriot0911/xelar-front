import { PropsWithChildren } from 'react';
import { Transition } from 'framer-motion';

export interface IAnimatedHeightProps extends PropsWithChildren {
  transition?: Transition;
  className?: string;
};
