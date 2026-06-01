'use client';

import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SiDiscord } from 'react-icons/si';
import Modal from '@/components/ui/Modal';
import FormInput from '@/components/ui/FormInput';
import FormSelect from '@/components/ui/FormSelect';
import { ISelectOption } from '@/components/ui/FormSelect/context';
import Button from '@/components/ui/buttons/Button';
import {
  TwitchStreamerEvent,
  TWITCH_EVENT_LABELS,
  NotificationCostType,
  COST_TYPE_LABELS,
} from '@/lib/constants/notifications';
import useCreateDiscordNotificationMutation from '@/hooks/mutations/discord/useCreateDiscordNotificationMutation';
import useCreateWebhookNotificationMutation from '@/hooks/mutations/discord/useCreateWebhookNotificationMutation';
import { addNotificationSchema, TAddNotificationForm } from './add-notification.scheme';
import StreamerSearchField from './StreamerSearchField';
import ChannelSearchField from './ChannelSearchField';
import type { IAddNotificationModalProps } from './AddNotificationModal';
import styles from './styles.module.scss';

const EVENT_OPTIONS: ISelectOption[] = Object.values(TwitchStreamerEvent).map((v) => ({
  value: v,
  label: TWITCH_EVENT_LABELS[v],
}));

const COST_TYPE_OPTIONS: ISelectOption[] = Object.values(NotificationCostType).map((v) => ({
  value: v,
  label: COST_TYPE_LABELS[v],
}));

const AddNotificationModal = ({ guildId, isOpen, onClose }: IAddNotificationModalProps) => {
  const botMutation = useCreateDiscordNotificationMutation();
  const webhookMutation = useCreateWebhookNotificationMutation();

  const methods = useForm<TAddNotificationForm>({
    resolver: zodResolver(addNotificationSchema),
    mode: 'onTouched',
    reValidateMode: 'onChange',
    defaultValues: {
      type: 'bot',
      event: TwitchStreamerEvent.STREAM_ONLINE,
      costType: NotificationCostType.Personal,
    },
  });

  const activeType = methods.watch('type');
  const isPending = botMutation.isPending || webhookMutation.isPending;
  const isSuccess = botMutation.isSuccess || webhookMutation.isSuccess;

  useEffect(() => {
    if (!isOpen) {
      botMutation.reset();
      webhookMutation.reset();
      methods.reset({
        type: 'bot',
        event: TwitchStreamerEvent.STREAM_ONLINE,
        costType: NotificationCostType.Personal,
      });
    }
  }, [isOpen]);

  useEffect(() => {
    if (isSuccess) onClose();
  }, [isSuccess]);

  const handleSubmit = (data: TAddNotificationForm) => {
    if (data.type === 'bot') {
      botMutation.mutate({
        broadcasterId: data.broadcasterId,
        event: data.event,
        costType: data.costType,
        payload: {},
        guildId,
        channelId: data.channelId!,
      });
    } else {
      webhookMutation.mutate({
        guildId,
        data: {
          broadcasterId: data.broadcasterId,
          event: data.event,
          costType: data.costType,
          payload: {},
          webhookUrl: data.webhookUrl!,
        },
      });
    }
  };

  const switchType = (type: 'bot' | 'webhook') => {
    methods.setValue('type', type, { shouldValidate: false });
    methods.clearErrors(['channelId', 'webhookUrl']);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isLoading={isPending}>
      <Modal.ModalHeader
        category="Notifications · Discord · Server"
        title="Add Notification"
        description="Subscribe to a Twitch streamer event and deliver it to a Discord channel or webhook."
      />

      <FormProvider {...methods}>
        <Modal.ModalBody>

          <div className={styles.typeTabs}>
            <button
              type="button"
              className={`${styles.typeTab} ${activeType === 'bot' ? styles.typeTabActive : ''}`}
              onClick={() => switchType('bot')}
            >
              <SiDiscord size={13} />
              Discord Bot
            </button>
            <button
              type="button"
              className={`${styles.typeTab} ${activeType === 'webhook' ? styles.typeTabActive : ''}`}
              onClick={() => switchType('webhook')}
            >
              Webhook
            </button>
          </div>

          <StreamerSearchField />

          <FormSelect<TAddNotificationForm, ISelectOption>
            name="event"
            label="Event"
            required
            hideErrorMessage
            hint="The Twitch event that will trigger the notification."
            options={EVENT_OPTIONS}
          >
            <FormSelect.Selected>
              {(item) => <span>{item.label}</span>}
            </FormSelect.Selected>
            <FormSelect.Area>
              <FormSelect.Option>
                {(item) => <span>{item.label}</span>}
              </FormSelect.Option>
            </FormSelect.Area>
          </FormSelect>

          <FormSelect<TAddNotificationForm, ISelectOption>
            name="costType"
            label="Cost Type"
            required
            hideErrorMessage
            hint="Determines which balance is charged for each event delivery."
            options={COST_TYPE_OPTIONS}
          >
            <FormSelect.Selected>
              {(item) => <span>{item.label}</span>}
            </FormSelect.Selected>
            <FormSelect.Area>
              <FormSelect.Option>
                {(item) => <span>{item.label}</span>}
              </FormSelect.Option>
            </FormSelect.Area>
          </FormSelect>

          {activeType === 'bot' ? (
            <ChannelSearchField guildId={guildId} />
          ) : (
            <FormInput<TAddNotificationForm>
              name="webhookUrl"
              label="Webhook URL"
              required
              placeholder="https://discord.com/api/webhooks/..."
              hint="Discord webhook URL that will receive the event payload."
              hideErrorMessage
            />
          )}

        </Modal.ModalBody>

        <Modal.ModalFooter>
          <Button type="button" variant="secondary" onClick={onClose} disabled={isPending}>
            Cancel
          </Button>
          <Button
            type="button"
            onClick={methods.handleSubmit(handleSubmit)}
            disabled={isPending || isSuccess}
            isLoading={isPending}
          >
            Add Notification
          </Button>
        </Modal.ModalFooter>
      </FormProvider>
    </Modal>
  );
};

export default AddNotificationModal;
