import ProductFilters from "../../sections/ProductFilters/ProductFilters";
import ProductsList from "../../sections/ProductsList/ProductsList";
import "../page.css";

const Shop = () => {
  return (
    <div className="page">
      <h1 className="page-description">Shop from a diverse Product range</h1>
      {/* <ProductFilters /> */}
      <ProductsList />
    </div>
  );
};

export default Shop;
