import React from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";

import useStyles from "./AppBar.style";
import { HOME_PATH, TICKETS_PATH } from "../../constants/routes";

const AppBar = ({ simple = false }) => {
  const classes = useStyles({ simple });

  return (
    <header className={classes.root}>
      <div className={classes.left}>
        <Link to={HOME_PATH}>
          <img
            className={clsx(classes.logo, classes.marginLeft)}
            src={process.env.PUBLIC_URL + "/assets/images/header_logo.svg"}
            alt="Real Madrid Logo"
          />
        </Link>
        <img
          className={classes.separator}
          src={process.env.PUBLIC_URL + "/assets/images/break.png"}
          alt="Separator"
        />
        <img
          className={classes.logo}
          src={
            process.env.PUBLIC_URL + "/assets/images/parche_champions_14.png"
          }
          alt="Champions 14"
        />
      </div>
      <Link to={TICKETS_PATH} className={classes.ticketsButton}>
        ENTRADAS
      </Link>
    </header>
  );
};

export default AppBar;
