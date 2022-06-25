import React, { useCallback, useContext, useState } from "react";
import { Web3Context } from "../../context/Web3";
import Button from "../../core/Button";

import useStyles from "./Admin.style";

const Admin = () => {
  const classes = useStyles();
  const { contract } = useContext(Web3Context);
  const [subscriberAccount, setSubscriberAccount] = useState(null);
  const onAccountChanged = useCallback((event) => {
    setSubscriberAccount(event.target.value);
  }, []);

  const addSubscriberHandler = useCallback(async () => {
    try {
      await contract.methods.grantSubscriberRol(subscriberAccount).send();
      console.log("Subscriber added");
    } catch (error) {
      console.error(error);
    }
  }, [subscriberAccount, contract]);

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