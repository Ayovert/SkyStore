import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Cart, CartParams } from "../../app/model/Cart";

interface CartState {
  cart: Cart | null;
}

let nextId = 0;
const cartItems = localStorage.getItem("cartItems");
const initialState: CartState = {
  cart: {
    id: ++nextId,
    items: cartItems !== null ? JSON.parse(cartItems) : [],
  },
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    AddtoCart: (state: CartState, action: PayloadAction<CartParams>) => {
      const {
        product,
        quantity = 1,
        selectedCapacity,
        selectedColor,
        selectedSize,
      } = action.payload;

      const itemIndex = state.cart?.items.findIndex(
        (i) =>
          i.productId === product.id &&
          i.selectedColor === selectedColor &&
          i.selectedSize === selectedSize &&
          i.selectedCapacity === selectedCapacity
      );

      if (itemIndex === -1 || itemIndex === undefined) {
        state.cart!.items.push({
          ...product,
          quantity: quantity,
          productId: product.id,
          selectedCapacity: selectedCapacity,
          selectedColor: selectedColor,
          selectedSize: selectedSize,
        });
      } else {
        state.cart!.items[itemIndex] = {
          ...state.cart!.items[itemIndex],
          quantity: (state.cart!.items[itemIndex].quantity += quantity),
        };
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cart?.items));
    },
    RemoveFromCart: (state: CartState, action: PayloadAction<CartParams>) => {
      const {
        product,
        quantity = 1,
        selectedCapacity,
        selectedColor,
        selectedSize,
      } = action.payload;

      const itemIndex = state.cart?.items.findIndex(
        (i) =>
          i.productId === product.id &&
          i.selectedColor === selectedColor &&
          i.selectedSize === selectedSize &&
          i.selectedCapacity === selectedCapacity
      );

      if (itemIndex === -1 || itemIndex === undefined) return;

      state.cart!.items[itemIndex].quantity -= quantity;

      if (state.cart!.items[itemIndex].quantity === 0) {
        state.cart!.items.splice(itemIndex, 1);
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cart?.items));
    },
    ClearCart: (state: CartState, action: PayloadAction<CartParams>) => {
      const {
        product,
        selectedCapacity,
        selectedColor,
        selectedSize,
      } = action.payload;

      const itemIndex = state.cart?.items.findIndex(
        (i) =>
          i.productId === product.id &&
          i.selectedColor === selectedColor &&
          i.selectedSize === selectedSize &&
          i.selectedCapacity === selectedCapacity
      );

      if (itemIndex === -1 || itemIndex === undefined) return;
        state.cart!.items.splice(itemIndex, 1);

      localStorage.setItem("cartItems", JSON.stringify(state.cart?.items));
    },
  },
});

export const { AddtoCart, RemoveFromCart, ClearCart } = cartSlice.actions;
