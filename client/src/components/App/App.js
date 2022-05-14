import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HOME_PATH, TICKETS_PATH } from "../../constants/routes";

import Home from "../../routes/Home";
import Tickets from "../../routes/Tickets";
import AppBar from "../AppBar";

import Footer from "../Footer"; 

import useStyles from "./App.style";

function App() {
  const classes = useStyles();
  return (
    <BrowserRouter>
      <div className={classes.root}>
        <AppBar />
        <Routes>
          <Route exact path={HOME_PATH} element={<Home />} />
          <Route exact path={TICKETS_PATH} element={<Tickets />} />
        </Routes>
      </div>
      {/* <div className={classes.footer}>
        <Footer />
      </div> */}
    </BrowserRouter>
  );
}

export default App;
