import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { IoHeartOutline, IoHeart } from "react-icons/io5";
import "./productCard.css";
import Rating from "../Rating/Rating";
import { addItemToCart } from "../../store/slices/cartSlice";
import {
  addToWishlist,
  removeFromWishlist,
  selectItemIsInWishlist,
} from "../../store/slices/wishlistSlice";
import Button from "../Button/Button";

const ProductCard = ({ product }) => {
  const productPrice = Math.ceil(product.price);

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const isInWishlist = useSelector((state) =>
    selectItemIsInWishlist(state, product.id)
  );

  console.log(cart);

  return (
    <>
      <div className="product-container">
        <div className="product-image">
          <img src={product.image} alt={product.title} />
          {isInWishlist ? (
            <IoHeart
              className="icon wishlist-icon wishlisted"
              onClick={() => dispatch(removeFromWishlist(product))}
            />
          ) : (
            <IoHeartOutline
              className="icon wishlist-icon"
              onClick={() => dispatch(addToWishlist(product))}
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
            text="Add to Cart"
            onClick={() => dispatch(addItemToCart(product))}
          />
          <Button type="primary" text="Buy Now" />
        </div>
      </div>
    </>
  );
};

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
};

export default ProductCard;
