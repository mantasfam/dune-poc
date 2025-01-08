import { Request, Response } from "express";
import duneService from "../../services/dune";
import { ERROR_MESSAGE } from "../../config/errors";
import { logger } from "../../connections/logger/logger";

const getDuneQueryColumnNames = async (req: Request, res: Response) => {
  const { queryId } = req.params;
  try {
    const columns = await duneService.getDuneQueryColumnNames(Number(queryId));
    res.json({
      success: true,
      results: columns,
    });
  } catch (error) {
    logger.error({
      message: error?.message || "",
      stack: error?.stack || "",
      detail: "getDuneQueryColumnNames error",
      endpoint: "getDuneQueryColumnNames",
      data: `queryId: ${queryId}`,
    });
    res.status(error.statusCode || error.status || 500);
    res.json({ success: false, message: ERROR_MESSAGE });
  }
};

export { getDuneQueryColumnNames };
