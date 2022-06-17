import React, { useContext, useMemo } from "react";
import { matchPath } from "react-router";
import clsx from "clsx";
import { Link, useLocation } from "react-router-dom";

import useStyles from "./AppBar.style";
import { HOME_PATH, TICKETS_PATH } from "../../constants/routes";
import { Web3Context } from "../../context/Web3";

const AppBar = () => {
  const classes = useStyles();
  const location = useLocation();
  const { accounts, connect } = useContext(Web3Context);

  const displayTicketLink = useMemo(
    () => !matchPath(location.pathname, TICKETS_PATH),
    [location]
  );

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

      <div className={classes.right}>
        {displayTicketLink && (
          <Link
            to={TICKETS_PATH}
            className={clsx(classes.button, classes.ticketsButton)}
          >
            ENTRADAS
          </Link>
        )}
        <div className={classes.button} onClick={connect}>
          {accounts?.[0] || "CONNECT"}
        </div>
      </div>
    </header>
  );
};

export default AppBar;
