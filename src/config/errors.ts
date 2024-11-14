import { Response } from "express";
import { COOLDOWN_IN_SEC } from "./consts";

export const ERROR_MESSAGE = "Something went wrong! Please try again";

export enum ERROR_REASON_TEXT {
  INVALID_QUERY = "InvalidQuery",
  FORBIDDEN = "Forbidden",
  BAD_REQUEST = "BadRequest",
  COUNTRY_RESTRICTION = "CountryRestriction",
}

export type ValidationError = {
  reason: ERROR_REASON_TEXT;
  message: string;
  value?: string;
  validValues?: (string | number)[] | string;
  minimumValidDateFrom?: string;
  requestedInterval?: number;
  property?: string | number;
};

export type AccessError = {
  reason: ERROR_REASON_TEXT;
  message: string;
  validValues?: (string | number)[] | string;
  maxHistoricalDaysAlowed?: number;
};

export const unAuthorized = (res: Response, message?: string): void => {
  res.status(401);
  res.json({
    success: false,
    message: (message && `Unauthorized: ${message}`) || "Unauthorized",
  });

  return;
};

export const badRequest = (res: Response, messages: ValidationError[]): void => {
  res.status(400);
  res.json({
    success: false,
    message: messages,
  });
  return;
};

export const validationError = (res: Response, messages: ValidationError[]): void => {
  res.status(400);
  res.json({
    success: false,
    message: messages,
  });
  return;
};

export const notFound = (res: Response, message?: string): void => {
  res.status(404);
  res.json({
    message: (message && `Not found: ${message}`) || "Resource not found",
    success: false,
  });

  return;
};

export const forbidden = (res: Response, messages: AccessError[]): void => {
  res.status(403);
  res.json({
    success: false,
    message: messages,
  });
  return;
};

export const tooManyRequests = (res: Response): void => {
  res.status(429);
  res.json({
    success: false,
    message: [
      {
        reason: ERROR_REASON_TEXT.BAD_REQUEST,
        message: `Cooldown in effect: Please wait ${COOLDOWN_IN_SEC} seconds to verify again`,
      },
    ],
  });
  return;
};
