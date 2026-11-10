import { memo } from 'react';
import { Handle, NodeProps, Position } from '@xyflow/react';
import { cn } from '@/lib/utils';
import { TServiceNode } from '../../FlowDiagram';

import styles from './styles.module.scss';

const ServiceNode = ({ data }: NodeProps<TServiceNode>) => {
  const { title, caption, icon: Icon, tone, direction } = data;
  const isHorizontal = direction === 'horizontal';

  return (
    <div className={cn(styles.node, styles[tone])}>
      <Handle
        type="target"
        position={isHorizontal ? Position.Left : Position.Top}
        className={styles.handle}
        isConnectable={false}
      />

      <span className={styles.icon} aria-hidden="true">
        <Icon size={16} />
      </span>
      <span className={styles.meta}>
        <span className={styles.title}>{title}</span>
        <span className={styles.caption}>{caption}</span>
      </span>

      <Handle
        type="source"
        position={isHorizontal ? Position.Right : Position.Bottom}
        className={styles.handle}
        isConnectable={false}
      />
    </div>
  );
}

export default memo(ServiceNode);
