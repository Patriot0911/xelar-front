'use client';

import { useEffect, useMemo } from 'react';
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
  PUBLIC_TWITCH_EVENTS,
} from '@/lib/constants/notifications';
import useCreateDiscordNotificationMutation from '@/hooks/mutations/discord/useCreateDiscordNotificationMutation';
import useCreateWebhookNotificationMutation from '@/hooks/mutations/discord/useCreateWebhookNotificationMutation';
import useAllowPersonalSubscriptionsQuery from '@/hooks/queries/twitch/useAllowPersonalSubscriptionsQuery';
import { addNotificationSchema, TAddNotificationForm } from './add-notification.scheme';
import StreamerSearchField from './StreamerSearchField';
import ChannelSearchField from './ChannelSearchField';
import GameFilterField from './GameFilterField';
import PayloadSection from './PayloadSection';
import { parsePayloadToFormValues } from '../EditNotificationModal/payload-parse';
import type { TGuildNotificationRef } from '@/lib/models/discord';
import type { ITwitchChannelModel } from '@/lib/models/twitch/twitch-channel.model';
import type { IAddNotificationModalProps } from './AddNotificationModal';
import styles from './styles.module.scss';

const ALL_EVENT_OPTIONS: ISelectOption[] = Object.values(TwitchStreamerEvent).map((v) => ({
  value: v,
  label: TWITCH_EVENT_LABELS[v],
}));

const PUBLIC_EVENT_OPTIONS: ISelectOption[] = ALL_EVENT_OPTIONS.filter(
  (option) => PUBLIC_TWITCH_EVENTS.includes(option.value as TwitchStreamerEvent)
);

const ALL_COST_TYPE_OPTIONS: ISelectOption[] = [NotificationCostType.Personal, NotificationCostType.Credit].map((v) => ({
  value: v,
  label: COST_TYPE_LABELS[v],
}));

const PERSONAL_COST_TYPE_OPTIONS: ISelectOption[] = ALL_COST_TYPE_OPTIONS.filter(
  (option) => option.value === NotificationCostType.Personal
);

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
  embedAuthorName:    '',
  embedAuthorUrl:     '',
  embedAuthorIconUrl: '',
  embedFooterText:    '',
  embedFooterIconUrl: '',
  embedTimestamp:     false,
  embedFields:        [],
  gameFilters:        [],
};

const isEnumValue = <T extends string>(values: Record<string, T>, value: unknown): value is T =>
  Object.values(values).includes(value as T);

/**
 * Form values copied from an existing notification. The webhook URL is never returned by the API,
 * so it stays empty and has to be entered again.
 */
const buildTemplateValues = ({ type, item }: TGuildNotificationRef): TAddNotificationForm => {
  const event = item.streamerEvent?.event;

  return {
    ...DEFAULT_VALUES,
    ...parsePayloadToFormValues(item.messagePayload),
    type,
    broadcasterId: item.streamerEvent?.streamer.broadcasterId ?? '',
    event: isEnumValue(TwitchStreamerEvent, event) ? event : DEFAULT_VALUES.event,
    costType: isEnumValue(NotificationCostType, item.costType) ? item.costType : DEFAULT_VALUES.costType,
    channelId: type === 'bot' ? item.channelId : '',
    webhookUrl: '',
    gameFilters: item.gameFilters ?? [],
  };
};

