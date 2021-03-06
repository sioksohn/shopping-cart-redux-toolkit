import { createSlice } from "@reduxjs/toolkit";
export type Item = {
  id: string;
  price: number;
  quantity: number;
  totalPrice: number;
  title: string;
};

type InitialCartState = {
  id: any;
  items: Item[];
  totalQuantity: number;
};

const initialState: InitialCartState = {
  id: "",
  items: [],
  totalQuantity: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity++;
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          title: newItem.title,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }
    },
    removeItemFromCart(state, action) {
      const id = action.payload;
      const existingItem: Item | undefined = state.items.find(
        (item) => item.id === id
      );
      state.totalQuantity--;
      if (existingItem) {
        if (existingItem.quantity === 1) {
          state.items = state.items.filter((item) => item.id !== id);
        } else {
          existingItem.quantity--;
        }
      }
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
