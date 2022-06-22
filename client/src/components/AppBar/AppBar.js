import React, { useContext, useMemo } from "react";
import { matchPath } from "react-router";
import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";
import ConnectButton from "../../core/ConnectButton";
import { Web3Context } from "../../context/Web3";
import { HOME_PATH, TICKETS_PATH } from "../../constants/routes";

import useStyles from "./AppBar.style";

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
      <div className={classes.leftSide}>
        <Link to={HOME_PATH} className={classes.homeLink}>
          <div className={classes.realmadridlogo} />
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
        <ConnectButton />
      </div>
    </header>
  );
};

export default AppBar;
