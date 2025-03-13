import { Messages, StatusCodes } from "@/constants";
import { Apiresponse } from "@/types";

export const handleApiError = <T = null>(
  error: Error | unknown
): Apiresponse<T> => {
  const apiResponse: Apiresponse<T> = {
    status: StatusCodes.ERROR_STATUS,
    data: null as T,
    message: Messages.ERRORMESSAGE,
  };
  return apiResponse;
};
