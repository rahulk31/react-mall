import PropTypes from "prop-types";
import { IoRemoveOutline, IoAddOutline, IoTrashOutline } from "react-icons/io5";
import "./horizontalCard.css";
import Rating from "../Rating/Rating";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  decreaseQuantityHandler,
  deleteFromCartHandler,
  increaseQuantityHandler,
} from "../../utils/cartUtils";

const HorizontalCard = ({ item, quantity, disableDecrement }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const navigateToProduct = (e) => {
    e.stopPropagation();
    navigate(`/product/${item.id}`);
  };
  return (
    <div className="horizontal-card-container">
      <div className="card-container" onClick={(e) => navigateToProduct(e)}>
        <div className="item-image-container">
          <img src={item.image} alt="" />
        </div>
        <div className="item-details-container">
          <h4 className="item-title">{item.title}</h4>
          <div className="price-rating-hcontainer">
            <Rating rating={item.rating} />
            <p className="item-price">₹ {item.price}</p>
          </div>
        </div>
      </div>
      <div className="cta-horizontal-card-container">
        <div className="quantity-container">
          <IoRemoveOutline
            className="icon"
            onClick={() =>
              decreaseQuantityHandler(dispatch, item, disableDecrement)
            }
          />
          <p className="quantity">{quantity}</p>
          <IoAddOutline
            className="icon"
            onClick={() => increaseQuantityHandler(dispatch, item)}
          />
        </div>
        <IoTrashOutline
          className="icon delete-icon"
          onClick={() => deleteFromCartHandler(dispatch, item)}
        />
      </div>
    </div>
  );
};

HorizontalCard.propTypes = {
  item: PropTypes.object.isRequired,
  quantity: PropTypes.number.isRequired,
  disableDecrement: PropTypes.bool.isRequired,
};

export default HorizontalCard;
