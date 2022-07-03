import React, { useCallback, useContext } from "react";
import { Web3Context } from "../../context/Web3";
import Button from "../../core/Button";

import withConnectionRequired from "../../hocs/withConnectionRequired";
import withRoleAdmin from "../../hocs/withRoleAdmin";
import { notify } from "../../utils/notifications";

import useStyles from "./MatchsAdministration.style";

const MatchsAdministration = () => {
  const classes = useStyles();
  const { contracts } = useContext(Web3Context);

  return (
    <div className={classes.root}>
      <h2>Administración de partidos</h2>
    </div>
  );
};

export default withConnectionRequired(withRoleAdmin(MatchsAdministration));
