import { ReactNode } from 'react';

export interface IListToolbarProps {
  /** Filters / tabs, left-aligned. */
  start?: ReactNode;
  /** Search and other controls, right-aligned. */
  end?: ReactNode;
  className?: string;
};
