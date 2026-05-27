import { cn } from '@/lib/utils';
import { IBaseButtonProps } from '../buttons';
import { LuArrowRight } from 'react-icons/lu';
import { SiDiscord } from 'react-icons/si';

import styles from './styles.module.scss';

const DiscordButton = (props: IBaseButtonProps) => {
  return (
    <button
      {...props}
      className={
        cn(
          styles.discordBtn,
          props.className
        )
      }
    >
      { process.env.NEXT_PUBLIC_API_URL }
      <span className={styles.icon}>
        <SiDiscord size={20} />
      </span>
      <span className={styles.label}>Continue with Discord</span>
      <LuArrowRight size={16} className={styles.arrow} />
    </button>
  )
}

export default DiscordButton;
