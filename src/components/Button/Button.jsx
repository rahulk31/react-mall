import PropTypes from "prop-types";
import { btnVariants } from "../../utils/constants";
import "./button.css";
import { Link } from "react-router-dom";

const Button = ({ type, text, onClick, link }) => {
  return (
    <>
      <Link to={link}>
        <button className={`btn ${btnVariants[type]}`} onClick={onClick}>
          {text}
        </button>
      </Link>
    </>
  );
};

Button.propTypes = {
  type: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default Button;
