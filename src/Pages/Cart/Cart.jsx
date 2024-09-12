import { useSelector } from "react-redux";
import cartVideo from "../../assets/cart.webm";
import HorizontalCard from "../../components/HorizontalCard/HorizontalCard";
import CartSummary from "../../components/CartSummary/CartSummary";
import Button from "../../components/Button/Button";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const itemsInCart = cart.items.length > 0;

  return (
    <div className="cart-page">
      <div className="page-description">ITEMS IN CART</div>
      {itemsInCart ? (
        <div className="cart-container">
          <div className="cart-products-container">
            {cart.items.map((item) => (
              <HorizontalCard
                key={item.item.id}
                item={item.item}
                quantity={item.quantity}
              />
            ))}
          </div>
          {itemsInCart && (
            <div className="cart-summary">
              <CartSummary
                subTotal={cart.totalAmount}
                shippingCharge={90}
                taxPercentage={8}
              />
            </div>
          )}
        </div>
      ) : (
        <div className="empty-cart">
          <video src={cartVideo} alt="empty-cart" autoPlay loop muted />
          <Button type="primary" text="Shop Now" link="/shop" />
        </div>
      )}
    </div>
  );
};

export default Cart;