const templateToChannel = (template: TGuildNotificationRef | null): ITwitchChannelModel | null => {
  const streamer = template?.item.streamerEvent?.streamer;
  if (!streamer) return null;

  return {
    broadcasterId: streamer.broadcasterId,
    broadcasterLogin: streamer.twitchLogin,
    displayName: streamer.displayName,
    thumbnailUrl: streamer.profileImageUrl ?? '',
    isLive: false,
  };
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
    if (data.embedAuthorName?.trim()) {
      const author: Record<string, string> = { name: data.embedAuthorName.trim() };
      if (data.embedAuthorUrl?.trim())     author.url      = data.embedAuthorUrl.trim();
      if (data.embedAuthorIconUrl?.trim()) author.icon_url = data.embedAuthorIconUrl.trim();
      embed.author = author;
    }
    if (data.embedThumbnailUrl?.trim()) embed.thumbnail = { url: data.embedThumbnailUrl.trim() };
    if (data.embedImageUrl?.trim())     embed.image     = { url: data.embedImageUrl.trim() };
    if (data.embedFooterText?.trim()) {
      const footer: Record<string, string> = { text: data.embedFooterText.trim() };
      if (data.embedFooterIconUrl?.trim()) footer.icon_url = data.embedFooterIconUrl.trim();
      embed.footer = footer;
    }
    if (data.embedTimestamp) embed.timestamp = '${startedAt}';
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

const AddNotificationModal = ({ guildId, isOpen, onClose, template = null }: IAddNotificationModalProps) => {
  const botMutation     = useCreateDiscordNotificationMutation();
  const webhookMutation = useCreateWebhookNotificationMutation();

  const methods = useForm<TAddNotificationForm>({
    resolver: zodResolver(addNotificationSchema),
    mode: 'onTouched',
    reValidateMode: 'onChange',
    defaultValues: DEFAULT_VALUES,
  });

  const activeType    = methods.watch('type');
  const broadcasterId = methods.watch('broadcasterId');
  const isPending  = botMutation.isPending || webhookMutation.isPending;
  const isSuccess  = botMutation.isSuccess  || webhookMutation.isSuccess;

  const { data: personalSubscriptionsStatus } = useAllowPersonalSubscriptionsQuery(broadcasterId);
  const allowsPersonalSubscriptions = !!personalSubscriptionsStatus?.allowed;

  const eventOptions    = PUBLIC_EVENT_OPTIONS; // todo
  const costTypeOptions = PERSONAL_COST_TYPE_OPTIONS; // todo

  const initialChannel = useMemo(() => templateToChannel(template), [template]);
  const isDuplicate = Boolean(template);

  useEffect(() => {
    if (isOpen) {
      methods.reset(template ? buildTemplateValues(template) : DEFAULT_VALUES);
      return;
    }
    botMutation.reset();
    webhookMutation.reset();
  }, [isOpen, template]);

  useEffect(() => {
    if (isSuccess) onClose();
  }, [isSuccess]);

  useEffect(() => {
    if (allowsPersonalSubscriptions) return;

    const currentEvent = methods.getValues('event');
    if (!PUBLIC_TWITCH_EVENTS.includes(currentEvent)) {
      methods.setValue('event', TwitchStreamerEvent.STREAM_ONLINE, { shouldValidate: true });
    }

    if (methods.getValues('costType') === NotificationCostType.Credit) {
      methods.setValue('costType', NotificationCostType.Personal, { shouldValidate: true });
    }
  }, [allowsPersonalSubscriptions]);

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
        gameFilters:   data.gameFilters,
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
          gameFilters:   data.gameFilters,
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
        title={isDuplicate ? 'Duplicate Notification' : 'Add Notification'}
        description={
          isDuplicate
            ? 'Pre-filled from an existing notification — change what differs and save it as a new one.'
            : 'Subscribe to a Twitch streamer event and deliver it to a Discord channel or webhook.'
        }
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

          <StreamerSearchField initialChannel={initialChannel} />

          <FormSelect<TAddNotificationForm, ISelectOption>
            name="event"
            label="Event"
            required
            hideErrorMessage
            hint={
              allowsPersonalSubscriptions
                ? 'The Twitch event that will trigger the notification.'
                : 'This streamer has not authorized private events. Only public events are available.'
            }
            options={eventOptions}
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
            hint={
              allowsPersonalSubscriptions
                ? 'Credit notifications are free, using the streamer\'s authorized subscription.'
                : 'This streamer has not authorized free notifications. Only personal cost is available.'
            }
            options={costTypeOptions}
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
              hint={
                isDuplicate
                  ? 'Webhook URLs are kept private by the server — paste the URL again.'
                  : 'Discord webhook URL that will receive the event payload.'
              }
              hideErrorMessage
            />
          )}

          <GameFilterField />

          <PayloadSection guildId={guildId} />

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
            {isDuplicate ? 'Create Copy' : 'Add Notification'}
          </Button>
        </Modal.ModalFooter>
      </FormProvider>
    </Modal>
  );
};

export default AddNotificationModal;
