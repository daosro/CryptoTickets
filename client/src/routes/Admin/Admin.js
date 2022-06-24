import React from "react";

import useStyles from "./Admin.style";

const Admin = () => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.root}>Admin</div>
    </>
  );
};

export default Admin;
