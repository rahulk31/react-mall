import Button from "../../components/Button/Button";
import "../page.css";

const Homepage = () => {
  return (
    <div className="page">
      <div className="hero-container">
        <h1 className="page-description">
          Your one-stop Shop for A-to-Z needs
        </h1>
        <div className="homepage-cta">
          <Button btnVariant="primary" text="Shop Now" link="/shop" />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
