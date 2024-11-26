import { ChartConfiguration } from "../interfaces/ChartConfiguration";
import { ChartJsConfiguration } from "../interfaces/ChartJsConfiguration";

export const chartToQueryMap: Record<number, ChartConfiguration> = {
  1: {
    dataSource: {
      type: "dune",
      queryId: 3430945,
    },
    spec: {
      title: "USD for BlackRock",
      description: "A bar chart showing the amount in USD for BlackRock over time.",
      transform: [{ filter: "datum.issuer === 'BlackRock'" }],
      mark: {
        type: "bar",
        tooltip: true,
      },
      encoding: {
        x: { field: "time", type: "temporal", title: "Date", timeUnit: "yearmonthdate" },
        y: { field: "amount_usd_net_flow", type: "quantitative", title: "Amount in USD" },
      },
    },
  },
  2: {
    dataSource: {
      type: "dune",
      queryId: 4104550,
    },
    spec: {
      title: "The Blob Total Fees: Default",
      description: "A bar chart showing the Blob Total Fees.",
      mark: {
        type: "bar",
        tooltip: true,
      },
      encoding: {
        x: {
          field: "time",
          type: "temporal",
          title: "Time",
        },
        y: {
          field: "fee",
          type: "quantitative",
          title: "Amount in ETH",
        },
      },
    },
  },
  3: {
    dataSource: {
      type: "dune",
      queryId: 4104550,
    },
    spec: {
      title: "The Blob Total Fees: Mainnet",
      description: "A bar chart showing the Blob Total Fees.",
      transform: [{ filter: "datum.fee_type === 'Mainnet'" }],
      mark: {
        type: "bar",
        tooltip: true,
      },
      encoding: {
        x: {
          field: "time",
          type: "temporal",
          title: "Time",
          format: "%b %d, %H:%M",
        },
        y: {
          field: "fee",
          type: "quantitative",
          title: "Amount in ETH",
        },
      },
    },
  },
  4: {
    dataSource: {
      type: "dune",
      queryId: 4104550, // Unique query ID
    },
    spec: {
      title: "The Blob Total Fees: GPT",
      description: "A stacked column chart showing fees (USD) over the past 5 days.",
      encoding: {
        x: {
          field: "time",
          type: "temporal",
          title: "Date",
          axis: {
            format: "%b %d",
            labelAngle: -45,
            labelFontSize: 12,
            titleFontSize: 14,
          },
          sort: "ascending", // Equivalent to `sortX`
        },
        y: {
          field: "fee_usd",
          type: "quantitative",
          title: "Fees (USD)",
          scale: { type: "linear" }, // Equivalent to `yAxis.type: linear`
          axis: {
            format: "$,.2f", // Equivalent to `tickFormat: "$###,###.##"`
          },
        },
        color: {
          field: "fee_type",
          type: "nominal",
          title: "Fee Type",
          legend: { orient: "top", titleFontSize: 12 }, // Equivalent to `legend.enabled: true`
          scale: {
            domain: ["Mainnet", "Submission"], // Aligns with series options
            range: ["#42D7A4", "#FE6860"], // Custom colors
          },
        },
      },
      mark: {
        type: "bar",
        tooltip: true,
      },
      config: {
        bar: {
          cornerRadius: 3,
        },
        axis: {
          grid: false,
        },
        legend: {
          titleFontSize: 14,
          labelFontSize: 12,
        },
      },
      transform: [
        {
          calculate: "datum.fee_usd",
          as: "fee_usd",
        },
      ],
    },
  },
  5: {
    dataSource: {
      type: "dune",
      queryId: 3759856,
    },
    spec: {
      title: "Revenue stats",
      description: "Daily Revenue and Cumulative Revenue as Bar and Line Chart",
      encoding: {
        x: {
          field: "date",
          type: "temporal",
          title: "Date",
        },
      },
      layer: [
        {
          mark: {
            type: "bar",
          },
          encoding: {
            y: {
              field: "daily_revenue_usd",
              type: "quantitative",
              title: "Revenue (USD)",
            },
          },
        },
        {
          mark: {
            type: "line",
            //point: true, // Adds points to the line
          },
          encoding: {
            y: {
              field: "cumulative_revenue_usd",
              type: "quantitative",
              title: "Revenue (USD)", // Same axis title
            },
          },
        },
      ],
    },
  },
  6: {
    dataSource: {
      type: "dune",
      queryId: 3759856,
    },
    spec: {
      $schema: "https://vega.github.io/schema/vega-lite/v5.json",
      title: "Pump Revenue: GPT",
      description: "Daily Revenue and Cumulative Revenue as Bar and Line Chart",
      layer: [
        {
          mark: {
            type: "bar",
            color: "#bafdcb",
          },
          encoding: {
            x: {
              field: "date",
              type: "temporal",
              title: "Date",
              axis: {
                labelAngle: 0,
              },
            },
            y: {
              field: "daily_revenue_usd",
              type: "quantitative",
              title: "Daily Revenue (USD)",
            },
            tooltip: [
              { field: "date", type: "temporal", title: "Date" },
              { field: "daily_revenue_usd", type: "quantitative", title: "Daily Revenue" },
            ],
          },
        },
        {
          mark: {
            type: "line",
            color: "#000000",
          },
          encoding: {
            x: {
              field: "date",
              type: "temporal",
            },
            y: {
              field: "cumulative_revenue_usd",
              type: "quantitative",
              title: "Cumulative Revenue (USD)",
            },
            tooltip: [
              { field: "date", type: "temporal", title: "Date" },
              {
                field: "cumulative_revenue_usd",
                type: "quantitative",
                title: "Cumulative Revenue",
              },
            ],
          },
        },
      ],
      resolve: {
        scale: {
          y: "independent",
        },
      },
    },
  },
};

export const chartJsToQueryMap: Record<number, ChartJsConfiguration> = {
  1: {
    dataSource: {
      type: "dune",
      queryId: 4104550,
    },
    spec: {
      title: "Blob Total Fees In Eth",
      description: "Chart description, lorem ipsum:D",
      xaxisGranurality: "hour", // can be daily
      timeColumn: "time",
      filterColumn: "fee_type",
      series: [
        {
          fieldColumn: "fee",
          name: "Submission",
          filterValue: "Submission",
          chartType: "bar", // can also be "line"
          dataType: "number",
        },
        {
          fieldColumn: "fee",
          name: "Mainnet",
          filterValue: "Mainnet",
          chartType: "bar", // can also be "line"
          dataType: "number",
        },
      ],
    },
  },
  2: {
    dataSource: {
      type: "dune",
      queryId: 3759856,
    },
    spec: {
      title: "Revenue stats",
      description: "Revenue stats",
      xaxisGranurality: "daily", // can be daily
      timeColumn: "date",
      series: [
        {
          fieldColumn: "daily_revenue_usd",
          name: "Daily revenue",
          chartType: "bar", // can also be "line"
          dataType: "currency",
        },
        {
          fieldColumn: "cumulative_revenue_usd",
          name: "Cumulative",
          chartType: "line", // can also be "line"
          dataType: "currency",
        },
      ],
    },
  },
};
