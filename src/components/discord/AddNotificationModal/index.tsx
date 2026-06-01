'use client';

import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SiDiscord } from 'react-icons/si';
import Modal from '@/components/ui/Modal';
import FormSelect from '@/components/ui/FormSelect';
import { ISelectOption } from '@/components/ui/FormSelect/context';
import Button from '@/components/ui/buttons/Button';
import FormInput from '@/components/ui/FormInput';
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
import PayloadSection from './PayloadSection';
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

const DEFAULT_VALUES: TAddNotificationForm = {
  type:              'bot',
  broadcasterId:     '',
  event:             TwitchStreamerEvent.STREAM_ONLINE,
  costType:          NotificationCostType.Personal,
  channelId:         '',
  webhookUrl:        '',
  content:           '',
  username:          '',
  avatarUrl:         '',
  embedEnabled:      false,
  embedTitle:        '',
  embedDescription:  '',
  embedColorEnabled: false,
  embedColor:        '#5865F2',
  embedUrl:          '',
  embedThumbnailUrl: '',
  embedImageUrl:     '',
  embedFooterText:   '',
  embedFields:       [],
};

const buildPayload = (data: TAddNotificationForm): Record<string, unknown> => {
  const payload: Record<string, unknown> = {};

  if (data.content?.trim()) payload.content = data.content.trim();

  if (data.type === 'webhook') {
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
      embed.fields = data.embedFields.map((f) => ({
        name:   f.name,
        value:  f.value,
        inline: f.inline,
      }));
    }
    payload.embeds = [embed];
  }

  return payload;
};

const AddNotificationModal = ({ guildId, isOpen, onClose }: IAddNotificationModalProps) => {
  const botMutation     = useCreateDiscordNotificationMutation();
  const webhookMutation = useCreateWebhookNotificationMutation();

  const methods = useForm<TAddNotificationForm>({
    resolver: zodResolver(addNotificationSchema),
    mode: 'onTouched',
    reValidateMode: 'onChange',
    defaultValues: DEFAULT_VALUES,
  });

  const activeType = methods.watch('type');
  const isPending  = botMutation.isPending || webhookMutation.isPending;
  const isSuccess  = botMutation.isSuccess  || webhookMutation.isSuccess;

  useEffect(() => {
    if (!isOpen) {
      botMutation.reset();
      webhookMutation.reset();
      methods.reset(DEFAULT_VALUES);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isSuccess) onClose();
  }, [isSuccess]);

  const handleSubmit = (data: TAddNotificationForm) => {
    const payload = buildPayload(data);
    if (data.type === 'bot') {
      botMutation.mutate({
        broadcasterId: data.broadcasterId,
        event:         data.event,
        costType:      data.costType,
        payload,
        guildId,
        channelId:     data.channelId!,
      });
    } else {
      webhookMutation.mutate({
        guildId,
        data: {
          broadcasterId: data.broadcasterId,
          event:         data.event,
          costType:      data.costType,
          payload,
          webhookUrl:    data.webhookUrl!,
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
        <Modal.ModalBody className={styles.scrollableBody}>

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
              placeholder="https://discord.com/api/webhooks/…"
              hint="Discord webhook URL that will receive the event payload."
              hideErrorMessage
            />
          )}

          <PayloadSection />

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
