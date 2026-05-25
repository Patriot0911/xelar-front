import { LuExternalLink } from 'react-icons/lu';
import { IExternalButtonProps } from '../buttons';

import styles from './styles.module.scss';

const ExternalButton = ({ href, label }: IExternalButtonProps) => {
  return (
    <a
      className={styles['external-button']}
      href={href}
      target={'_blank'}
      rel={'noreferrer'}
    >
      <LuExternalLink size={16} style={{ marginRight: 6 }} />
      <span>{label}</span>
    </a>
  );
}

export default ExternalButton;
