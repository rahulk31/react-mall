import { useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import { FaSpinner } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { IoHeartOutline, IoHeart } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import Rating from "../Rating/Rating";
import Button from "../Button/Button";
import { selectItemIsInWishlist } from "../../store/slices/wishlistSlice";
import {
  addToCartHandler,
  handleWishlistToggle,
  buyNowHandler,
} from "../../utils/cartUtils";
import "./productCard.css";
import { useIsMobile } from "../../hooks/isMobile";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  // console.log(isMobile);

  const productPrice = useMemo(() => Math.ceil(product.price), [product.price]);

  const productStatus = useSelector((state) => state.cart.status[product.id]);
  const isInWishlist = useSelector((state) =>
    selectItemIsInWishlist(state, product.id)
  );
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const memoizedAddToCartHandler = useCallback(() => {
    if (isLoggedIn === false) {
      navigate("/login");
      return;
    }
    addToCartHandler(dispatch, product);
  }, [dispatch, product, navigate, isLoggedIn]);

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
    (e) => {
      e.stopPropagation();
      if (isLoggedIn === false) {
        navigate("/login");
        return;
      }
      handleWishlistToggle(dispatch, isInWishlist, product, e);
    },
    [dispatch, isInWishlist, product, isLoggedIn, navigate]
  );

  const memoizedBuyNowHandler = useCallback(
    (e) => {
      if (isLoggedIn === false) {
        navigate("/login");
        return;
      }
      buyNowHandler(dispatch, product, navigate, e);
    },
    [dispatch, product, navigate, isLoggedIn]
  );

  const openProductPage = useCallback(() => {
    navigate(`/product/${product.id}`);
  }, [navigate, product.id]);

  const renderCTABtns = () => {
    if (isMobile) {
      return (
        <div className="cta-container">
          <Button
            btnVariant="secondary"
            text="Check details"
            onClick={() => navigate(`/product/${product.id}`)}
          />
        </div>
      );
    } else {
      return (
        <div className="cta-container">
          <Button
            btnVariant="secondary"
            text={getButtonText}
            onClick={(e) => {
              e.stopPropagation();
              memoizedAddToCartHandler();
            }}
            className="cta-button"
            isDisabled={productStatus === "added"}
          />
          <Button
            btnVariant="primary"
            text="Buy Now"
            className="cta-button"
            onClick={memoizedBuyNowHandler}
          />
        </div>
      );
    }
  };

  return (
    <div className="product-container">
      <div className="product-image" onClick={openProductPage}>
        <img src={product.image} alt={product.title} />
        {isInWishlist ? (
          <IoHeart
            className="icon wishlist-icon wishlisted"
            onClick={(e) => memoizedHandleWishlistToggle(e)}
          />
        ) : (
          <IoHeartOutline
            className="icon wishlist-icon"
            onClick={(e) => memoizedHandleWishlistToggle(e)}
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
      {renderCTABtns()}
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
