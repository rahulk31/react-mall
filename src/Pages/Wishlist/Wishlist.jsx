import { useSelector } from "react-redux";
import cartVideo from "../../assets/cart.webm";
import Button from "../../components/Button/Button";
import ProductCard from "../../components/ProductCard/ProductCard";
import "../page.css";

const Wishlist = () => {
  const items = useSelector((state) => state.wishlist.items);
  const showWithoutItems = items.length === 0;
  return (
    <div className="page">
      <h1 className="page-description">Your Wishlisted Products</h1>
      {showWithoutItems ? (
        <div className="empty-wishlist">
          <video src={cartVideo} alt="empty-wishlist" autoPlay loop muted />
          <Button type="primary" text="Shop Now" link="/shop" />
        </div>
      ) : (
        <div className="products-container">
          {items.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
