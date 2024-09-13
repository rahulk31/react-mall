import PropTypes from "prop-types";
import { IoRemoveOutline, IoAddOutline, IoTrashOutline } from "react-icons/io5";
import "./horizontalCard.css";
import Rating from "../Rating/Rating";
import { useDispatch } from "react-redux";
import {
  addItemToCart,
  deleteItemFromCart,
  removeItemFromCart,
} from "../../store/slices/cartSlice";

const HorizontalCard = ({ item, quantity }) => {
  const dispatch = useDispatch();
  return (
    <div className="horizontal-card-container">
      <div className="card-container">
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
            onClick={() => dispatch(removeItemFromCart(item))}
          />
          <p className="quantity">{quantity}</p>
          <IoAddOutline
            className="icon"
            onClick={() => dispatch(addItemToCart(item))}
          />
        </div>
        <IoTrashOutline
          className="icon delete-icon"
          onClick={() => dispatch(deleteItemFromCart(item))}
        />
      </div>
    </div>
  );
};

HorizontalCard.propTypes = {
  item: PropTypes.object.isRequired,
  quantity: PropTypes.number.isRequired,
};

export default HorizontalCard;
