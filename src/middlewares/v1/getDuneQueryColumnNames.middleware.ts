import * as Joi from "joi";
import { formatErrors } from "../genericValidator";
import { NextFunction, Request, Response } from "express";
import { validationError } from "../../config/errors";
import { logger } from "../../connections/logger/logger";

const schema = Joi.object({
  queryId: Joi.string().required(),
});

const getDuneQueryColumnNamesMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await schema.validateAsync({ ...req.params }, { abortEarly: false });

    next();
  } catch (error) {
    logger.error({
      message: error?.message || "",
      stack: error?.stack || "",
      detail: "getDuneQueryColumnNamesMiddleware failed!",
      endpoint: "getDuneQueryColumnNamesMiddleware",
    });
    const errorMessages = formatErrors(error.details);
    return validationError(res, errorMessages);
  }
};

export { getDuneQueryColumnNamesMiddleware };
