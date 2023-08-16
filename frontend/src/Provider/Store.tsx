import { useReducer, createContext } from "react";
import { Cart, CartItem } from "../Types/Cart";
type AppState = {
  mode: string;
  cart: Cart;
};

const initialState: AppState = {
  mode: localStorage.getItem("mode")
    ? localStorage.getItem("mode")!
    : window.matchMedia &&
      window.matchMedia("(prefers-color-scheme : dark)").matches
    ? "dark"
    : "light",
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems")!)
      : [],
    shippingAddress: localStorage.getItem("shippingAddress")
      ? JSON.parse(localStorage.getItem("shippingAddress")!)
      : {},
    paymentMethod: localStorage.getItem("cartItems")
      ? localStorage.getItem("cartItems")!
      : "Paypal",
    itemprice: 0,
    shippingPrice: 0,
    taxPrice: 0,
    totalPrice: 0,
  },
};

type Action =
  | {
      type: "SWITCH_MODE";
    }
  | {
      type: "ADD_TO_CART";
      payload: CartItem;
    }
  | {
      type: "CART_REMOVE_ITEM";
      payload: CartItem;
    };

function reducer(state: AppState, action: Action): AppState {
  if (action.type == "SWITCH_MODE") {
    localStorage.setItem("mode", state.mode === "dark" ? "light" : "dark");
    return { ...state, mode: state.mode === "dark" ? "light" : "dark" };
  } else if (action.type == "ADD_TO_CART") {
    const newItem = action.payload;
    const existingItem = state.cart.cartItems.find(
      (item: CartItem) => item._id == newItem._id,
    );

    const cartItems = existingItem
      ? state.cart.cartItems.map((item: CartItem) =>
          item._id == existingItem._id ? newItem : item,
        )
      : [...state.cart.cartItems, newItem];
    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    return { ...state, cart: { ...state.cart, cartItems } };
  } else if (action.type == "CART_REMOVE_ITEM") {
    const cartItems = state.cart.cartItems.filter(
      (item) => item._id !== action.payload._id,
    );
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    return { ...state, cart: { ...state.cart, cartItems } };
  } else {
    return state;
  }
}

const defaultDispatch: React.Dispatch<Action> = () => initialState;

const Store = createContext({
  state: initialState,
  dispatch: defaultDispatch,
});

function StoreProvider(props: React.PropsWithChildren<{}>) {
  const [state, dispatch] = useReducer<React.Reducer<AppState, Action>>(
    reducer,
    initialState,
  );

  return <Store.Provider value={{ state, dispatch }} {...props} />;
}
export { Store, StoreProvider };
