import React from "react";
import ReactLoading from "react-loading";

const Loading = ({
  type = "bars",
  color = "#0255a5",
  height = 80,
  width = 80,
}) => {
  return (
    <ReactLoading type={type} color={color} height={height} width={width} />
  );
};

export default Loading;
