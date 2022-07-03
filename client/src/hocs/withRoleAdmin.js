import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { HOME_PATH } from "../constants/routes";
import { Web3Context } from "../context/Web3";
import Loading from "../core/Loading";

const withRoleAdmin = (WrappedComponent) => (props) => {
  const { accounts, contracts } = useContext(Web3Context);
  const [isAdminUser, setIsAdminUser] = useState();

  useEffect(() => {
    const checkIfTokenIsMinted = async () => {
      if (accounts?.[0] && contracts?.membership) {
        const hasCorrectRole = await contracts.membership.methods
          .hasClubRol(accounts[0])
          .call();
        setIsAdminUser(hasCorrectRole);
      }
    };
    checkIfTokenIsMinted();
  }, [accounts, contracts]);

  if (isAdminUser === false) {
    return <Navigate to={HOME_PATH} replace />;
  }

  return isAdminUser === undefined ? (
    <div
      style={{
        width: "100%",
        height: "5rem",
        margin: "25vh 0",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Loading />
    </div>
  ) : (
    <WrappedComponent {...props}></WrappedComponent>
  );
};

export default withRoleAdmin;
