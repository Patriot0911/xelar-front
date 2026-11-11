import { ReactNode } from 'react';

export type NoticeTone = 'info' | 'warning';

export interface INoticeProps {
  title: ReactNode;
  /** Body: a sentence or a short list. */
  children?: ReactNode;
  tone?: NoticeTone;
  /** Replaces the tone's default icon. */
  icon?: ReactNode;
  className?: string;
};
