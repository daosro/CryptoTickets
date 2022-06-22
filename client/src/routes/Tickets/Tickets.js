import React, { useContext } from "react";

import Card, { CardContainer } from "../../core/Card";
import AppBar from "../../components/AppBar";
import { Web3Context } from "../../context/Web3";
import NotConnected from "../../core/NotConnected";

import useStyles from "./Tickets.style";
import { Link } from "react-router-dom";
import { TICKETS_SUBSCRIBER_PATH } from "../../constants/routes";

const Tickets = () => {
  const classes = useStyles();
  const { isConnected } = useContext(Web3Context);

  return (
    <>
      <AppBar />
      <div className={classes.root}>
        {!isConnected ? (
          <NotConnected />
        ) : (
          <CardContainer>
            <Card
              xs={12}
              sm={12}
              md={6}
              lg={4}
              header={<div className={classes.carHeader}>Carné de Socio</div>}
            >
              <Link to={TICKETS_SUBSCRIBER_PATH} className={classes.homeLink}>
                <div className={classes.carText}>
                  Los socios del Real Madrid son todas aquellas personas físicas
                  que integran la entidad Real Madrid con los derechos y
                  obligaciones contenidos en los Estatutos.
                </div>
                <div className={classes.carText}>¡Hazte socio ahora!</div>
                <img
                  className={classes.carImage}
                  src={process.env.PUBLIC_URL + "/assets/images/stadium.jpeg"}
                  alt="Stadium"
                />
              </Link>
            </Card>
          </CardContainer>
        )}
      </div>
    </>
  );
};

export default Tickets;
