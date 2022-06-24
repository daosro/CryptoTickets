import React from "react";

import useStyles from "./Tickets.style";

const Tickets = () => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.root}>Tickets</div>
    </>
  );
};

export default Tickets;
