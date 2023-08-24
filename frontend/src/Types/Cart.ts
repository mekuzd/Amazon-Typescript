export type CartItem = {
  name: string;
  slug: string;
  image: string | undefined;
  quantity: number;
  price: number;
  countInStock: number;
  _id: string;
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
  itemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
};
