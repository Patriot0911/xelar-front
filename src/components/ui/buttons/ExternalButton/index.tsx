import { LuExternalLink } from 'react-icons/lu';
import { cn } from '@/lib/utils';
import { IExternalButtonProps } from '../buttons';

import buttonStyles from '../Button/styles.module.scss';

/** Link that leaves the app — rendered as the indigo `neon-external` button. */
const ExternalButton = ({ href, label }: IExternalButtonProps) => {
  return (
    <a
      className={cn(buttonStyles.button, buttonStyles['neon-external'])}
      href={href}
      target="_blank"
      rel="noreferrer"
    >
      <span className={buttonStyles.content}>{label}</span>
      <span className={buttonStyles.icon}><LuExternalLink size={14} /></span>
    </a>
  );
};

export default ExternalButton;
