import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalAmount: 0,
    status: {},
  },
  reducers: {
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find(
        (item) => item.item.id === newItem.id
      );
      if (!existingItem) {
        state.items.push({
          item: newItem,
          quantity: 1,
        });
      } else {
        existingItem.quantity++;
      }
      state.totalAmount += newItem.price;
      state.status[newItem.id] = "added";
    },

    addItemStatusToPending(state, action) {
      state.status[action.payload.id] = "pending";
    },

    removeItemFromCart(state, action) {
      const itemToRemove = action.payload;
      const existingItem = state.items.find(
        (item) => itemToRemove.id === item.item.id
      );
      if (existingItem.quantity === 1) {
        state.items = state.items.filter(
          (item) => item.item.id !== itemToRemove.id
        );
      } else {
        existingItem.quantity--;
      }
      state.totalAmount -= itemToRemove.price;
    },

    deleteItemFromCart(state, action) {
      const itemToDelete = action.payload;
      state.items = state.items.filter((item) => {
        if (item.item.id === itemToDelete.id) {
          state.totalAmount -= item.item.price * item.quantity;
          state.status[item.item.id] = null;
        }
        return item.item.id !== itemToDelete.id;
      });
    },
  },
});

export const {
  addItemToCart,
  removeItemFromCart,
  deleteItemFromCart,
  addItemStatusToPending,
} = cartSlice.actions;
export default cartSlice.reducer;
