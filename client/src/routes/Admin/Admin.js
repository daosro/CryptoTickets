import React, { useCallback, useContext, useState } from "react";
import { Link } from "react-router-dom";
import {
  ACCOUNT_ADMINISTRATION_AREA_PATH,
  TICKETS_ADMINISTRATION_AREA_PATH,
  USER_ZONE_SUBSCRIBER_PATH,
} from "../../constants/routes";
import { Web3Context } from "../../context/Web3";
import Button from "../../core/Button";
import Card, { CardContainer } from "../../core/Card";
import withConnectionRequired from "../../hocs/withConnectionRequired";
import { notify } from "../../utils/notifications";

import useStyles from "./Admin.style";

const Admin = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <h2>Administración del Club</h2>
      <CardContainer>
        <Card
          xs={12}
          sm={12}
          md={6}
          lg={4}
          header={
            <Link
              to={ACCOUNT_ADMINISTRATION_AREA_PATH}
              className={classes.homeLink}
            >
              <div className={classes.carHeader}>Cuentas</div>
            </Link>
          }
        >
          <Link
            to={ACCOUNT_ADMINISTRATION_AREA_PATH}
            className={classes.homeLink}
          >
            <div className={classes.carText}>
              Administración de las cuentas de socios y nuevos administradores
              de club
            </div>
          </Link>
        </Card>
        <Card
          xs={12}
          sm={12}
          md={6}
          lg={4}
          header={
            <Link
              to={TICKETS_ADMINISTRATION_AREA_PATH}
              className={classes.homeLink}
            >
              <div className={classes.carHeader}>Entradas a partidos</div>
            </Link>
          }
        >
          <Link
            to={TICKETS_ADMINISTRATION_AREA_PATH}
            className={classes.homeLink}
          >
            <div className={classes.carText}>
              Consulta todas la información de todas tus entradas
            </div>
          </Link>
        </Card>
      </CardContainer>
    </div>
  );
};

export default withConnectionRequired(Admin);
