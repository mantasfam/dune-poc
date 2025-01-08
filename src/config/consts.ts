const REDIS_KEYS = {
  DUNE_QUERY: (queryId: string | number) => `dune_query:${queryId}`,
};
const TIME = {
  SECONDS_30: 30,
  HOURS_4_IN_SECONDS: 4 * 60 * 60,
};

export { REDIS_KEYS, TIME };
