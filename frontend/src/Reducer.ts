import { State } from "./Types/state";
import { Action } from "./Types/Action";

export const reducer = (state: State, action: Action) => {
  if (action.type == "FETCH_REQUEST") {
    return { ...state, loading: true };
  } else if (action.type == "FETCH_SUCCESS") {
    return { ...state, products: action.payload, loading: false };
  } else if (action.type == "FETCH_FAIL") {
    return { ...state, error: action.payload, loading: false };
  } else if (action.type == "FETCH_PRODUCT") {
    return { ...state, product: action.payload, loading: false };
  } else {
    return state;
  }
};
