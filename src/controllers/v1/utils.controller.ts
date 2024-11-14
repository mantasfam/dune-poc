import { Request, Response } from "express";
import { logger } from "../../connections/logger/logger";

const notFound = async (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
};

const error = async (req: Request, res: Response) => {
  try {
    throw new Error("Test Error");
  } catch (error) {
    logger.error({
      message: error?.message || "",
      stack: error?.stack || "",
      detail: "Test error",
      endpoint: "error",
    });
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

export { notFound, error };
