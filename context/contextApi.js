import { createContext, useReducer } from "react";
import Cookies from "js-cookie";

export const contextApi = createContext();

const initState = {
  cart: Cookies.get("cart")
    ? JSON.parse(Cookies.get("cart"))
    : { cartItmes: [], shippingData: {} },
};

function reducer(state, action) {
  const { type, payload } = action;
  let newCart = [];
  switch (type) {
    case "ADD_ITEM":
      const newItem = payload;
      const existingItems = state.cart.cartItmes.find(
        (item) => item.id === newItem
      );
      let quantity = existingItems ? existingItems.quantity++ : 1;
      const cartItems = state.cart.cartItmes.filter(
        (item) => item.id !== newItem
      );
      newCart = [...cartItems, { id: newItem, quantity }];
      Cookies.set("cart", JSON.stringify({ cartItmes: [...newCart] }));
      return { ...state, cart: { cartItmes: [...newCart] } };

    case "REMOVE_ID":
      newCart = state.cart.cartItmes.filter((item) => item.id !== payload);
      Cookies.set("cart", JSON.stringify({ cartItmes: [...newCart] }));
      return { ...state, cart: { cartItmes: [...newCart] } };

    case "SAVE_SHIPPING_DATA":
      return {
        ...state,
        cart: {
          ...state.cart,
          shippingData: {
            ...state.cart.shippingData,
            ...action.payload,
          },
        },
      };
    default:
      return state;
  }
}

export function ContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initState);

  const value = { state, dispatch };
  return <contextApi.Provider value={value}>{children}</contextApi.Provider>;
}
