import { useSelector } from "react-redux";
import emptyWishlist from "../../assets/shopp.svg";
import LoginImage from "../../assets/loginImage.svg";
import ProductCard from "../../components/ProductCard/ProductCard";
import LoginRedirect from "../../components/LoginRedirect/LoginRedirect";
import "../page.css";

const Wishlist = () => {
  const items = useSelector((state) => state.wishlist.items);
  const showWithoutItems = items.length === 0;

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

  if (showWithoutItems) {
    return (
      <LoginRedirect
        text="No items in wishlist, start wishlisting now"
        image={emptyWishlist}
        link="/shop"
        btnText="Start Shopping"
      />
    );
  }

  return (
    <div className="page">
      <h1 className="page-description">Your Wishlisted Products</h1>

      <div className="products-container">
        {items.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
