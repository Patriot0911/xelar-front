'use client';

import { useEffect, useState } from 'react';
import { LuExternalLink, LuPlus } from 'react-icons/lu';
import styles from './page.module.scss';
import PageHeader from '@/components/ui/PageHeader';
import TwitchAppModal from '@/components/twitch-apps/TwitchAppModal';
import useTwitchAppsQuery from '@/hooks/queries/twitch/useTwitchAppsQuery';
import ExternalButton from '@/components/ui/buttons/ExternalButton';
import Button from '@/components/ui/buttons/Button';

export default function TwitchAppsPage() {
  const [isOpenAppModal, setIsOpenAppModal] = useState(false);
  const { data, } = useTwitchAppsQuery();
  useEffect(
    () => {
      console.log({ apps: data })
    }, [data]
  );
  return (
    <>
      <TwitchAppModal
        isOpen={isOpenAppModal}
        onClose={() => setIsOpenAppModal(false)}
      />
      <PageHeader
        eyebrow="Integration · Twitch"
        title="Twitch Apps"
      >
        <div className={styles.pageHeadRight}>
          <Button onClick={() => setIsOpenAppModal(true)}>
            <LuPlus size={16} />
            Add App
          </Button>
          <ExternalButton
            href={'https://dev.twitch.tv/console/apps'}
            label={'Twitch Dev Console'}
          />
        </div>
      </PageHeader>
    </>
  );
}
