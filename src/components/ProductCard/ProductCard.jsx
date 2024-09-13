import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { IoHeartOutline, IoHeart } from "react-icons/io5";
import { FaSpinner } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useMemo, useCallback } from "react";
import Rating from "../Rating/Rating";
import {
  addItemStatusToPending,
  addItemToCart,
} from "../../store/slices/cartSlice";
import {
  addToWishlist,
  removeFromWishlist,
  selectItemIsInWishlist,
} from "../../store/slices/wishlistSlice";
import Button from "../Button/Button";
import "./productCard.css";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productPrice = useMemo(() => Math.ceil(product.price), [product.price]);

  const productStatus = useSelector((state) => state.cart.status[product.id]);
  const isInWishlist = useSelector((state) =>
    selectItemIsInWishlist(state, product.id)
  );

  const addToCartHandler = useCallback(() => {
    dispatch(addItemStatusToPending(product));
    setTimeout(() => {
      dispatch(addItemToCart(product));
    }, 1000);
  }, [dispatch, product]);

  const getButtonText = useMemo(() => {
    if (productStatus === "pending") {
      return <FaSpinner className="spinner" />;
    }
    if (productStatus === "added") {
      return "Added";
    }
    return "Add to Cart";
  }, [productStatus]);

  const handleWishlistToggle = useCallback(
    (e) => {
      e.stopPropagation();
      if (isInWishlist) {
        dispatch(removeFromWishlist(product));
      } else {
        dispatch(addToWishlist(product));
      }
    },
    [dispatch, isInWishlist, product]
  );

  const buyNowHandler = useCallback(
    (e) => {
      e.stopPropagation();
      dispatch(addItemStatusToPending(product));
      setTimeout(() => {
        dispatch(addItemToCart(product));
      }, 1000);
      navigate("/cart");
    },
    [dispatch, product, navigate]
  );

  const openProductPage = useCallback(() => {
    navigate(`/product/${product.id}`);
  }, [navigate, product.id]);

  return (
    <div className="product-container">
      <div className="product-image" onClick={openProductPage}>
        <img src={product.image} alt={product.title} />
        {isInWishlist ? (
          <IoHeart
            className="icon wishlist-icon wishlisted"
            onClick={handleWishlistToggle}
          />
        ) : (
          <IoHeartOutline
            className="icon wishlist-icon"
            onClick={handleWishlistToggle}
          />
        )}
      </div>
      <div className="product-details-container">
        <h4 className="product-title">{product.title}</h4>
        <div className="price-rating-container">
          <p className="product-price">₹ {productPrice}</p>
          <Rating rating={product.rating} />
        </div>
      </div>
      <div className="cta-container">
        <Button
          type="secondary"
          text={getButtonText}
          onClick={(e) => {
            e.stopPropagation();
            addToCartHandler();
          }}
          className="cta-button"
          isDisabled={productStatus === "added"}
        />
        <Button
          type="primary"
          text="Buy Now"
          className="cta-button"
          onClick={(e) => buyNowHandler(e)}
        />
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    rating: PropTypes.object.isRequired,
  }).isRequired,
};

export default ProductCard;
