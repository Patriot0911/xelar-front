import PageHeader from '@/components/ui/PageHeader';
import ExternalButton from '@/components/ui/buttons/ExternalButton';
import TwitchAppsTable from '@/components/twitch-apps/TwitchAppsTable';
import AddTwitchApp from '@/components/twitch-apps/AddTwitchApp';
import PageContent from '@/components/ui/PageContent';
import PermissionGuard from '@/components/common/PermissionGuard';
import { Permission } from '@/lib/constants/permissions';

import styles from './page.module.scss';

export default function TwitchAppsPage() {
  return (
    <PermissionGuard requiredPermissions={[Permission.READ_APPS, Permission.MANAGE_APPS]}>
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
    </PermissionGuard>
  );
}
