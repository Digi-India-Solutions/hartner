import { type ErrorResponse } from "@helpers/response.helper";
import { type ErrorRequestHandler } from "express";
import { logger } from "@helpers/logger.helper";

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  logger.error("Express Error: %o", err);
  const response: ErrorResponse = {
    success: false,
    error_code: (err?.status ?? 500) as number,
    message: (err?.message ?? "Something went wrong!") as string,
    data: err?.data ?? {},
  };

  res.status(response.error_code).send(response);
  next();
};

export default errorHandler;
