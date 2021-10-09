import React from "react";
import "./Loading.css";
import HashLoader from "react-spinners/HashLoader";

function Loading() {
  return (
    <div className="loading">
      <HashLoader color={"#D0021B"} loading={true} size={50} />
    </div>
  );
}

export default Loading;
