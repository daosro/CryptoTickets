import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ReactNotifications } from "react-notifications-component";
import "rodal/lib/rodal.css";

import {
  HOME_PATH,
  USER_ZONE_PATH,
  USER_ZONE_MARKET_PATH,
  USER_ZONE_REWARDS_PATH,
  USER_ZONE_SUBSCRIBER_PATH,
  USER_ZONE_TICKETS_PATH,
  ACCOUNT_ADMINISTRATION_AREA_PATH,
  CLUB_ADMIN_AREA_PATH,
  TICKETS_ADMINISTRATION_AREA_PATH,
} from "../../constants/routes";
import { Web3Provider } from "../../context/Web3";

import AppBar from "../AppBar";
import Footer from "../Footer";
import Breadcrumb from "../../core/Breadcrumb";
import Home from "../../routes/Home";
import UserArea from "../../routes/UserArea";
import Subscriber from "../../routes/Subscriber";
import Market from "../../routes/Market";
import Rewards from "../../routes/Rewards";
import Tickets from "../../routes/Tickets";
import Admin from "../../routes/Admin";
import AccountsAdministration from "../../routes/AccountsAdministration";
import TicketsAdministration from "../../routes/TicketsAdministration";

import "react-notifications-component/dist/theme.css";
import useStyles from "./App.style";

const routes = [
  { path: HOME_PATH, title: "Home", Component: Home },
  { path: USER_ZONE_PATH, title: "Area de Usurio", Component: UserArea },
  { path: USER_ZONE_SUBSCRIBER_PATH, title: "Socio", Component: Subscriber },
  { path: USER_ZONE_TICKETS_PATH, title: "Mis entradas", Component: Tickets },
  { path: USER_ZONE_MARKET_PATH, title: "Taquilla", Component: Market },
  { path: USER_ZONE_REWARDS_PATH, title: "Recomponesas", Component: Rewards },

  { path: CLUB_ADMIN_AREA_PATH, title: "Administración", Component: Admin },
  {
    path: ACCOUNT_ADMINISTRATION_AREA_PATH,
    title: "Cuentas",
    Component: AccountsAdministration,
  },
  {
    path: TICKETS_ADMINISTRATION_AREA_PATH,
    title: "Cuentas",
    Component: TicketsAdministration,
  },
];

const App = () => {
  const classes = useStyles();
  return (
    <Web3Provider>
      <BrowserRouter>
        <div className={classes.root}>
          <AppBar />
          <ReactNotifications />
          <Breadcrumb routes={routes} />
          <Routes>
            {routes.map(({ path, name, Component }) => (
              <Route exact path={path} key={path} element={<Component />} />
            ))}
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </Web3Provider>
  );
};

export default App;
