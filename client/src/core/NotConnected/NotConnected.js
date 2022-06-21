import React from "react";

import useStyles from "./NotConnected.style";

const NotConnected = () => {
  const classes = useStyles();
  return <div className={classes.root}>TODO: Connect to metamask please</div>;
};

export default NotConnected;
