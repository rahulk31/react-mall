import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import "./index.css";
import { Outlet } from "react-router-dom";
import Toast from "../components/Toast/Toast";
import { useSelector } from "react-redux";

const MenstackContainer = () => {
  const toast = useSelector((state) => state.toast);

  return (
    <div className="page">
      {toast.status && <Toast />}
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MenstackContainer;
