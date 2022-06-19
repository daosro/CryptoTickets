import React, { useContext, useMemo } from "react";
import clsx from "clsx";

import { Web3Context } from "../../context/Web3";
import useStyles from "./ConnectButton.style";

const ConnectButton = () => {
  const classes = useStyles();
  const { accounts, isConnected, connect } = useContext(Web3Context);

  const label = useMemo(() => {
    const connectedAccount = accounts?.[0] || "";

    return isConnected
      ? `${connectedAccount.substr(0, 5)}...${connectedAccount.slice(-4)}`
      : "Connect Wallet";
  }, [accounts, isConnected]);

  return (
    <div
      className={clsx(classes.root, { [classes.connected]: isConnected })}
      onClick={!isConnected ? connect : undefined}
    >
      {label}
    </div>
  );
};

export default ConnectButton;
