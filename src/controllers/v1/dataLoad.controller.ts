import { Request, Response } from "express";
import dataLoadService from "../../services/dataLoad";
import { ERROR_MESSAGE } from "../../config/errors";
import { logger } from "../../connections/logger/logger";

const getChart = async (req: Request, res: Response) => {
  const { chartId } = req.params;
  try {
    const chartData = await dataLoadService.getChart(Number(chartId));
    res.json({
      success: true,
      results: chartData,
    });
  } catch (error) {
    logger.error({
      message: error?.message || "",
      stack: error?.stack || "",
      detail: "getChart error",
      endpoint: "getChart",
      data: `chartId: ${chartId}`,
    });
    res.status(error.statusCode || error.status || 500);
    res.json({ success: false, message: ERROR_MESSAGE });
  }
};

const getChartJs = async (req: Request, res: Response) => {
  const { chartId } = req.params;
  try {
    const chartData = await dataLoadService.getChartJs(Number(chartId));
    res.json({
      success: true,
      results: chartData,
    });
  } catch (error) {
    logger.error({
      message: error?.message || "",
      stack: error?.stack || "",
      detail: "getChartJs error",
      endpoint: "getChartJs",
      data: `chartId: ${chartId}`,
    });
    res.status(error.statusCode || error.status || 500);
    res.json({ success: false, message: ERROR_MESSAGE });
  }
};

export { getChart, getChartJs };
