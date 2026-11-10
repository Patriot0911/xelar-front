'use client';

import OverviewStats from '@/components/overview/OverviewStats';
import WeeklyStatsChart from '@/components/overview/WeeklyStatsChart';
import BottomStatsRow from '@/components/overview/BottomStatsRow';
import PageHeader from '@/components/ui/PageHeader';
import AsyncBoundary from '@/components/common/AsyncBoundary';

export default function DashboardPage() {
  return (
    <>
      <PageHeader
        eyebrow="Dashboard"
        title="Overview"
      />

      {/* Independent widgets: one failing endpoint must not blank the whole overview. */}
      <AsyncBoundary compact loading={null}>
        <OverviewStats />
      </AsyncBoundary>
      <AsyncBoundary compact loading={null}>
        <WeeklyStatsChart />
      </AsyncBoundary>
      <AsyncBoundary compact loading={null}>
        <BottomStatsRow />
      </AsyncBoundary>
    </>
  );
}
