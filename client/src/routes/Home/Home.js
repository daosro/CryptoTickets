import React from "react";

import AppBar from "./../../components/AppBar";

import useStyles from "./Home.style";

const Home = () => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.root}>
       Home
      </div>
    </>
  );
};

export default Home;
