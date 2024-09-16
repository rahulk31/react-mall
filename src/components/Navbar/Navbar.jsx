import "./navbar.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  IoGiftOutline,
  IoShirtOutline,
  IoCartOutline,
  IoHeartOutline,
  IoPersonOutline,
  IoMenuOutline,
  IoCloseOutline,
  IoLogOutOutline,
} from "react-icons/io5";
import { useIsMobile } from "../../hooks/isMobile";
import { useState } from "react";
import { logout } from "../../store/slices/authSlice";
import { setToast } from "../../store/slices/toastSlice";
import { clearToastAfterDelay } from "../../utils/cartUtils";

const Navbar = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cartCount = useSelector((state) => state.cart.items.length);
  const displayCartCount = !isLoggedIn ? 0 : cartCount > 9 ? "9+" : cartCount;

  const wishlistCount = useSelector((state) => state.wishlist.items.length);
  const displayWishlistCount = !isLoggedIn
    ? 0
    : wishlistCount > 9
    ? "9+"
    : wishlistCount;

  const isMobile = useIsMobile();
  const dispatch = useDispatch();

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const logoutHandler = () => {
    if (isLoggedIn) {
      dispatch(logout());
      dispatch(
        setToast({ status: "success", message: "Logged out successfully" })
      );
      clearToastAfterDelay(dispatch);
    }
  };

  const navIconComponents = (
    <ul>
      <NavLink
        to="/shop"
        className={({ isActive }) => (isActive ? "buttonClick" : "")}
      >
        <li>
          <IoShirtOutline className="icon" />
        </li>
      </NavLink>
      <NavLink
        to="/wishlist"
        className={({ isActive }) => (isActive ? "buttonClick" : "")}
      >
        <li>
          <IoHeartOutline className="icon" />
          <span className="icon-count">{displayWishlistCount}</span>
        </li>
      </NavLink>
      <NavLink
        to="/cart"
        className={({ isActive }) => (isActive ? "buttonClick" : "")}
      >
        <li>
          <IoCartOutline className="icon" />
          <span className="icon-count">{displayCartCount}</span>
        </li>
      </NavLink>
      <NavLink
        to={isLoggedIn ? "/logout" : "/login"}
        className={({ isActive }) => (isActive ? "buttonClick" : "")}
        onClick={logoutHandler}
      >
        <li>
          {isLoggedIn ? (
            <IoLogOutOutline className="icon" />
          ) : (
            <IoPersonOutline className="icon" />
          )}
        </li>
      </NavLink>
    </ul>
  );

  if (isMobile) {
    return (
      <nav className="mobile-navbar">
        {isMenuOpen ? (
          <IoCloseOutline className="hamburger open" onClick={toggleMenu} />
        ) : (
          <IoMenuOutline className="hamburger" onClick={toggleMenu} />
        )}
        {isMenuOpen && navIconComponents}
      </nav>
    );
  }

  return (
    <nav className="navbar">
      <div>
        <Link to="/" className="logo">
          <IoGiftOutline className="icon" />
          <h3>XoXo MALL</h3>
        </Link>
      </div>
      {navIconComponents}
    </nav>
  );
};

export default Navbar;
