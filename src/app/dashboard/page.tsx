'use client';

import OverviewStats from '@/components/modules/overview/OverviewStats';
import WeeklyStatsChart from '@/components/modules/overview/WeeklyStatsChart';
import BottomStatsRow from '@/components/modules/overview/BottomStatsRow';
import PageHeader from '@/components/ui/PageHeader';

export default function DashboardPage() {
  return (
    <>
      <PageHeader
        eyebrow="Dashboard"
        title="Overview"
      />

      <OverviewStats />
      <WeeklyStatsChart />
      <BottomStatsRow />
    </>
  );
}
