'use client';

import OverviewStats from '@/components/overview/OverviewStats';
import WeeklyStatsChart from '@/components/overview/WeeklyStatsChart';
import BottomStatsRow from '@/components/overview/BottomStatsRow';
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
