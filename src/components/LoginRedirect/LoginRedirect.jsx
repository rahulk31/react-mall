import PropTypes from "prop-types";
import Button from "../Button/Button";

const LoginRedirect = ({ text, image, link, btnText }) => {
  // component code here
  return (
    <div className="page">
      <h2 className="page-description">{text}</h2>
      <div className="empty-cart">
        <img src={image} alt={image} width={200} />
        <Button btnVariant="secondary" text={btnText} link={link} />
      </div>
    </div>
  );
};

LoginRedirect.propTypes = {
  text: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  btnText: PropTypes.string.isRequired,
};

export default LoginRedirect;
