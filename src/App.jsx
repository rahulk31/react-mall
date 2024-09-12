import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Homepage from "./Pages/Homepage/Homepage";
import MenstackContainer from "./container/MenstackContainer";
import Shop from "./Pages/Shop/Shop";
import { Provider } from "react-redux";
import store from "./store/store";
import Cart from "./Pages/Cart/Cart";

const router = createBrowserRouter([
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
        path: "/shop",
        element: <Shop />,
      },
      {
        path: "/wishlist",
        // element: <MenstackContainer />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </>
  );
}

export default App;
