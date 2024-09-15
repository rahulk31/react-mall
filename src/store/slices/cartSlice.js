import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalAmount: 0,
  status: {},
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find(
        (item) => item.item.id === newItem.id
      );

      if (existingItem) {
        existingItem.quantity++;
        existingItem.disableDecrement = existingItem.quantity === 1; // Disable decrement if quantity is 1
      } else {
        state.items.push({
          item: newItem,
          quantity: 1,
          disableDecrement: true, // Disable decrement for new item since its quantity is 1
        });
      }

      state.totalAmount += newItem.price;
      state.status[newItem.id] = "added";
    },

    addItemStatusToPending(state, action) {
      state.status[action.payload.id] = "pending";
    },

    decrementItemQuantity(state, action) {
      const itemToRemove = action.payload;
      const existingItem = state.items.find(
        (item) => item.item.id === itemToRemove.id
      );

      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity--;
        state.totalAmount -= itemToRemove.price;

        // After decrementing, update the disableDecrement flag
        existingItem.disableDecrement = existingItem.quantity === 1;
      }
    },

    incrementItemQuantity(state, action) {
      const itemToAdd = action.payload;
      const existingItem = state.items.find(
        (item) => item.item.id === itemToAdd.id
      );

      if (existingItem) {
        existingItem.quantity++;
        state.totalAmount += itemToAdd.price;

        // After incrementing, update the disableDecrement flag
        existingItem.disableDecrement = existingItem.quantity === 1;
      }
    },

    deleteItemFromCart(state, action) {
      const itemToDelete = action.payload;
      const existingItemIndex = state.items.findIndex(
        (item) => item.item.id === itemToDelete.id
      );

      if (existingItemIndex !== -1) {
        const existingItem = state.items[existingItemIndex];
        state.totalAmount -= existingItem.item.price * existingItem.quantity;
        state.items.splice(existingItemIndex, 1);
        state.status[itemToDelete.id] = null;
      }
    },
  },
});

export const {
  addItemToCart,
  decrementItemQuantity,
  incrementItemQuantity,
  deleteItemFromCart,
  addItemStatusToPending,
} = cartSlice.actions;

export default cartSlice.reducer;
