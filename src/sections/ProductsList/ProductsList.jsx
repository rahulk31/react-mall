import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchProducts } from "../../store/slices/productsSlice";
import ProductCard from "../../components/ProductCard/ProductCard";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import "./productsList.css";

const ProductsList = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);

  useEffect(() => {
    if (products.items.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.items.length]);

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

  return (
    <div>
      <div className="products-container">{renderProducts}</div>
    </div>
  );
};

export default ProductsList;
