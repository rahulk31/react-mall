import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalAmount: 0,
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
    },
  },
});

export const { addItemToCart } = cartSlice.actions;
export default cartSlice.reducer;
