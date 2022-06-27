import React, { useCallback, useContext, useState } from "react";
import { Web3Context } from "../../context/Web3";
import Button from "../../core/Button";
import { notify } from "../../utils/notifications";

import useStyles from "./Admin.style";

const Admin = () => {
  const classes = useStyles();
  const { contracts } = useContext(Web3Context);
  const [subscriberAccount, setSubscriberAccount] = useState(null);
  const onAccountChanged = useCallback((event) => {
    setSubscriberAccount(event.target.value);
  }, []);

  const addSubscriberHandler = useCallback(async () => {
    try {
      notify(
        "Processing...",
        "This process may take several minutes, please wait.",
        "info",
        10000
      );
      await contracts.membership.methods
        .grantMembershipRol(subscriberAccount)
        .send()
        .on("receipt", function () {
          notify(
            "Congratulations!",
            "New membership add successfully",
            "success",
            5000
          );
        })
        .on("error", function (error, receipt) {
          notify("Something went wrong", error?.message, "danger", 10000);
        });
    } catch (error) {
      console.error(error);
    }
  }, [subscriberAccount, contracts]);

  return (
    <>
      <div className={classes.root}>
        <h2>Administración club</h2>
        <div className={classes.form}>
          <label>Añadir cuenta de Abonado</label>
          <div>
            <input
              className={classes.input}
              onChange={onAccountChanged}
            ></input>
            <Button onClick={addSubscriberHandler}>Añadir Abonado</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;
