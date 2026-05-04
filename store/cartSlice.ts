import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CartLineItem } from "@/types";

export type CartRootState = {
  items: CartLineItem[];
};

const initialState: CartRootState = {
  items: [],
};

/**
 * Cart slice: lines keyed by Sanity product `_id`.
 * Prices shown in UI come from the client payload but checkout always re-prices on the server.
 */
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(
      state,
      action: PayloadAction<
        Omit<CartLineItem, "quantity"> & { quantity?: number }
      >,
    ) {
      const qty = action.payload.quantity ?? 1;
      const existing = state.items.find(
        (i) => i.productId === action.payload.productId,
      );
      if (existing) {
        existing.quantity += qty;
      } else {
        state.items.push({
          productId: action.payload.productId,
          slug: action.payload.slug,
          title: action.payload.title,
          price: action.payload.price,
          imageUrl: action.payload.imageUrl,
          quantity: qty,
        });
      }
    },
    removeFromCart(state, action: PayloadAction<{ productId: string }>) {
      state.items = state.items.filter(
        (i) => i.productId !== action.payload.productId,
      );
    },
    updateQuantity(
      state,
      action: PayloadAction<{ productId: string; quantity: number }>,
    ) {
      const item = state.items.find(
        (i) => i.productId === action.payload.productId,
      );
      if (!item) return;
      if (action.payload.quantity <= 0) {
        state.items = state.items.filter(
          (i) => i.productId !== action.payload.productId,
        );
      } else {
        item.quantity = action.payload.quantity;
      }
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;
