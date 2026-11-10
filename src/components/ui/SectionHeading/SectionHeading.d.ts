import { ReactNode } from 'react';

export type SectionHeadingAlign = 'left' | 'center';

export interface ISectionHeadingProps {
  id?: string;
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: SectionHeadingAlign;
  as?: 'h1' | 'h2' | 'h3';
  className?: string;
};
