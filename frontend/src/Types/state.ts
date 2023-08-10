import { Product } from "./Product";

export type State = {
  products: Product[];
  loading: boolean;
  error: string;
};
