import React, { useContext } from "react";
import { Web3Context } from "../context/Web3";
import NotConnected from "../core/NotConnected";

const withConnectionRequired = (WrappedComponent) => (props) => {
  const { isConnected } = useContext(Web3Context);
  return !isConnected ? (
    <NotConnected />
  ) : (
    <WrappedComponent {...props}></WrappedComponent>
  );
};

export default withConnectionRequired;
