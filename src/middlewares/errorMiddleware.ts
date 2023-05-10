import { NextFunction, Request, Response } from "express";
import { errorTypes, httpStatusCodes } from "../constants/appConstants";
import { ErrorStrings } from "../constants/appStrings";
import { BaseError } from "../utils/errors";

function handleErrors(err: BaseError, req: Request, res: Response, next: NextFunction) {
  if (typeof err.message === "object")
    return res
      .status(err.statusCode || httpStatusCodes.INTERNAL_SERVER)
      .render("error", { errorMessage: err.message, errorType: err.type, status: err.statusCode, title: "Error" });

  if (err.message.includes(ErrorStrings.CAST_TO_OBJECTID_FAILED))
    return res.status(httpStatusCodes.BAD_REQUEST).render("error", {
      errorMessage: ErrorStrings.INVALID_ID,
      errorType: errorTypes.BAD_REQUEST,
      status: httpStatusCodes.BAD_REQUEST,
      title: "Error",
    });

  if (!err.type)
    return res.status(httpStatusCodes.INTERNAL_SERVER).render("error", {
      errorMessage: err.message,
      errorType: err.name,
      status: httpStatusCodes.INTERNAL_SERVER,
      title: "Error",
    });

  return res
    .status(err.statusCode || httpStatusCodes.INTERNAL_SERVER)
    .render("error", { errorMessage: err.message, errorType: err.type, status: err.statusCode, title: "Error" });
}

export = handleErrors;
