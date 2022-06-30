import React from "react";

import Card, { CardContainer } from "../../core/Card";

import useStyles from "./UserArea.style";
import { Link } from "react-router-dom";
import {
  USER_ZONE_MARKET_PATH,
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
          lg={4}
          xl={4}
          xxl={4}
          header={
            <Link to={USER_ZONE_SUBSCRIBER_PATH} className={classes.homeLink}>
              <div className={classes.carHeader}>Carné de Socio</div>
            </Link>
          }
        >
          <Link to={USER_ZONE_SUBSCRIBER_PATH} className={classes.homeLink}>
            <div className={classes.carText}>
              Los socios del Real Madrid son todas aquellas personas físicas que
              integran la entidad Real Madrid con los derechos y obligaciones
              contenidos en los Estatutos.
            </div>
            <div className={classes.carText}>¡Hazte socio ahora!</div>
            <img
              className={classes.carImage}
              src={process.env.PUBLIC_URL + "/assets/images/stadium.jpeg"}
              alt="Stadium"
            />
          </Link>
        </Card>
        <Card
          xs={12}
          sm={12}
          md={6}
          lg={4}
          xl={4}
          xxl={4}
          header={
            <Link to={USER_ZONE_TICKETS_PATH} className={classes.homeLink}>
              <div className={classes.carHeader}>Mis Entradas</div>
            </Link>
          }
        >
          <Link to={USER_ZONE_TICKETS_PATH} className={classes.homeLink}>
            <div className={classes.carText}>
              Consulta todas la información de todas tus entradas
            </div>
          </Link>
        </Card>
        <Card
          xs={12}
          sm={12}
          md={6}
          lg={4}
          xl={4}
          xxl={4}
          header={
            <Link to={USER_ZONE_MARKET_PATH} className={classes.homeLink}>
              <div className={classes.carHeader}>Comprar Entradas</div>
            </Link>
          }
        >
          <Link to={USER_ZONE_MARKET_PATH} className={classes.homeLink}>
            <div className={classes.carText}>
              Compra la mejor entrada disponible para los proximos partidos de
              tu club
            </div>
          </Link>
        </Card>
      </CardContainer>
    </div>
  );
};

export default withConnectionRequired(UserArea);
