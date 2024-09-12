import { useSelector } from "react-redux";
import HorizontalCard from "../../components/HorizontalCard/HorizontalCard";
import CartSummary from "../../components/CartSummary/CartSummary";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  return (
    <div className="page">
      <div className="page-description">ITEMS IN CART</div>
      <div className="cart-container">
        <div className="cart-products-container">
          {cart.items.map((item) => (
            <HorizontalCard key={item.item.id} item={item.item} />
          ))}
        </div>
        <div className="cart-summary">
          <CartSummary />
        </div>
      </div>
    </div>
  );
};

export default Cart;
