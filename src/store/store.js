import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/productsSlice";
import cartReducer from "./slices/cartSlice";
import wishlistReducer from "./slices/wishlistSlice";
import toastReducer from "./slices/toastSlice";

const store = configureStore({
  reducer: {
    // Add reducers here
    products: productReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    toast: toastReducer,
  },
});

export default store;
