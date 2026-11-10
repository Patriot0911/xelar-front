import { IconType } from 'react-icons';

export interface IWelcomeStep {
  id: string;
  title: string;
  description: string;
};

export interface IWelcomeTrustPoint {
  id: string;
  icon: IconType;
  title: string;
  description: string;
};

export enum RoadmapStatus {
  Done       = 'done',
  InProgress = 'in-progress',
  Planned    = 'planned',
};

export interface IRoadmapItem {
  id: string;
  title: string;
  description: string;
  status: RoadmapStatus;
};

export interface IWelcomeNavLink {
  href: `#${string}`;
  label: string;
};
