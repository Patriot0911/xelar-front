'use client';

import { Cell, Pie, PieChart, Tooltip } from 'recharts';
import useNotificationSplitQuery from '@/hooks/queries/statistics/useNotificationSplitQuery';

import styles from './styles.module.scss';

const DISCORD_COLOR = '#5865f2';
const WEBHOOK_COLOR = 'var(--accent-2)';

const NotificationSplitCard = () => {
  const { data, isLoading } = useNotificationSplitQuery();

  const total = (data?.discord ?? 0) + (data?.webhook ?? 0);
  const isEmpty = !isLoading && total === 0;

  const chartData = [
    { name: 'Discord', value: data?.discord ?? 0, color: DISCORD_COLOR },
    { name: 'Webhook', value: data?.webhook ?? 0, color: WEBHOOK_COLOR },
  ];

  const pct = (n: number) =>
    total > 0 ? `${Math.round((n / total) * 100)}%` : '—';

  return (
    <div className={styles.card}>
      <div className={styles.title}>Notification Type Split</div>

      {isLoading && <div className={styles.placeholder}>Loading…</div>}
      {isEmpty && <div className={styles.placeholder}>No data yet</div>}

      {!isLoading && !isEmpty && (
        <div className={styles.inner}>
          <div className={styles.chart}>
            <PieChart width={130} height={130}>
              <Pie
                data={chartData}
                cx={60}
                cy={60}
                innerRadius={38}
                outerRadius={58}
                dataKey="value"
                strokeWidth={0}
              >
                {chartData.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: 'var(--panel)',
                  border: '1px solid var(--line)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: 12,
                }}
              />
            </PieChart>
          </div>

          <div className={styles.legend}>
            <div className={styles.legendItem}>
              <div className={styles.legendLeft}>
                <span className={`${styles.dot} ${styles.dotDiscord}`} />
                <span className={styles.legendLabel}>Discord</span>
              </div>
              <div className={styles.legendValues}>
                <span className={styles.legendCount}>{data?.discord.toLocaleString()}</span>
                <span className={styles.legendPct}>{pct(data?.discord ?? 0)}</span>
              </div>
            </div>

            <div className={styles.legendItem}>
              <div className={styles.legendLeft}>
                <span className={`${styles.dot} ${styles.dotWebhook}`} />
                <span className={styles.legendLabel}>Webhook</span>
              </div>
              <div className={styles.legendValues}>
                <span className={styles.legendCount}>{data?.webhook.toLocaleString()}</span>
                <span className={styles.legendPct}>{pct(data?.webhook ?? 0)}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationSplitCard;
