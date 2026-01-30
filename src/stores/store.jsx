import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import authReducer from "./authSlice";

export const store = configureStore({
  reducer: {
    cart: cartSlice,
    auth: authReducer,
  },
});

store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem("cart", JSON.stringify(state.cart.cart));
});
