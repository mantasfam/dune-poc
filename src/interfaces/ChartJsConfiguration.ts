export interface ChartJsConfiguration {
  // TO DO: split config configuration into multiple interfaces: one for config and one for FE
  dataSource: {
    type: "dune" | "thegraph";
    queryId?: number;
    subgraphQuery?: string;
  };
  spec: {
    title: string;
    description: string;
    xaxisGranurality: "hour" | "day";
    timeColumnName: string;
    filterColumnName?: string;
    dynamicSeriesColumn?: string;
    series?: {
      fieldColumn: string;
      name: string;
      chartType: "bar" | "line";
      dataType: "number" | "percentage" | "currency";
      data?: string[];
      filterValue?: string;
    }[];
    xaxis?: number[];
  };
}
