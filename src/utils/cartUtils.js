import {
  addItemStatusToPending,
  addItemToCart,
} from "../store/slices/cartSlice";
import {
  addToWishlist,
  removeFromWishlist,
} from "../store/slices/wishlistSlice";

export const addToCartHandler = (dispatch, product) => {
  dispatch(addItemStatusToPending(product));
  setTimeout(() => {
    dispatch(addItemToCart(product));
  }, 1000);
};

export const handleWishlistToggle = (dispatch, isInWishlist, product, e) => {
  e.stopPropagation();
  if (isInWishlist) {
    dispatch(removeFromWishlist(product));
  } else {
    dispatch(addToWishlist(product));
  }
};

export const buyNowHandler = (dispatch, product, navigate, e) => {
  e.stopPropagation();
  dispatch(addItemStatusToPending(product));
  setTimeout(() => {
    dispatch(addItemToCart(product));
  }, 1000);
  navigate("/cart");
};
