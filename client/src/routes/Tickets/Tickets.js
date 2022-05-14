import React from "react";

import AppBar from "../../components/AppBar";

import useStyles from "./Tickets.style";

const Tickets = () => {
  const classes = useStyles();
  return (
    <>
      <AppBar />
      <div className={classes.root}>
      Tickets
      </div>
    </>
  );
};

export default Tickets;
