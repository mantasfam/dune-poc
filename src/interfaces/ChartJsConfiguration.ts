export interface ChartJsConfiguration {
  dataSource: {
    type: "dune" | "thegraph";
    queryId?: number;
    subgraphQuery?: string;
  };
  spec: {
    title: string;
    description: string;
    xaxisGranurality: "hourly" | "daily";
    filterColumn?: string;
    timeColumn: string;
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
