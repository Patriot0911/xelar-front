import { NavItem } from '@/components/dashboard/nav-data';

export interface INavItemIconProps {
  item: NavItem;
  /** Icon size in px; an image takes the same box (+2px, so logos don't look smaller than glyphs). */
  size?: number;
};
