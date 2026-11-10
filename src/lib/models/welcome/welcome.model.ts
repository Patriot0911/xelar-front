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

export interface IRoadmapFeature {
  id: string;
  label: string;
  /** Falls back to the release status when omitted. */
  status?: RoadmapStatus;
};

export interface IRoadmapRelease {
  id: string;
  version: string;
  title: string;
  summary: string;
  status: RoadmapStatus;
  features: IRoadmapFeature[];
};

export interface IWelcomeNavLink {
  href: `#${string}`;
  label: string;
};
