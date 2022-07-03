import React from "react";
import { Link } from "react-router-dom";
import {
  ACCOUNT_ADMINISTRATION_AREA_PATH,
  MATCHS_ADMINISTRATION_AREA_PATH,
  REWARDS_ADMINISTRATION_AREA_PATH,
  TICKETS_ADMINISTRATION_AREA_PATH,
} from "../../constants/routes";

import Card, { CardContainer } from "../../core/Card";
import withConnectionRequired from "../../hocs/withConnectionRequired";
import withRoleAdmin from "../../hocs/withRoleAdmin";

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
          lg={3}
          xl={3}
          xxl={3}
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
          lg={3}
          xl={3}
          xxl={3}
          header={
            <Link
              to={MATCHS_ADMINISTRATION_AREA_PATH}
              className={classes.homeLink}
            >
              <div className={classes.carHeader}>Editor de partidos</div>
            </Link>
          }
        >
          <Link
            to={MATCHS_ADMINISTRATION_AREA_PATH}
            className={classes.homeLink}
          >
            <div className={classes.carText}>
              Crea nuevos partidos para generar entradas
            </div>
          </Link>
        </Card>
        <Card
          xs={12}
          sm={12}
          md={6}
          lg={3}
          xl={3}
          xxl={3}
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
              Reparte las entradas entre los abonados del club
            </div>
          </Link>
        </Card>
        <Card
          xs={12}
          sm={12}
          md={6}
          lg={3}
          xl={3}
          xxl={3}
          header={
            <Link
              to={REWARDS_ADMINISTRATION_AREA_PATH}
              className={classes.homeLink}
            >
              <div className={classes.carHeader}>Recompensas</div>
            </Link>
          }
        >
          <Link
            to={REWARDS_ADMINISTRATION_AREA_PATH}
            className={classes.homeLink}
          >
            <div className={classes.carText}>
              Consulta y edita las recompensas de los usurios
            </div>
          </Link>
        </Card>
      </CardContainer>
    </div>
  );
};

export default withConnectionRequired(withRoleAdmin(Admin));
