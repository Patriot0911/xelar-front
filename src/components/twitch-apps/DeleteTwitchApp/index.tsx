import ConfirmModal from '@/components/common/ConfirmModal';
import useDeleteAppMutation from '@/hooks/mutations/twitch-apps/useDeleteAppMutation';
import { IDeleteTwitchAppProps } from './DeleteTwitchApp';
import { useEffect } from 'react';

const DeleteTwitchApp = ({ isOpen, appId, onClose, }: IDeleteTwitchAppProps) => {
  const deleteTwitchAppMutation = useDeleteAppMutation();

  const deleteApp = () => {
    if (!appId) return;
    deleteTwitchAppMutation.mutate(appId);
  }

  useEffect(() => {
    if (!deleteTwitchAppMutation.isSuccess) return;
    onClose();
  }, [deleteTwitchAppMutation.isSuccess]);

  return (
    <ConfirmModal
      title={'Delete Twitch App'}
      isLoading={deleteTwitchAppMutation.isPending}
      description={'Are you sure you want to delete twitch app? All created notifications and subscriptions will be deleted as well.'}
      isOpen={isOpen}
      onCancel={onClose}
      onClose={onClose}
      onConfirm={deleteApp}
    />
  );
}

export default DeleteTwitchApp;
