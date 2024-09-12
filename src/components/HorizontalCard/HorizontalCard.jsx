import PropTypes from "prop-types";
import { IoRemoveOutline, IoAddOutline, IoTrashOutline } from "react-icons/io5";
import "./horizontalCard.css";
import Rating from "../Rating/Rating";

const HorizontalCard = ({ item }) => {
  return (
    <div className="horizontal-card-container">
      <div className="card-container">
        <div className="item-image-container">
          <img src={item.image} alt="" />
        </div>
        <div className="item-details-container">
          <h4 className="item-title">{item.title}</h4>
          <div className="price-rating-container">
            <Rating rating={item.rating} />
            <p className="item-price">₹ {item.price}</p>
          </div>
        </div>
      </div>
      <div className="cta-horizontal-card-container">
        <div className="quantity-container">
          <IoRemoveOutline className="icon" />
          <p className="quantity">1</p>
          <IoAddOutline className="icon" />
        </div>
        <IoTrashOutline className="icon delete-icon" />
      </div>
    </div>
  );
};

HorizontalCard.propTypes = {
  item: PropTypes.object.isRequired,
};

export default HorizontalCard;
