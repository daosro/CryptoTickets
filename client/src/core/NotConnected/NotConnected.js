import React from "react";
import ConnectButton from "../ConnectButton";

import useStyles from "./NotConnected.style";

const NotConnected = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.title}>CONNECT WALLET</div>
      <div className={classes.connectText}>
        Connect with your available waller or create new wallet to join our
        marketplace
      </div>
      <ConnectButton />
      <div className={classes.installMetamask}>
        Don't have Metamask installed yet?
        <a
          href="https://metamask.io/download/"
          target="_blank"
          rel="noreferrer"
          className={classes.metamaskLink}
        >
          <img
            className={classes.logo}
            src={process.env.PUBLIC_URL + "/assets/images/logo_metamask.svg"}
            alt="Champions 14"
          />
        </a>
      </div>
      <div className={classes.legal}>
        We do not own your private keys and cannot acces your funds without your
        confirmation
      </div>
    </div>
  );
};

export default NotConnected;
