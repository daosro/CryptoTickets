import React, { useContext } from "react";

import AppBar from "../../components/AppBar";
import { Web3Context } from "../../context/Web3";
import NotConnected from "../../core/NotConnected";

import useStyles from "./Tickets.style";

const Tickets = () => {
  const classes = useStyles();
  const { isConnected, connect } = useContext(Web3Context);

  return (
    <>
      <AppBar />
      <div className={classes.root}>
        {!isConnected ? <NotConnected /> : <div>Conectado</div>}
      </div>
    </>
  );
};

export default Tickets;
