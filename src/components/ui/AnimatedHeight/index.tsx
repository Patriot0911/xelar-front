'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { IAnimatedHeightProps } from './AnimatedHeight';

import styles from './styles.module.scss';

const DEFAULT_TRANSITION = { duration: 0.32, ease: [0.2, 0.7, 0.2, 1] } as const;

// Smoothly animates its own height whenever the content height changes.
const AnimatedHeight = ({ children, transition = DEFAULT_TRANSITION, className }: IAnimatedHeightProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | 'auto'>('auto');
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const node = contentRef.current;

    if (!node) {
      return;
    }

    const observer = new ResizeObserver(([entry]) => {
      setHeight(entry.borderBoxSize?.[0]?.blockSize ?? entry.target.getBoundingClientRect().height);
    });

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      className={cn(styles.root, isAnimating && styles.animating, className)}
      initial={false}
      animate={{ height }}
      transition={transition}
      onAnimationStart={() => setIsAnimating(true)}
      onAnimationComplete={() => setIsAnimating(false)}
    >
      <div ref={contentRef}>{children}</div>
    </motion.div>
  );
}

export default AnimatedHeight;
