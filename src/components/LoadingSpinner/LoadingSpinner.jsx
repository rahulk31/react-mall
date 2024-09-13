import "./loadingSpinner.css";

const LoadingSpinner = () => {
  return (
    <span className="lds-ripple">
      <span></span>
      <span></span>
    </span>
  );
};

export default LoadingSpinner;
