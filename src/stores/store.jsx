import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import authSlice from "./authSlice";
import themeSlice from "./themeSlice"

export const store = configureStore({
  reducer: {
    cart: cartSlice,
    auth: authSlice,
    theme: themeSlice,
  },
});

store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem("cart", JSON.stringify(state.cart.cart));
});
