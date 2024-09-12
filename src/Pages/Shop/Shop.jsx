import { useDispatch, useSelector } from "react-redux";
import "../page.css";
import { useEffect } from "react";
import { fetchProducts } from "../../store/slices/productsSlice";
import ProductCard from "../../components/ProductCard/ProductCard";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

const Shop = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (products.loading) {
    return (
      <div className="page">
        <LoadingSpinner />
      </div>
    );
  }

  if (products.errors) {
    return <div className="page">{products.errors}</div>;
  }

  const renderProducts = products.items.map((product) => (
    <ProductCard key={product.id} product={product} />
  ));

  console.log("render products = ", renderProducts);

  return (
    <div className="page">
      <h1 className="page-description">Shop from a diverse Product range</h1>
      <div className="products-container">{renderProducts}</div>
    </div>
  );
};

export default Shop;
