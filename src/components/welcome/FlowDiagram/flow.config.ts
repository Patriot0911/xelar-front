import { Edge, MarkerType, XYPosition } from '@xyflow/react';
import { LuBot, LuInbox, LuShieldCheck, LuWebhook, LuWorkflow } from 'react-icons/lu';
import { SiDiscord, SiTwitch } from 'react-icons/si';
import { FlowDirection, IFlowGraph, TServiceNode, TServiceNodeData } from './FlowDiagram';

type TNodeId = 'twitch' | 'receiver' | 'queue' | 'worker' | 'bot' | 'webhook' | 'discord';

type TNodeTemplate = Omit<TServiceNodeData, 'direction'>;

const NODE_TEMPLATES: Record<TNodeId, TNodeTemplate> = {
  twitch:   { title: 'Twitch EventSub',  caption: 'stream.online',          icon: SiTwitch,      tone: 'twitch' },
  receiver: { title: 'Receiver',         caption: 'verify · dedupe',        icon: LuShieldCheck, tone: 'xelar' },
  queue:    { title: 'Message queue',    caption: 'durable · async',        icon: LuInbox,       tone: 'xelar' },
  worker:   { title: 'Router',           caption: 'filter · template · log', icon: LuWorkflow,   tone: 'xelar' },
  bot:      { title: 'Xelar bot',        caption: 'bot message',            icon: LuBot,         tone: 'discord' },
  webhook:  { title: 'Webhook',          caption: 'discord only, for now',  icon: LuWebhook,     tone: 'discord' },
  discord:  { title: 'Your server',      caption: '#announcements',         icon: SiDiscord,     tone: 'discord' },
};

const POSITIONS: Record<FlowDirection, Record<TNodeId, XYPosition>> = {
  horizontal: {
    twitch:   { x: 0,    y: 90 },
    receiver: { x: 230,  y: 90 },
    queue:    { x: 460,  y: 90 },
    worker:   { x: 690,  y: 90 },
    bot:      { x: 920,  y: 0 },
    webhook:  { x: 920,  y: 180 },
    discord:  { x: 1150, y: 90 },
  },
  vertical: {
    twitch:   { x: 95,  y: 0 },
    receiver: { x: 95,  y: 120 },
    queue:    { x: 95,  y: 240 },
    worker:   { x: 95,  y: 360 },
    bot:      { x: 0,   y: 480 },
    webhook:  { x: 190, y: 480 },
    discord:  { x: 95,  y: 600 },
  },
};

const EDGE_STYLE = { stroke: 'var(--accent)', strokeWidth: 1.5 };

const EDGES: Array<[TNodeId, TNodeId, string?]> = [
  ['twitch', 'receiver', 'HTTPS push'],
  ['receiver', 'queue'],
  ['queue', 'worker'],
  ['worker', 'bot'],
  ['worker', 'webhook'],
  ['bot', 'discord'],
  ['webhook', 'discord'],
];

export const buildFlowGraph = (direction: FlowDirection): IFlowGraph => {
  const nodes: TServiceNode[] = (Object.keys(NODE_TEMPLATES) as TNodeId[]).map((id) => ({
    id,
    type: 'service',
    position: POSITIONS[direction][id],
    data: { ...NODE_TEMPLATES[id], direction },
  }));

  const edges: Edge[] = EDGES.map(([source, target, label]) => ({
    id: `${source}-${target}`,
    source,
    target,
    label,
    animated: true,
    style: EDGE_STYLE,
    markerEnd: { type: MarkerType.ArrowClosed, color: 'var(--accent)', width: 16, height: 16 },
  }));

  return { nodes, edges };
};
