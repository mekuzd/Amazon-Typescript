export type CartItem = {
  name: string;
  slug: string;
  image: string | undefined;
  quantity: string;
  price: number;
  countInStock: number;
  _id: number;
};
export type shippingAddress = {
  fullName: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
};
export type Cart = {
  cartItems: CartItem[];
  shippingAddress: shippingAddress;
  paymentMethod: string;
  itemprice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
};
