import { Request, Response } from "express";
import { ERROR_MESSAGE } from "../../config/errors";
import { logger } from "../../connections/logger/logger";

const healthCheck = async (req: Request, res: Response) => {
  try {
    const initiateError = Boolean(req.query.error);
    if (initiateError) {
      throw new Error("Initiated error for testing changes");
    }
    res.json({
      success: true,
    });
  } catch (error) {
    logger.error({
      message: error?.message || "",
      stack: error?.stack || "",
      detail: "healthCheck error",
      endpoint: "healthCheck",
    });
    res.status(error.statusCode || error.status || 500);
    res.json({ success: false, message: ERROR_MESSAGE });
  }
};

export { healthCheck };
