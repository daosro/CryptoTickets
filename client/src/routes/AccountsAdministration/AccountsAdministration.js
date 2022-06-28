import React, { useCallback, useContext, useState } from "react";
import { Web3Context } from "../../context/Web3";
import Button from "../../core/Button";
import withConnectionRequired from "../../hocs/withConnectionRequired";
import { notify } from "../../utils/notifications";

import useStyles from "./AccountsAdministration.style";

const AccountsAdministration = () => {
  const classes = useStyles();
  const { contracts } = useContext(Web3Context);
  const [adminAccount, setadminAccount] = useState(null);

  const [subscriberAccount, setSubscriberAccount] = useState(null);

  const onAdminAccountChanged = useCallback((event) => {
    setadminAccount(event.target.value);
  }, []);

  const onMembershipAccountChange = useCallback((event) => {
    setSubscriberAccount(event.target.value);
  }, []);

  const addAdminHandler = useCallback(async () => {
    try {
      notify(
        "Processing...",
        "This process may take several minutes, please wait.",
        "info",
        10000
      );
      await contracts.membership.methods
        .grantClubRol(adminAccount)
        .send()
        .on("receipt", function () {
          notify(
            "Congratulations!",
            "New club admin add successfully",
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
  }, [adminAccount, contracts]);

  const addMembershipHandler = useCallback(async () => {
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
        <h2>Administración de cuentas</h2>
        <div className={classes.form}>
          <label>Añadir administrador de club</label>
          <div>
            <input
              className={classes.input}
              onChange={onAdminAccountChanged}
            ></input>
            <Button onClick={addAdminHandler}>Añadir Abonado</Button>
          </div>
        </div>
        <div className={classes.form}>
          <label>Añadir cuenta de Abonado</label>
          <div>
            <input
              className={classes.input}
              onChange={onMembershipAccountChange}
            ></input>
            <Button onClick={addMembershipHandler}>Añadir Abonado</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default withConnectionRequired(AccountsAdministration);
