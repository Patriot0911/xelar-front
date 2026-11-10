export const StreamersQueryKey = {
  List: 'streamers-list',
  Detail: 'streamers-detail',
  Logs: 'streamers-logs',
} as const;

export const STREAMERS_DEFAULT_PAGE_SIZE = 20;

/** Streamer notification logs come as one list; the page splits them client-side. */
export const STREAMER_LOGS_PAGE_SIZE = 10;
