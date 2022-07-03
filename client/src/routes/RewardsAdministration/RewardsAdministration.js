import React, { useCallback, useContext, useEffect, useState } from "react";
import { Web3Context } from "../../context/Web3";
import Button from "../../core/Button";

import withConnectionRequired from "../../hocs/withConnectionRequired";
import { notify } from "../../utils/notifications";

import useStyles from "./RewardsAdministration.style";

const getPendingRewardsSize = async (contracts) => {
  const pendingRewards = await contracts.rewards.methods
    .getAddressInfo()
    .call();
  return pendingRewards.length;
};

const RewardsAdministration = () => {
  const classes = useStyles();
  const { contracts } = useContext(Web3Context);
  const [pendingRewards, setPendingRewards] = useState(0);

  useEffect(() => {
    const getPendingRewards = async () => {
      const pendingRewards = await getPendingRewardsSize(contracts);
      setPendingRewards(pendingRewards);
    };
    getPendingRewards();
  }, [contracts]);

  const mintRewardsHandler = useCallback(async () => {
    try {
      await contracts.rewards.methods.mintReward().send();
      const pendingRewards = await getPendingRewardsSize(contracts);
      setPendingRewards(pendingRewards);
      notify("Congratulations!", "Rewards mint successfully");
    } catch (error) {
      notify("Error", error.message);
    }
  }, [contracts]);

  return (
    <div className={classes.root}>
      <h2>Administración de recompensas</h2>
      <div className={classes.section}>
        <p>
          Existe un total de {pendingRewards} recompensas por repartir ¿Desear
          ejecutar ahora el reparto?
        </p>
        <div style={{ width: "fit-content" }}>
          <Button onClick={mintRewardsHandler}>Realizar reparto</Button>
        </div>
      </div>
    </div>
  );
};

export default withConnectionRequired(RewardsAdministration);
