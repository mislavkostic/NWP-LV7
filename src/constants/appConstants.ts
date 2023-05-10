//status codes
const httpStatusCodes = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  INTERNAL_SERVER: 500,
};
//error types
const errorTypes = {
  BAD_REQUEST: "Bad Request",
  VALIDATION: "Validation",
  INTERNAL_SERVER: "Internal Server Error",
  DUPLICATED_VALUE: "Duplicated value",
  UNAUTHORIZED: "Unauthorized",
  INVALID_TOKEN: "Invalid token",
};

//all app constants
const AppConstants = {
  httpStatusCodes,
  errorTypes,
  saltRounds: 10,
  tokenExpireTime: 60 * 60 * 24,
  cookieExpireTime: 60 * 60 * 24 * 1000,
};

export = AppConstants;
