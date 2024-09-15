import {
  addItemStatusToPending,
  addItemToCart,
  deleteItemFromCart,
  decrementItemQuantity,
  incrementItemQuantity,
} from "../store/slices/cartSlice";
import {
  addToWishlist,
  removeFromWishlist,
} from "../store/slices/wishlistSlice";
import { setToast, clearToast } from "../store/slices/toastSlice";

export const clearToastAfterDelay = (dispatch) => {
  setTimeout(() => {
    dispatch(clearToast());
  }, 3000);
};

// Cart utils
const addToCartHandler = (dispatch, product) => {
  dispatch(addItemStatusToPending(product));
  setTimeout(() => {
    dispatch(addItemToCart(product));
    dispatch(setToast({ status: "success", message: "Item added to cart" }));
    clearToastAfterDelay(dispatch);
  }, 1000);
};

const decreaseQuantityHandler = (dispatch, product, disableDecrement) => {
  console.log(disableDecrement);
  if (disableDecrement === false) {
    dispatch(decrementItemQuantity(product));
    dispatch(
      setToast({ status: "success", message: "Item quantity decreased by 1" })
    );
  } else {
    dispatch(setToast({ status: "fail", message: "Quantity already 1" }));
  }
  clearToastAfterDelay(dispatch);
};

const increaseQuantityHandler = (dispatch, product) => {
  dispatch(incrementItemQuantity(product));
  dispatch(
    setToast({ status: "success", message: "Item quantity increased by 1" })
  );
  clearToastAfterDelay(dispatch);
};

const deleteFromCartHandler = (dispatch, product) => {
  setTimeout(() => {
    dispatch(deleteItemFromCart(product));
    dispatch(
      setToast({ status: "success", message: "Item removed from cart" })
    );
    clearToastAfterDelay(dispatch);
  }, 0);
};

// Wishlist utils
const addToWishlistAndShowToast = (dispatch, product) => {
  dispatch(addToWishlist(product));
  dispatch(setToast({ status: "success", message: "Item added in wishlist" }));
  clearToastAfterDelay(dispatch);
};

const removeFromWishlistAndShowToast = (dispatch, product) => {
  dispatch(removeFromWishlist(product));
  dispatch(
    setToast({ status: "success", message: "Item removed from wishlist" })
  );
  clearToastAfterDelay(dispatch);
};

const handleWishlistToggle = (dispatch, isInWishlist, product, e) => {
  e.stopPropagation();
  if (isInWishlist) {
    removeFromWishlistAndShowToast(dispatch, product);
  } else {
    addToWishlistAndShowToast(dispatch, product);
  }
};

const buyNowHandler = (dispatch, product, navigate, e) => {
  e.stopPropagation();
  dispatch(addItemStatusToPending(product));
  setTimeout(() => {
    dispatch(addItemToCart(product));
  }, 1000);
  navigate("/cart");
};

export {
  addToCartHandler,
  deleteFromCartHandler,
  increaseQuantityHandler,
  decreaseQuantityHandler,
  handleWishlistToggle,
  buyNowHandler,
};
