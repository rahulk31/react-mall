import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import "./index.css";
import { Outlet } from "react-router-dom";

const MenstackContainer = () => {
  return (
    <div className="page">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MenstackContainer;
