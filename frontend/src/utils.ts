import { CartItem } from "./Types/Cart";
import { Product } from "./Types/Product";
import { ApiError } from "./Types/apiError";

export const getError = (error: ApiError) => {
  return error.message && error.response.data.message
    ? error.response.data.message
    : error.message;
};

export const convertProductToCartItem = (product: Product): CartItem => {
  const cartItem: CartItem = {
    _id: product._id!,
    name: product.name!,
    slug: product.slug!,
    image: product.image,
    quantity: 1,
    price: product.price!,
    countInStock: product.countInStock!,
  };
  return cartItem;
};
