'use client';

import useDiscordGuildChannelsQuery from '@/hooks/queries/discord/useDiscordGuildChannelsQuery';
import { IChannelCellProps } from './ChannelCell';

import styles from './styles.module.scss';

const ChannelCell = ({ guildId, channelId }: IChannelCellProps) => {
  const { data } = useDiscordGuildChannelsQuery(guildId);
  const channel = data?.find((item) => item.id === channelId);

  return (
    <span className={styles.channel} title={channelId}>
      {channel ? `#${channel.name}` : channelId}
    </span>
  );
};

export default ChannelCell;
