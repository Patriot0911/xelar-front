import PageHeader from '@/components/ui/PageHeader';
import ExternalButton from '@/components/ui/buttons/ExternalButton';
import TwitchAppsTable from '@/components/twitch-apps/TwitchAppsTable';
import AddTwitchApp from '@/components/twitch-apps/AddTwitchApp';
import PageContent from '@/components/ui/PageContent';

import styles from './page.module.scss';

export default function TwitchAppsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Integration · Twitch · App"
        title="Twitch Apps"
      >
        <div className={styles.pageHeadRight}>
          <AddTwitchApp />
          <ExternalButton
            href={'https://dev.twitch.tv/console/apps'}
            label={'Twitch Dev Console'}
          />
        </div>
      </PageHeader>
      <PageContent>
        <TwitchAppsTable />
      </PageContent>
    </>
  );
}
