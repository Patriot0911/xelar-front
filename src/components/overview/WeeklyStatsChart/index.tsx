'use client';

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import useDailyStatsQuery from '@/hooks/queries/statistics/useDailyStatsQuery';

import Loading from '@/components/ui/Loading';
import styles from './styles.module.scss';

const formatDay = (date: string) => new Date(date).toLocaleDateString('en-US', { weekday: 'short' });

const WeeklyStatsChart = () => {
  const { data, isLoading } = useDailyStatsQuery();

  const chartData = (data ?? []).map((item) => ({
    day: formatDay(item.date),
    total: item.total,
    successful: item.successful,
  }));

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.title}>Notifications, last 7 days</span>
      </div>

      <div className={styles.chart}>
        {isLoading ? (
          <div className={styles.placeholder}><Loading size="sm" /></div>
        ) : (
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={chartData} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
              <defs>
                <linearGradient id="totalGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--status-ok)" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="var(--status-ok)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--line)" vertical={false} />
              <XAxis
                dataKey="day"
                stroke="var(--ink-2)"
                tick={{ fill: 'var(--ink-2)', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                allowDecimals={false}
                stroke="var(--ink-2)"
                tick={{ fill: 'var(--ink-2)', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                width={32}
              />
              <Tooltip
                contentStyle={{
                  background: 'var(--panel)',
                  border: '1px solid var(--line)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: 12,
                }}
                labelStyle={{ color: 'var(--ink-0)' }}
              />
              <Area
                type="monotone"
                dataKey="total"
                name="Total Notifications"
                stroke="var(--status-ok)"
                fill="url(#totalGradient)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default WeeklyStatsChart;
