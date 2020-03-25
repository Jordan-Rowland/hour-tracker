import React from "react";
import "../styles/LoadingSpinner.css";


function LoadingSpinner() {
  return (
    <div className="loader">
      <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
    </div>
  );
}

export default LoadingSpinner;