import PropTypes from "prop-types";
import { btnVariants } from "../../utils/constants";
import "./button.css";

const Button = ({ type, text, onClick }) => {
  return (
    <button className={`btn ${btnVariants[type]}`} onClick={onClick}>
      {text}
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default Button;
