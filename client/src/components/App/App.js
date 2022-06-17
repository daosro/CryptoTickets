import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HOME_PATH, TICKETS_PATH } from "../../constants/routes";
import { Web3Provider } from "../../context/Web3";

import Home from "../../routes/Home";
import Tickets from "../../routes/Tickets";
import AppBar from "../AppBar";

import useStyles from "./App.style";

const App = () => {
  const classes = useStyles();
  return (
    <Web3Provider>
      <BrowserRouter>
        <div className={classes.root}>
          <AppBar />
          <Routes>
            <Route exact path={HOME_PATH} element={<Home />} />
            <Route exact path={TICKETS_PATH} element={<Tickets />} />
          </Routes>
        </div>
      </BrowserRouter>
    </Web3Provider>
  );
};

export default App;
