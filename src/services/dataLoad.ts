import { DuneClient } from "@duneanalytics/client-sdk";
import { chartToQueryMap, chartJsToQueryMap } from "./chart-configurations";

const dune = new DuneClient(process.env.DUNE_API_KEY);

class DataGatherService {
  getChart = async (chartId: number) => {
    const config = chartToQueryMap[chartId];

    if (!config) {
      throw new Error(`Chart configuration for ID ${chartId} not found.`);
    }

    let result;
    if (config.dataSource.type === "dune" && config.dataSource.queryId) {
      result = await dune
        .getLatestResult({ queryId: config.dataSource.queryId })
        .then((response) => response.result.rows);
    } else if (config.dataSource.type === "thegraph" && config.dataSource.subgraphQuery) {
      throw new Error("The Graph data source is not implemented yet.");
    } else {
      throw new Error(`Unsupported data source: ${config.dataSource.type}`);
    }

    // Prepare the tooltip configuration based on existing values
    // Safely prepare the tooltip configuration
    const tooltip = (config.spec.encoding && config.spec.encoding.tooltip) || [
      config.spec.encoding?.x
        ? { ...config.spec.encoding.x }
        : { field: "default_x", type: "temporal", title: "X-Axis" },
      config.spec.encoding?.y
        ? { ...config.spec.encoding.y }
        : { field: "default_y", type: "quantitative", title: "Y-Axis" },
    ];

    // Inject resultsData into the spec and set defaults
    const dataSpec = {
      ...config.spec,
      $schema: "https://vega.github.io/schema/vega-lite/v5.json",
      width: 600,
      height: 400,
      data: {
        values: result,
      },
      encoding: {
        ...config.spec.encoding,
        tooltip: tooltip,
      },
    };

    console.log("title", dataSpec.title);
    return dataSpec;
  };

  getChartJs = async (chartId: number) => {
    const config = chartJsToQueryMap[chartId];

    if (!config) {
      throw new Error(`Chart configuration for ID ${chartId} not found.`);
    }

    let result;
    if (config.dataSource.type === "dune" && config.dataSource.queryId) {
      result = await dune
        .getLatestResult({ queryId: config.dataSource.queryId })
        .then((response) => response.result.rows);
    } else if (config.dataSource.type === "thegraph" && config.dataSource.subgraphQuery) {
      throw new Error("The Graph data source is not implemented yet.");
    } else {
      throw new Error(`Unsupported data source: ${config.dataSource.type}`);
    }

    const xaxis = result.map((row: any) => new Date(row[config.spec.timeColumnName]).getTime());
    const uniqueTimestamps = Array.from(new Set(xaxis)).sort((a, b) => a - b);

    let series: any;

    if (config.spec.dynamicSeriesColumn) {
      const baseSeries = config.spec.series[0]; // Assuming one base series per config

      // Get unique values in the dynamicSeriesColumn
      const uniqueGroups = Array.from(
        new Set(result.map((row: any) => row[config.spec.dynamicSeriesColumn]))
      );

      // Generate series dynamically for each group
      series = uniqueGroups.map((group: string) => ({
        fieldColumn: baseSeries.fieldColumn,
        name: baseSeries.name.replace("{dynamic}", group), // Replace placeholder with dynamic value
        filterValue: group, // For grouping data later
        chartType: baseSeries.chartType,
        dataType: baseSeries.dataType,
        data: uniqueTimestamps.map(() => "0"),
      }));

      // Populate data dynamically for each group
      result.forEach((row: any) => {
        const timestamp = new Date(row[config.spec.timeColumnName]).getTime();
        const timestampIndex = uniqueTimestamps.indexOf(timestamp);

        if (timestampIndex !== -1) {
          series.forEach((s: any) => {
            if (row[config.spec.dynamicSeriesColumn] === s.filterValue) {
              const value = row[s.fieldColumn] || 0;
              s.data[timestampIndex] = Number(value).toFixed(6);
            }
          });
        }
      });
    } else {
      // Standard processing if no dynamicSeriesColumn
      series = config.spec.series.map((seriesConfig: any) => ({
        fieldColumn: seriesConfig.fieldColumn,
        name: seriesConfig.name,
        filterValue: seriesConfig.filterValue,
        chartType: seriesConfig.chartType,
        dataType: seriesConfig.dataType,
        data: uniqueTimestamps.map(() => "0"),
      }));

      result.forEach((row: any) => {
        const timestamp = new Date(row[config.spec.timeColumnName]).getTime();
        const timestampIndex = uniqueTimestamps.indexOf(timestamp);

        if (timestampIndex !== -1) {
          series.forEach((s: any) => {
            const seriesColumn = s.fieldColumn;
            if (
              !config.spec.filterColumnName ||
              row[config.spec.filterColumnName] === s.filterValue
            ) {
              const value = row[seriesColumn] || 0;
              s.data[timestampIndex] = Number(value).toFixed(6);
            }
          });
        }
      });
    }

    const dataSpec = {
      title: config.spec.title,
      description: config.spec.description,
      xaxisGranurality: config.spec.xaxisGranurality || "daily",
      xaxis: uniqueTimestamps,
      series,
    };
    return dataSpec;
  };
}

export default new DataGatherService();
