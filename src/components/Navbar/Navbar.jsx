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
import Button from "../Button/Button";

const Navbar = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
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
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const logoutHandler = () => {
    if (isLoggedIn) {
      dispatch(logout());
      setShowLogoutModal(false);
      navigate("/logout");

      dispatch(
        setToast({ status: "success", message: "Logged out successfully" })
      );
      clearToastAfterDelay(dispatch);
    } else {
      navigate("/login");
      setShowLogoutModal(false);
    }
  };

  const renderLogoutModal = () => {
    return (
      <div className="logout-modal-container">
        <div className="logout-modal">
          <h3>Are you sure you want to logout?</h3>
          <div className="cta-container">
            <Button
              btnVariant="primary"
              onClick={logoutHandler}
              text="Yes, Logout"
            />
            <Button
              btnVariant="secondary"
              onClick={() => setShowLogoutModal(false)}
              text="No, Cancel"
            />
          </div>
        </div>
      </div>
    );
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
      <li
        onClick={() =>
          isLoggedIn ? setShowLogoutModal(true) : navigate("/login")
        }
      >
        {isLoggedIn ? (
          <IoLogOutOutline className="icon" />
        ) : (
          <IoPersonOutline className="icon" />
        )}
      </li>
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
        {showLogoutModal && renderLogoutModal()}
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
      {showLogoutModal && renderLogoutModal()}
    </nav>
  );
};

export default Navbar;
