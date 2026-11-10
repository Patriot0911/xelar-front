import { LuActivity, LuDatabaseZap, LuKeyRound, LuLayers, LuShieldCheck, LuZap } from 'react-icons/lu';
import {
  IRoadmapRelease,
  IWelcomeNavLink,
  IWelcomeStep,
  IWelcomeTrustPoint,
  RoadmapStatus,
} from '@/lib/models/welcome';

export enum WelcomeSectionId {
  Hero       = 'hero',
  HowItWorks = 'how-it-works',
  Trust      = 'why-xelar',
  Roadmap    = 'roadmap',
  Join       = 'join',
};

export const WELCOME_NAV_LINKS: IWelcomeNavLink[] = [
  { href: `#${WelcomeSectionId.HowItWorks}`, label: 'How it works' },
  { href: `#${WelcomeSectionId.Trust}`,      label: 'Why Xelar' },
  { href: `#${WelcomeSectionId.Roadmap}`,    label: 'Roadmap' },
];

export const ROADMAP_STATUS_LABELS: Record<RoadmapStatus, string> = {
  [RoadmapStatus.Done]:       'Shipped',
  [RoadmapStatus.InProgress]: 'In progress',
  [RoadmapStatus.Planned]:    'Planned',
};

export const WELCOME_STEPS: IWelcomeStep[] = [
  {
    id: 'subscribe',
    title: 'Twitch pushes the event',
    description: 'A streamer goes live. Twitch EventSub sends the event to Xelar the moment it happens — nothing is polled.',
  },
  {
    id: 'verify',
    title: 'Xelar verifies and deduplicates',
    description: 'The receiver checks the Twitch signature, drops duplicates and puts the event on a durable queue.',
  },
  {
    id: 'route',
    title: 'Rules decide where it goes',
    description: 'The worker matches the event against your notifications, applies game filters and renders your message template.',
  },
  {
    id: 'deliver',
    title: 'Your community gets pinged',
    description: 'The message lands in a Discord channel through the Xelar bot, or through a Discord webhook. Every attempt is logged.',
  },
];

export const WELCOME_TRUST_POINTS: IWelcomeTrustPoint[] = [
  {
    id: 'push',
    icon: LuZap,
    title: 'Push, not polling',
    description: 'Built on Twitch EventSub. Events arrive as they happen instead of on a timer.',
  },
  {
    id: 'signature',
    icon: LuShieldCheck,
    title: 'Verified at the door',
    description: 'Every incoming request is checked against the Twitch signature. Forged events never reach your server.',
  },
  {
    id: 'idempotent',
    icon: LuDatabaseZap,
    title: 'One event, one message',
    description: 'Duplicates are filtered before they are queued, so retries from Twitch do not spam your channel.',
  },
  {
    id: 'secrets',
    icon: LuKeyRound,
    title: 'Secrets encrypted at rest',
    description: 'OAuth tokens and Twitch app credentials are stored encrypted, never in plain text.',
  },
  {
    id: 'decoupled',
    icon: LuLayers,
    title: 'Isolated services',
    description: 'Receiving, routing and delivery run as separate services over a message broker. A slow step never blocks the rest.',
  },
  {
    id: 'audit',
    icon: LuActivity,
    title: 'Every delivery logged',
    description: 'See what was sent, where and when. Webhooks that keep failing are suspended automatically.',
  },
];

export const ROADMAP_RELEASES: IRoadmapRelease[] = [
  {
    id: 'v1.0',
    version: '1.0',
    title: 'The bridge',
    summary: 'Everything you need to announce streams in Discord automatically.',
    status: RoadmapStatus.InProgress,
    features: [
      { id: 'go-live',   label: 'Go-live alerts from Twitch to your Discord channels', status: RoadmapStatus.Done },
      { id: 'webhooks',  label: 'Delivery through the Xelar bot or a Discord webhook', status: RoadmapStatus.Done },
      { id: 'templates', label: 'Custom message templates with role mentions',         status: RoadmapStatus.Done },
      { id: 'filters',   label: 'Game filters — notify only for the categories you want', status: RoadmapStatus.Done },
      { id: 'logs',      label: 'Delivery logs and notification statistics',           status: RoadmapStatus.Done },
      { id: 'sign-in',   label: 'Sign in with Discord or email, link your Twitch',      status: RoadmapStatus.Done },
    ],
  },
  {
    id: 'v1.1',
    version: '1.1',
    title: 'Closer to streamers',
    summary: 'A smoother experience for admins, streamers and partner communities.',
    status: RoadmapStatus.Planned,
    features: [
      { id: 'admin',          label: 'A better admin panel' },
      { id: 'weekly-tokens',  label: 'Weekly token allowance for creating new subscriptions' },
      { id: 'streamers',      label: 'Deeper integration with streamers' },
      { id: 'preview',        label: 'Custom stream preview images set by streamers' },
      { id: 'partners',       label: 'Partner servers program' },
      { id: 'i18n',           label: 'Multi-language interface' },
    ],
  },
  {
    id: 'v1.2',
    version: '1.2',
    title: 'Beyond Twitch',
    summary: 'New platforms and interactive notifications your community can act on.',
    status: RoadmapStatus.Planned,
    features: [
      { id: 'platforms',      label: 'New platforms, starting with YouTube' },
      { id: 'streamer-page',  label: 'A personal page for streamers with their own statistics' },
      { id: 'announcements',  label: 'Custom announcements from streamers to server owners — giveaways and more' },
      { id: 'events',         label: 'More events to notify about' },
      { id: 'discord-actions', label: 'Discord actions for streams: likes, boosting streamers to the top, interest-based digests' },
      { id: 'giveaways',      label: 'Platform-wide giveaways' },
      { id: 'interactive',    label: 'Interactive notifications: role buttons and custom actions' },
    ],
  },
];
