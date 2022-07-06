import React from "react";
import Loading from "../Loading";

import useStyles from "./LoadingPage.style";
const LoadingPage = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Loading />
    </div>
  );
};

export default LoadingPage;
