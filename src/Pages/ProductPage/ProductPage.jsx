import { useCallback, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Rating from "../../components/Rating/Rating";
import Button from "../../components/Button/Button";
import "./productPage.css";
import {
  addItemStatusToPending,
  addItemToCart,
} from "../../store/slices/cartSlice";
import { FaSpinner } from "react-icons/fa";

const ProductPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const product = useSelector((state) =>
    state.products.items.find((item) => item.id === Number(id))
  );

  console.log("product page = ", product);

  const productStatus = useSelector((state) => state.cart.status[product.id]);

  const getButtonText = useMemo(() => {
    if (productStatus === "pending") {
      return <FaSpinner className="spinner" />;
    }
    if (productStatus === "added") {
      return "Added";
    }
    return "Add to Cart";
  }, [productStatus]);

  const addToCartHandler = useCallback(() => {
    dispatch(addItemStatusToPending(product));

    setTimeout(() => {
      dispatch(addItemToCart(product));
    }, 1000);
  }, [dispatch, product]);

  const buyNowHandler = useCallback(() => {
    dispatch(addItemStatusToPending(product));
    setTimeout(() => {
      dispatch(addItemToCart(product));
    }, 1000);
    navigate("/cart");
  }, [dispatch, product, navigate]);

  if (!product) {
    return <div>Product not found!</div>;
  }
  return (
    <div className="page">
      <h1 className="page-description">Product details</h1>
      <div className="product-page-container">
        <div className="product-image">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="product-details">
          <h2>{product.title}</h2>
          <p>{product.description}</p>
          <Rating rating={product.rating} />
          <p className="item-pp-price">₹ {product.price}</p>
        </div>
        <div className="cta-container">
          <Button
            type="secondary"
            text={getButtonText}
            onClick={() => {
              addToCartHandler();
            }}
            className="cta-button"
            isDisabled={productStatus === "added"}
          />
          <Button
            type="primary"
            text="Buy Now"
            className="cta-button"
            onClick={buyNowHandler}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
