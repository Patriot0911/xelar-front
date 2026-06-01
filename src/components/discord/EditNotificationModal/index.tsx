'use client';

import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Modal from '@/components/ui/Modal';
import FormInput from '@/components/ui/FormInput';
import FormSelect from '@/components/ui/FormSelect';
import { ISelectOption } from '@/components/ui/FormSelect/context';
import Button from '@/components/ui/buttons/Button';
import { NotificationCostType, COST_TYPE_LABELS, TWITCH_EVENT_LABELS, TwitchStreamerEvent } from '@/lib/constants/notifications';
import useUpdateDiscordNotificationMutation from '@/hooks/mutations/discord/useUpdateDiscordNotificationMutation';
import useUpdateWebhookNotificationMutation from '@/hooks/mutations/discord/useUpdateWebhookNotificationMutation';
import PayloadSection from '../AddNotificationModal/PayloadSection';
import { editNotificationSchema, TEditNotificationForm } from './edit-notification.scheme';
import { EDIT_DEFAULT_VALUES, parsePayloadToFormValues } from './payload-parse';
import type { IEditNotificationModalProps } from './EditNotificationModal';
import styles from './styles.module.scss';

const COST_TYPE_OPTIONS: ISelectOption[] = Object.values(NotificationCostType).map((v) => ({
  value: v,
  label: COST_TYPE_LABELS[v],
}));

const EditNotificationModal = ({ type, notification, guildId, isOpen, onClose }: IEditNotificationModalProps) => {
  const botMutation     = useUpdateDiscordNotificationMutation();
  const webhookMutation = useUpdateWebhookNotificationMutation();

  const buildDefaults = (): TEditNotificationForm => ({
    ...EDIT_DEFAULT_VALUES,
    costType:  notification.costType as NotificationCostType,
    channelId: type === 'bot' ? (notification as any).channelId ?? '' : '',
    webhookUrl: '',
    ...parsePayloadToFormValues(notification.messagePayload),
  });

  const methods = useForm<TEditNotificationForm>({
    resolver: zodResolver(editNotificationSchema),
    mode: 'onTouched',
    reValidateMode: 'onChange',
    defaultValues: buildDefaults(),
  });

  const isPending = botMutation.isPending || webhookMutation.isPending;
  const isSuccess = botMutation.isSuccess  || webhookMutation.isSuccess;

  useEffect(() => {
    if (isOpen) {
      methods.reset(buildDefaults());
      botMutation.reset();
      webhookMutation.reset();
    }
  }, [isOpen, notification.id]);

  useEffect(() => {
    if (isSuccess) onClose();
  }, [isSuccess]);

  const handleSubmit = (data: TEditNotificationForm) => {
    const payload: Record<string, unknown> = {};

    if (data.content?.trim()) payload.content = data.content.trim();

    if (type === 'webhook') {
      if (data.username?.trim())  payload.username   = data.username.trim();
      if (data.avatarUrl?.trim()) payload.avatar_url = data.avatarUrl.trim();
    }

    if (data.embedEnabled) {
      const embed: Record<string, unknown> = {};
      if (data.embedTitle?.trim())       embed.title       = data.embedTitle.trim();
      if (data.embedDescription?.trim()) embed.description = data.embedDescription.trim();
      if (data.embedColorEnabled && data.embedColor) {
        embed.color = parseInt(data.embedColor.replace('#', ''), 16);
      }
      if (data.embedUrl?.trim())          embed.url       = data.embedUrl.trim();
      if (data.embedThumbnailUrl?.trim()) embed.thumbnail = { url: data.embedThumbnailUrl.trim() };
      if (data.embedImageUrl?.trim())     embed.image     = { url: data.embedImageUrl.trim() };
      if (data.embedFooterText?.trim())   embed.footer    = { text: data.embedFooterText.trim() };
      if (data.embedFields.length > 0) {
        embed.fields = data.embedFields.map((f) => ({ name: f.name, value: f.value, inline: f.inline }));
      }
      payload.embeds = [embed];
    }

    if (type === 'bot') {
      botMutation.mutate({
        id: notification.id,
        data: {
          costType:  data.costType,
          channelId: data.channelId?.trim() || undefined,
          payload,
        },
      });
    } else {
      webhookMutation.mutate({
        id: notification.id,
        data: {
          costType:   data.costType,
          webhookUrl: data.webhookUrl?.trim() || undefined,
          payload,
        },
      });
    }
  };

  const streamer  = notification.streamerEvent?.streamer?.displayName ?? '—';
  const eventLabel = TWITCH_EVENT_LABELS[notification.streamerEvent?.event as TwitchStreamerEvent] ?? notification.streamerEvent?.event ?? '—';

  return (
    <Modal isOpen={isOpen} onClose={onClose} isLoading={isPending}>
      <Modal.ModalHeader
        category="Notifications · Discord · Server"
        title="Edit Notification"
        description={`${streamer} · ${eventLabel}`}
      />

      <FormProvider {...methods}>
        <Modal.ModalBody className={styles.scrollableBody}>

          <FormSelect<TEditNotificationForm, ISelectOption>
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

          {type === 'bot' ? (
            <FormInput<TEditNotificationForm>
              name="channelId"
              label="Channel ID"
              placeholder="Channel ID"
              hint="Leave blank to keep the current channel."
              hideErrorMessage
            />
          ) : (
            <FormInput<TEditNotificationForm>
              name="webhookUrl"
              label="Webhook URL"
              placeholder="Leave blank to keep the current webhook URL"
              hint="Enter a new Discord webhook URL to replace the existing one."
              hideErrorMessage
            />
          )}

          <PayloadSection notificationType={type} />

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
            Save Changes
          </Button>
        </Modal.ModalFooter>
      </FormProvider>
    </Modal>
  );
};

export default EditNotificationModal;
