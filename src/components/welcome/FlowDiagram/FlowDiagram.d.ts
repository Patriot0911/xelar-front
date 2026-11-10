import { Edge, Node } from '@xyflow/react';
import { IconType } from 'react-icons';

export type FlowDirection = 'horizontal' | 'vertical';

export type ServiceNodeTone = 'twitch' | 'xelar' | 'discord';

export type TServiceNodeData = {
  title: string;
  caption: string;
  icon: IconType;
  tone: ServiceNodeTone;
  direction: FlowDirection;
};

export type TServiceNode = Node<TServiceNodeData, 'service'>;

export interface IFlowDiagramProps {
  direction?: FlowDirection;
};

export interface IFlowGraph {
  nodes: TServiceNode[];
  edges: Edge[];
};
