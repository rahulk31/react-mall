import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/productsSlice";
import cartReducer from "./slices/cartSlice";

const store = configureStore({
  reducer: {
    // Add reducers here
    products: productReducer,
    cart: cartReducer,
  },
});

export default store;
