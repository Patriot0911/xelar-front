import { IRoadmapRelease } from '@/lib/models/welcome';

import { RoadmapStatus } from '@/lib/models/welcome';

export interface IRoadmapReleaseProps extends Omit<IRoadmapRelease, 'id'> {
  /** Status of the following release — a finished release's track blends into its colour. */
  nextStatus?: RoadmapStatus;
};
