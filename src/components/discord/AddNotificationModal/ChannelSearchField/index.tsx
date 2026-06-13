'use client';

import useDiscordGuildChannelsQuery from '@/hooks/queries/discord/useDiscordGuildChannelsQuery';
import { IChannelSearchFieldProps } from './ChannelSearchField';
import { useMemo } from 'react';

import FormSelect from '@/components/ui/FormSelect';

const ChannelSearchField = ({ guildId }: IChannelSearchFieldProps) => {
  const { data, isLoading, } = useDiscordGuildChannelsQuery(guildId);

  const options = useMemo(
    () => {
      if (!data || data?.length < 1) return [];
      const sorted = data.sort(
        (dA, dB) => dA.position - dB.position
      );
      const mapped = sorted?.map(
        (d) => ({
          label: d.name,
          value: d.id,
        })
      );
      return mapped;
    }, [data]
  )

  return (
    <FormSelect
      name='channelId'
      options={options}
      placeholder={isLoading ? 'Loading channels...' : 'Search channels...'}
      label='Discord Channel'
      hideErrorMessage
      hideOptionalFlag
    >
      <FormSelect.Selected>
        {(item) => <span>{item.label}</span>}
      </FormSelect.Selected>
      <FormSelect.Area>
        <FormSelect.Option>
          {(item) => <span>{item.label}</span>}
        </FormSelect.Option>
      </FormSelect.Area>
    </FormSelect>
  );
}

export default ChannelSearchField;
