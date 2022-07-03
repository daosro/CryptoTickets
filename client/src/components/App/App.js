import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ReactNotifications } from "react-notifications-component";
import "rodal/lib/rodal.css";

import {
  ACCOUNT_ADMINISTRATION_AREA_PATH,
  CLUB_ADMIN_AREA_PATH,
  HOME_PATH,
  TICKETS_ADMINISTRATION_AREA_PATH,
  USER_ZONE_MARKET_PATH,
  USER_ZONE_PATH,
  USER_ZONE_SUBSCRIBER_PATH,
  USER_ZONE_TICKETS_PATH,
} from "../../constants/routes";
import { Web3Provider } from "../../context/Web3";

import AppBar from "../AppBar";
import Home from "../../routes/Home";
import UserArea from "../../routes/UserArea";
import Subscriber from "../../routes/Subscriber";
import Market from "../../routes/Market";
import Tickets from "../../routes/Tickets";
import Admin from "../../routes/Admin";
import AccountsAdministration from "../../routes/AccountsAdministration";
import TicketsAdministration from "../../routes/TicketsAdministration";

import "react-notifications-component/dist/theme.css";
import useStyles from "./App.style";

const App = () => {
  const classes = useStyles();
  return (
    <Web3Provider>
      <BrowserRouter>
        <div className={classes.root}>
          <AppBar />
          <ReactNotifications />
          <Routes>
            <Route exact path={HOME_PATH} element={<Home />} />
            <Route exact path={USER_ZONE_PATH} element={<UserArea />} />
            <Route
              exact
              path={USER_ZONE_SUBSCRIBER_PATH}
              element={<Subscriber />}
            />
            <Route exact path={USER_ZONE_TICKETS_PATH} element={<Tickets />} />
            <Route exact path={USER_ZONE_MARKET_PATH} element={<Market />} />
            <Route exact path={CLUB_ADMIN_AREA_PATH} element={<Admin />} />
            <Route
              exact
              path={ACCOUNT_ADMINISTRATION_AREA_PATH}
              element={<AccountsAdministration />}
            />
            <Route
              exact
              path={TICKETS_ADMINISTRATION_AREA_PATH}
              element={<TicketsAdministration />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </Web3Provider>
  );
};

export default App;
