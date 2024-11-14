import { VegaSpec } from "./Spec";

export interface ChartConfiguration {
  dataSource: {
    type: "dune" | "thegraph";
    queryId?: number;
    subgraphQuery?: string;
  };
  spec: VegaSpec;
}
