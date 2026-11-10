'use client';

import useStreamerDetailQuery from '@/hooks/queries/streamers/useStreamerDetailQuery';
import StreamerHero from './components/StreamerHero';
import StreamerDetails from './components/StreamerDetails';
import StreamerLogsSection from './components/StreamerLogsSection';
import { IStreamerDetailViewProps } from './StreamerDetailView';

import styles from './styles.module.scss';

/** Render inside an `AsyncBoundary` (see the route page): loading and errors are handled there. */
const StreamerDetailView = ({ streamerId }: IStreamerDetailViewProps) => {
  const { data: streamer } = useStreamerDetailQuery(streamerId);

  return (
    <div className={styles.root}>
      <StreamerHero streamer={streamer} />
      <StreamerDetails streamer={streamer} />
      <StreamerLogsSection streamerId={streamer.id} />
    </div>
  );
};

export default StreamerDetailView;
