import Button from "../Button/Button";
import "./cartSummary.css";

const CartSummary = () => {
  return (
    <>
      <div className="cart-summary-container">
        <h3>Cart Summary</h3>
        <div className="cart-summary">
          <div className="cart-summary-item">
            <p>Subtotal</p>
            <p>₹ 2000</p>
          </div>
          <div className="cart-summary-item">
            <p>Shipping</p>
            <p>₹ 100</p>
          </div>
          <div className="cart-summary-item">
            <p>Taxes</p>
            <p>₹ 300</p>
          </div>
          <div className="cart-summary-item">
            <p>Total</p>
            <p>₹ 2400</p>
          </div>
        </div>
        <div className="cta-cart-summary-container">
          <Button type="primary" text="Proceed to Checkout" />
        </div>
      </div>
    </>
  );
};

export default CartSummary;
