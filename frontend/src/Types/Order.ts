import { CartItem, shippingAddress } from "./Cart";
import { User } from "./User";

export type Order = {
  shippingAddress?: shippingAddress;
  paymentMethod?: string;
  user?: User;
  createdAt?: string;
  isPaid?: boolean;
  paidAt?: string;
  isDelivered?: boolean;
  deliveredAt?: string;
  _id?: string;
  orderItems?: CartItem[];
  itemsPrice?: number;
  shippingPrice?: number;
  taxPrice?: number;
  totalPrice?: number;
};
