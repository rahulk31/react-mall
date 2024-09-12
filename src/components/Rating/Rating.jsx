import PropTypes from "prop-types";
import { IoStarHalf } from "react-icons/io5";
import "./rating.css";

const Rating = ({ rating }) => {
  const { rate, count } = rating;

  const ratingColors = {
    1: "red",
    2: "orange",
    3: "yellow",
    4: "lightgreen",
    5: "green",
  };

  const floorRate = Math.floor(rate);

  const renderRating = (
    <div className={`rating-container ${ratingColors[floorRate]}`}>
      <IoStarHalf style={{ color: "#000", fontSize: "12px" }} />
      <div className="rating">
        {rate}({count})
      </div>
    </div>
  );

  return <div>{renderRating}</div>;
};

Rating.propTypes = {
  rating: PropTypes.shape({
    rate: PropTypes.number.isRequired,
    count: PropTypes.number.isRequired,
  }).isRequired,
};

export default Rating;
