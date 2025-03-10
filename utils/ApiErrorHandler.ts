import { ErrorTypes, Messages, StatusCodes } from "@constants";
import { Apiresponse, ErrorType } from "@types";

export const handleApiError = <T = null>(
  error: ErrorType | Error | unknown
): Apiresponse<T> => {
  let type = "";
  const apiResponse: Apiresponse<T> = {
    status: StatusCodes.ERROR_STATUS,
    data: null as T,
    message: Messages.ERRORMESSAGE,
  };
  if (isErrorType(error)) {
    type = error.type;

    switch (type) {
      case ErrorTypes.GENERAL_ARGUMENT_INVALID: {
        apiResponse.status = error.code;
        apiResponse.message = Messages.PASSWORD_NOT_SECURE;
        break;
      }
      case ErrorTypes.USER_SESSION_ALREADY_EXISTS: {
        apiResponse.status = error.code;
        apiResponse.message = Messages.SESSION_ALREADY_EXISTS;
        break;
      }
      case ErrorTypes.INVALID_CREDENTIALS: {
        apiResponse.status = error.code;
        apiResponse.message = Messages.INVALID_CREDENTIALS;
        break;
      }
      default:
    }
  }

  return apiResponse;
};

const isErrorType = (
  error: ErrorType | Error | unknown
): error is ErrorType => {
  return typeof error === "object" && error !== null && "type" in error;
};
