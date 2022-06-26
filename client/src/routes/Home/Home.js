import React from "react";
import useStyles from "./Home.style";

const Home = () => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.root}>Home</div>
    </>
  );
};

export default Home;
