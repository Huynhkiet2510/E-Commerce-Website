import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: JSON.parse(localStorage.getItem("cart")) || [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existing = state.cart.find(item => item.id === product.id);
      if (existing) {
        if (existing.quantity >= product.stock) {
          alert("Hết hàng!");
          return;
        }
        existing.quantity += 1;
      }
      else {
        if (product.stock <= 0) {
          alert("Hết hàng!");
          return;
        }
        state.cart.push({ ...product, quantity: 1 });
      }
    },

    removeFromCart: (state, action) => {
      state.cart = state.cart.filter(item => item.id !== action.payload);
    },
    increaseQuantity: (state, action) => {
      const item = state.cart.find(item => item.id === action.payload);
      if (item) item.quantity += 1;
    },
    decreaseQuantity: (state, action) => {
      const item = state.cart.find(item => item.id === action.payload);
      if (item) {
        item.quantity -= 1;
        if (item.quantity === 0) {
          state.cart = state.cart.filter(i => i.id !== action.payload);
        }
      }
    },
    clearCart: state => {
      state.cart = [];
    },
  },
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
