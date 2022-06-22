import React from "react";

import useStyles from "./CardContainer.style";

const CardContainer = ({ children }) => {
  const classes = useStyles();
  return <div className={classes.root}>{children}</div>;
};

export default CardContainer;
