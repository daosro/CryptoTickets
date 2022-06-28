import React, { useCallback, useContext, useState } from "react";
import { Web3Context } from "../../context/Web3";

import withConnectionRequired from "../../hocs/withConnectionRequired";
import { notify } from "../../utils/notifications";

import useStyles from "./TicketsAdministration.style";

const TicketsAdministration = () => {
  const classes = useStyles();
  const { contracts } = useContext(Web3Context);

  return (
    <>
      <div className={classes.root}>
        <h2>Administración de entradas</h2>
      </div>
    </>
  );
};

export default withConnectionRequired(TicketsAdministration);
