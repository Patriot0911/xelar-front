'use client';

import { useState } from 'react';
import TwitchSubscriptionsTable from '../TwitchSubscriptionsTable';
import RawTwitchSubscriptionsTable from '../RawTwitchSubscriptionsTable';
import styles from './styles.module.scss';

type Tab = 'local' | 'raw';

const TwitchSubscriptionsView = () => {
  const [activeTab, setActiveTab] = useState<Tab>('local');

  return (
    <div className={styles.root}>
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === 'local' ? styles.active : ''}`}
          onClick={() => setActiveTab('local')}
        >
          Local Subscriptions
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'raw' ? styles.active : ''}`}
          onClick={() => setActiveTab('raw')}
        >
          Twitch Raw
        </button>
      </div>

      <div className={styles.content}>
        {activeTab === 'local'
          ? <TwitchSubscriptionsTable />
          : <RawTwitchSubscriptionsTable />
        }
      </div>
    </div>
  );
};

export default TwitchSubscriptionsView;
