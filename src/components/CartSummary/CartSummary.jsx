import PropTypes from "prop-types";
import Button from "../Button/Button";
import "./cartSummary.css";

const CartSummary = ({ subTotal, shippingCharge, taxPercentage }) => {
  const newSubTotal = Number(subTotal).toFixed(2);
  const taxTotal = Number(subTotal + shippingCharge).toFixed(2);
  const taxCharge = Number((taxTotal * taxPercentage) / 100).toFixed(2);
  const total = Number(Number(taxTotal) + Number(taxCharge)).toFixed(2);

  return (
    <>
      <div className="cart-summary-container">
        <h3>Cart Summary</h3>
        <div className="cart-summary">
          <div className="cart-summary-item">
            <p>Subtotal</p>
            <p>₹ {newSubTotal}</p>
          </div>
          <div className="cart-summary-item">
            <p>Shipping</p>
            <p>₹ {shippingCharge}</p>
          </div>
          <div className="cart-summary-item">
            <p>Taxes</p>
            <p>₹ {taxCharge}</p>
          </div>
          <div className="cart-summary-item">
            <p>Total</p>
            <p>₹ {total}</p>
          </div>
        </div>
        <div className="cta-cart-summary-container">
          <Button btnVariant="primary" text="Proceed to Checkout" />
        </div>
      </div>
    </>
  );
};

CartSummary.propTypes = {
  subTotal: PropTypes.number.isRequired,
  shippingCharge: PropTypes.number.isRequired,
  taxPercentage: PropTypes.number.isRequired,
};

export default CartSummary;
