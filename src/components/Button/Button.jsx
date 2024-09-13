import PropTypes from "prop-types";
import { btnVariants } from "../../utils/constants";
import "./button.css";
import { Link } from "react-router-dom";

const Button = ({ type, text, onClick, link, isDisabled }) => {
  const buttonContent = (
    <button
      className={`btn ${btnVariants[type]}`}
      onClick={onClick}
      disabled={isDisabled}
    >
      {text}
    </button>
  );

  return (
    <div className="btn-container">
      {link ? <Link to={link}>{buttonContent}</Link> : buttonContent}
    </div>
  );
};

Button.propTypes = {
  type: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  link: PropTypes.string,
  isDisabled: PropTypes.bool,
};

export default Button;
