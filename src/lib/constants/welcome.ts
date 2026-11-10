import { LuActivity, LuDatabaseZap, LuKeyRound, LuLayers, LuShieldCheck, LuZap } from 'react-icons/lu';
import {
  IRoadmapItem,
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

// TODO: replace with the real roadmap once it is defined.
export const ROADMAP_ITEMS: IRoadmapItem[] = [
  {
    id: 'discord-delivery',
    title: 'Discord delivery',
    description: 'Bot messages and Discord webhooks for Twitch go-live events.',
    status: RoadmapStatus.Done,
  },
  {
    id: 'more-events',
    title: 'More Twitch events',
    description: 'Details coming soon.',
    status: RoadmapStatus.InProgress,
  },
  {
    id: 'custom-webhooks',
    title: 'Custom webhooks',
    description: 'Details coming soon.',
    status: RoadmapStatus.Planned,
  },
];
