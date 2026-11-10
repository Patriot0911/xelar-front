import { IconType } from 'react-icons';

export interface IGuildStatProps {
  icon: IconType;
  label: string;
  value: string | number;
  hint?: string;
};
