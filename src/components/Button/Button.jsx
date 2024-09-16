import PropTypes from "prop-types";
import { btnVariants } from "../../utils/constants";
import "./button.css";
import { Link } from "react-router-dom";

const Button = ({ btnVariant, text, onClick, link, isDisabled, type }) => {
  const buttonContent = (
    <button
      className={`${btnVariants[btnVariant]}`}
      onClick={onClick}
      disabled={isDisabled}
      type={type ? type : "button"}
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
  btnVariant: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  link: PropTypes.string,
  isDisabled: PropTypes.bool,
  type: PropTypes.string,
};

export default Button;
