import { ApiError } from "./Types/apiError";

export const getError = (error: ApiError) => {
  return error.message && error.response.data.message
    ? error.response.data.message
    : error.message;
};
