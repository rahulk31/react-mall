import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";
import "./App.css";

// Lazy load components
const Homepage = lazy(() => import("./Pages/Homepage/Homepage"));
const MenstackContainer = lazy(() => import("./container/MenstackContainer"));
const Shop = lazy(() => import("./Pages/Shop/Shop"));
const Cart = lazy(() => import("./Pages/Cart/Cart"));
const Wishlist = lazy(() => import("./Pages/Wishlist/Wishlist"));
const ProductPage = lazy(() => import("./Pages/ProductPage/ProductPage"));
const AuthPage = lazy(() => import("./Pages/Auth/Auth"));

// Routes configuration
const routes = [
  {
    path: "/",
    element: <MenstackContainer />,
    errorElement: <div>404</div>,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
      {
        path: "shop",
        element: <Shop />,
      },
      {
        path: "product/:id",
        element: <ProductPage />,
      },
      {
        path: "wishlist",
        element: <Wishlist />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "/login",
        element: <AuthPage />,
      },
      {
        path: "/logout",
        element: <Shop />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

function App() {
  return (
    <Provider store={store}>
      <Suspense fallback={<LoadingSpinner />}>
        <RouterProvider router={router} />
      </Suspense>
    </Provider>
  );
}

export default App;
