import { Action } from "./Types/Action";
import { ApiError } from "./Types/apiError";
import { State } from "./Types/state";

export const getError = (error: ApiError) => {
  return error.message && error.response.data.message
    ? error.response.data.message
    : error.message;
};

export const reducer = (state: State, action: Action) => {
  if (action.type == "FETCH_REQUEST") {
    return { ...state, loading: true };
  } else if (action.type == "FETCH_SUCCESS") {
    return { ...state, products: action.payload, loading: false };
  } else if (action.type == "FETCH_FAIL") {
    return { ...state, error: action.payload, loading: false };
  } else {
    return state;
  }
};
