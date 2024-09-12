import "./loadingSpinner.css";

const LoadingSpinner = () => {
  return (
    <div className="lds-ripple">
      <div></div>
      <div></div>
    </div>
  );
};

export default LoadingSpinner;
