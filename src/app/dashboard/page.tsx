'use client';

import OverviewStats from '@/components/modules/overview/OverviewStats';
import PageHeader from '@/components/ui/PageHeader';

export default function DashboardPage() {
  return (
    <>
      <PageHeader
        eyebrow="Dashboard"
        title="Overview"
      />

      <OverviewStats />
    </>
  );
}
