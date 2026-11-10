'use client';

import { useMemo } from 'react';
import { Background, BackgroundVariant, NodeTypes, ReactFlow } from '@xyflow/react';
import ServiceNode from './components/ServiceNode';
import { buildFlowGraph } from './flow.config';
import { IFlowDiagramProps } from './FlowDiagram';

import '@xyflow/react/dist/style.css';
import styles from './styles.module.scss';

const NODE_TYPES: NodeTypes = { service: ServiceNode };

const FlowDiagram = ({ direction = 'horizontal' }: IFlowDiagramProps) => {
  const { nodes, edges } = useMemo(() => buildFlowGraph(direction), [direction]);

  return (
    <div className={styles.canvas}>
      <ReactFlow
        key={direction}
        nodes={nodes}
        edges={edges}
        nodeTypes={NODE_TYPES}
        colorMode="dark"
        fitView
        fitViewOptions={{ padding: 0.12 }}
        nodesDraggable={false}
        nodesConnectable={false}
        nodesFocusable={false}
        edgesFocusable={false}
        elementsSelectable={false}
        panOnDrag={false}
        panOnScroll={false}
        zoomOnScroll={false}
        zoomOnPinch={false}
        zoomOnDoubleClick={false}
        preventScrolling={false}
      >
        <Background variant={BackgroundVariant.Dots} gap={22} size={1} color="var(--ink-3)" />
      </ReactFlow>
    </div>
  );
}

export default FlowDiagram;
