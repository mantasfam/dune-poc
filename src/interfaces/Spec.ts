export interface VegaSpec {
  $schema?: string; // make mandatory
  title: string;
  description: string;
  width?: number; // make mandatory
  height?: number; // make mandatory
  data?: Record<string, any>; // make mandatory
  transform?: Array<Record<string, any>>;
  mark?: {
    type?:
      | "bar"
      | "line"
      | "area"
      | "point"
      | "circle"
      | "square"
      | "tick"
      | "rect"
      | "rule"
      | "text"
      | "geoshape"
      | "trail"
      | "image"
      | "boxplot"
      | "errorband"
      | "errorbar";
    tooltip: boolean;
  };
  encoding?: {
    x: {
      field: string;
      type?: string;
      title?: string;
      format?: string;
      timeUnit?: string;
      axis?: any;
      sort?: any;
    };
    y?: {
      field: string;
      type?: string;
      title?: string;
      scale?: any;
      axis?: any;
    };
    tooltip?: Array<{
      field: string;
      type: string;
      title: string;
      format?: string;
    }>;
    color?: any;
  };
  layer?: any;
  config?: any;
  resolve?: any;
}
