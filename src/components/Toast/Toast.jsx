import {
  IoCheckmarkCircle,
  IoClose,
  IoWarning,
  IoInformationCircle,
} from "react-icons/io5";
import "./toast.css";
import { toastVariants } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { clearToast } from "../../store/slices/toastSlice";

const Toast = () => {
  const toastData = useSelector((state) => state.toast);
  const dispatch = useDispatch();
  const status = toastData.status;

  const getToastIcon = {
    success: (
      <IoCheckmarkCircle className={`toast-icon ${toastVariants[status]}`} />
    ),
    warning: (
      <IoInformationCircle className={`toast-icon ${toastVariants[status]}`} />
    ),
    fail: <IoWarning className={`toast-icon ${toastVariants[status]}`} />,
  };

  const renderToastIcon = getToastIcon[status];

  return (
    <div className="toast-container">
      {renderToastIcon}
      <p className="toast-message">{toastData.message}</p>
      <IoClose className="toast-close" onClick={() => dispatch(clearToast())} />
    </div>
  );
};

export default Toast;
