import { DuneClient } from "@duneanalytics/client-sdk";
import { chartToQueryMap, chartJsToQueryMap } from "./chart-configurations";
import redis from "../connections/redis";
import { TIME, REDIS_KEYS } from "../config/consts";

const dune = new DuneClient(process.env.DUNE_API_KEY);

class DuneService {
  getDuneQuery = async (queryId: number): Promise<Record<string, unknown>[]> => {
    let query: Record<string, unknown>[] = JSON.parse(
      await redis.get(REDIS_KEYS.DUNE_QUERY(queryId))
    );
    if (query) return query;

    query = await dune.getLatestResult({ queryId }).then((response) => response.result.rows);
    await redis.set(
      REDIS_KEYS.DUNE_QUERY(queryId),
      JSON.stringify(query),
      "EX",
      TIME.HOURS_4_IN_SECONDS
    );
    return query;
  };

  getDuneQueryColumnNames = async (queryId: number): Promise<string[]> => {
    const query = await this.getDuneQuery(queryId);
    return query.length ? Object.keys(query[0]) : [];
  };
}

export default new DuneService();
