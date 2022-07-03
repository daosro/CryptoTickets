import React from "react";
import { Link } from "react-router-dom";
import { CLUB_ADMIN_AREA_PATH } from "../../constants/routes";

import useStyles from "./Footer.style";
const Footer = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.logo}>
        <Link to={CLUB_ADMIN_AREA_PATH} />
      </div>
    </div>
  );
};

export default Footer;
