import "./navbar.css";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">
          <h3>MALL</h3>
        </Link>
      </div>
      <ul>
        <NavLink
          to="/shop"
          className={({ isActive }) => (isActive ? "buttonClick" : "")}
          // end
          // activeClassName="buttonClick"
        >
          <li>Shop</li>
        </NavLink>
        <NavLink
          to="/wishlist"
          className={({ isActive }) => (isActive ? "buttonClick" : "")}
        >
          <li>Wishlist</li>
        </NavLink>
        <NavLink
          to="/cart"
          className={({ isActive }) => (isActive ? "buttonClick" : "")}
        >
          <li>Cart</li>
        </NavLink>
      </ul>
    </nav>
  );
};

export default Navbar;
