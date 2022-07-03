import React from "react";

import Card, { CardContainer } from "../../core/Card";

import useStyles from "./UserArea.style";
import { Link } from "react-router-dom";
import {
  USER_ZONE_MARKET_PATH,
  USER_ZONE_REWARDS_PATH,
  USER_ZONE_SUBSCRIBER_PATH,
  USER_ZONE_TICKETS_PATH,
} from "../../constants/routes";
import withConnectionRequired from "../../hocs/withConnectionRequired";

const UserArea = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CardContainer>
        <Card
          xs={12}
          sm={12}
          md={6}
          lg={3}
          xl={3}
          xxl={3}
          header={
            <Link to={USER_ZONE_SUBSCRIBER_PATH} className={classes.headerLink}>
              <div className={classes.carHeader}>Carné de Socio</div>
            </Link>
          }
        >
          <Link to={USER_ZONE_SUBSCRIBER_PATH} className={classes.headerLink}>
            <div className={classes.carText}>
              Los socios del Real Madrid son todas aquellas personas físicas que
              integran la entidad Real Madrid con los derechos y obligaciones
              contenidos en los Estatutos.
            </div>
            <div className={classes.carText}>¡Hazte socio ahora!</div>
            <img
              className={classes.carImage}
              src={process.env.PUBLIC_URL + "/assets/images/carnet.jpeg"}
              alt="Stadium"
            />
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
            <Link to={USER_ZONE_TICKETS_PATH} className={classes.headerLink}>
              <div className={classes.carHeader}>Mis Entradas</div>
            </Link>
          }
        >
          <Link to={USER_ZONE_TICKETS_PATH} className={classes.headerLink}>
            <div className={classes.carText}>
              Consulta la información de todas tus entradas.
            </div>
            <div className={classes.carText}> </div>
            <img
              className={classes.carImage}
              src={process.env.PUBLIC_URL + "/assets/images/tickets.jpeg"}
              alt="Rewards"
            />
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
            <Link to={USER_ZONE_MARKET_PATH} className={classes.headerLink}>
              <div className={classes.carHeader}>Comprar Entradas</div>
            </Link>
          }
        >
          <Link to={USER_ZONE_MARKET_PATH} className={classes.headerLink}>
            <div className={classes.carText}>
              Compra la mejor entrada disponible para los proximos partidos de
              tu club.
            </div>
            <div className={classes.carText}>¡No te quedes sin ellas!</div>
            <img
              className={classes.carImage}
              src={process.env.PUBLIC_URL + "/assets/images/marketplace.jpeg"}
              alt="Marketplace"
            />
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
            <Link to={USER_ZONE_REWARDS_PATH} className={classes.headerLink}>
              <div className={classes.carHeader}>Recompensas</div>
            </Link>
          }
        >
          <Link to={USER_ZONE_REWARDS_PATH} className={classes.headerLink}>
            <div className={classes.carText}>
              Utiliza tus entradas para recibir recompensas.
            </div>
            <div className={classes.carText}>¡Hay miles de ellas!</div>
            <img
              className={classes.carImage}
              src={process.env.PUBLIC_URL + "/assets/images/rewards.webp"}
              alt="Rewards"
            />
          </Link>
        </Card>
        <Card
          xs={12}
          sm={12}
          md={6}
          lg={3}
          xl={3}
          xxl={3}
          header={<div className={classes.carHeader}>Cesiones</div>}
        >
          <div className={classes.carText}>
            Cede tus entradas a miembros de tu lista de cesiones.
          </div>
          <div className={classes.carText}>
            ¡Gestiona tu listado de cesiones!
          </div>
          <img
            className={classes.carImage}
            src={process.env.PUBLIC_URL + "/assets/images/cesiones.jpeg"}
            alt="Rewards"
          />
        </Card>
      </CardContainer>
    </div>
  );
};

export default withConnectionRequired(UserArea);
