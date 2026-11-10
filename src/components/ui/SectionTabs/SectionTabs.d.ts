import { IconType } from 'react-icons';

export interface ISectionTabItem<T extends string> {
  key: T;
  label: string;
  icon?: IconType;
};

export interface ISectionTabsProps<T extends string> {
  items: ISectionTabItem<T>[];
  value: T;
  onChange: (value: T) => void;
  /** Accessible name of the tab list, e.g. "Server sections". */
  label: string;
  className?: string;
};
