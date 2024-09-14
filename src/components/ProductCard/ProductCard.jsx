import { useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import { FaSpinner } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { IoHeartOutline, IoHeart } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import Rating from "../Rating/Rating";
import Button from "../Button/Button";
import { selectItemIsInWishlist } from "../../store/slices/wishlistSlice";
import "./productCard.css";
import {
  addToCartHandler,
  handleWishlistToggle,
  buyNowHandler,
} from "../../utils/cartUtils";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productPrice = useMemo(() => Math.ceil(product.price), [product.price]);

  const productStatus = useSelector((state) => state.cart.status[product.id]);
  const isInWishlist = useSelector((state) =>
    selectItemIsInWishlist(state, product.id)
  );

  const memoizedAddToCartHandler = useCallback(
    () => addToCartHandler(dispatch, product),
    [dispatch, product]
  );

  const getButtonText = useMemo(() => {
    if (productStatus === "pending") {
      return <FaSpinner className="spinner" />;
    }
    if (productStatus === "added") {
      return "Added";
    }
    return "Add to Cart";
  }, [productStatus]);

  const memoizedHandleWishlistToggle = useCallback(
    (e) => handleWishlistToggle(dispatch, isInWishlist, product, e),
    [dispatch, isInWishlist, product]
  );

  const memoizedBuyNowHandler = useCallback(
    (e) => buyNowHandler(dispatch, product, navigate, e),
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
            onClick={memoizedHandleWishlistToggle}
          />
        ) : (
          <IoHeartOutline
            className="icon wishlist-icon"
            onClick={memoizedHandleWishlistToggle}
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
            memoizedAddToCartHandler();
          }}
          className="cta-button"
          isDisabled={productStatus === "added"}
        />
        <Button
          type="primary"
          text="Buy Now"
          className="cta-button"
          onClick={memoizedBuyNowHandler}
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
