import { AuthWrapper } from '@/components/modules/auth/AuthWrapper';
import { AuthDiscordPageContent } from './_content';

export default function AuthDiscordPage() {
  return (
    <AuthWrapper>
      <AuthWrapper.Content>
        <AuthWrapper.DiscordHeadline />
        <AuthDiscordPageContent />
      </AuthWrapper.Content>
    </AuthWrapper>
  );
}
