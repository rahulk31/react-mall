import { useSelector } from "react-redux";
import HorizontalCard from "../../components/HorizontalCard/HorizontalCard";
import CartSummary from "../../components/CartSummary/CartSummary";
import LoginRedirect from "../../components/LoginRedirect/LoginRedirect";
import LoginImage from "../../assets/loginImage.svg";
import EmptyCart from "../../assets/shopp.svg";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const itemsInCart = cart.items.length > 0;

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  if (!isLoggedIn) {
    return (
      <LoginRedirect
        text="You need to login to view this page"
        image={LoginImage}
        link={"/login"}
        btnText="Login now"
      />
    );
  }

  if (!itemsInCart) {
    return (
      <LoginRedirect
        text="No items in cart, start adding"
        image={EmptyCart}
        link={"/shop"}
        btnText="Start Shopping"
      />
    );
  }

  return (
    <div className="page">
      <div className="page-description">ITEMS IN CART</div>

      <div className="cart-container">
        <div className="cart-products-container">
          {cart.items.map((item) => (
            <HorizontalCard
              key={item.item.id}
              item={item.item}
              quantity={item.quantity}
              disableDecrement={item.disableDecrement}
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
    </div>
  );
};

export default Cart;
