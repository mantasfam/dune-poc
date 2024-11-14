import { ERROR_REASON_TEXT, ValidationError } from "./../config/errors";
import * as Joi from "joi";

export const formatErrors = (errorDetails: Joi.ValidationErrorItem[]): ValidationError[] => {
  return errorDetails?.map((error) => ({
    reason: ERROR_REASON_TEXT.INVALID_QUERY,
    message: error.context?.valids?.length
      ? `Validation failure: ${error.context.key} not available.`
      : formatErrorMessage(error),
    value: error?.context?.value,
    validValues: error?.context?.valids,
    property: error.path.join("."),
  }));
};

// Custom function to format error messages
function formatErrorMessage(error: Joi.ValidationErrorItem): string {
  const message = error.message.replace(/\".*?\"/g, "Field");
  return message;
}
