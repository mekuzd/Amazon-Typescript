import { Product } from "./Product";

export type Action =
  | { type: "FETCH_REQUEST" }
  | { type: "FETCH_SUCCESS"; payload: Product[] }
  | { type: "FETCH_FAIL"; payload: string }
  | { type: "FETCH_PRODUCT"; payload: Product };
