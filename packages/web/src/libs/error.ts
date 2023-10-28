import { z } from "zod";

export function isZodError(err: unknown): err is z.ZodError {
  if (err instanceof z.ZodError) {
    return true;
  }
  if (err instanceof Error && err.name === "ZodError") {
    return true;
  }
  return false;
}

type ApiValidationError = {
  statusCode: 400;
  message: "Validation failed";
  errors: z.ZodIssue[];
};

export function isValidationError(err: unknown): err is ApiValidationError {
  if (typeof err !== "object" || err === null) {
    return false;
  }

  if ("statusCode" in err && err.statusCode !== 400) {
    return false;
  }
  if ("message" in err && err.message !== "Validation failed") {
    return false;
  }
  if (!("errors" in err) || !Array.isArray(err.errors)) {
    return false;
  }

  return true;
}
