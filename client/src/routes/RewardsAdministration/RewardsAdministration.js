import React, { useCallback, useContext, useEffect, useState } from "react";
import { Web3Context } from "../../context/Web3";
import Button from "../../core/Button";
import { CardContainer } from "../../core/Card";
import NonFungibleToken from "../../core/NonFungibleToken";

import withConnectionRequired from "../../hocs/withConnectionRequired";
import withRoleAdmin from "../../hocs/withRoleAdmin";
import { getNFTMetadataObject } from "../../services/nft";
import { notify } from "../../utils/notifications";

import useStyles from "./RewardsAdministration.style";

const getPendingRewardsSize = async (contracts) => {
  const pendingRewards = await contracts.rewards.methods
    .getListAddressRewardsInfo()
    .call();
  return pendingRewards.length;
};

const getRewardsMetadata = async (contracts) => {
  const rewardsInfo = await contracts.rewards.methods.getBaseURI().call();
  const baseURI = rewardsInfo["0"];
  const rewardsNumber = rewardsInfo["1"];
  const rewardsMetadata = [];
  for (let i = 0; i < rewardsNumber; i++) {
    try {
      const reward = await getNFTMetadataObject(`${baseURI}${i}`);
      rewardsMetadata.push(reward);
    } catch (error) {
      console.log(error);
    }
  }
  return rewardsMetadata;
};

const INITIAL_FORM_DATA = {
  rewardsNewBaseURI: "",
  rewardsNewSize: undefined,
};

const RewardsAdministration = () => {
  const classes = useStyles();
  const { contracts } = useContext(Web3Context);
  const [pendingRewards, setPendingRewards] = useState(0);
  const [{ rewardsNewBaseURI, rewardsNewSize }, setRewardsFormData] =
    useState(INITIAL_FORM_DATA);
  const [rewardsMetadata, setRewardsMetadata] = useState([]);

  useEffect(() => {
    if (contracts && contracts.rewards) {
      const getPendingRewards = async () => {
        const pendingRewards = await getPendingRewardsSize(contracts);
        setPendingRewards(pendingRewards);
        const rewards = await getRewardsMetadata(contracts);
        setRewardsMetadata(rewards);
      };
      getPendingRewards();
    }
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

  const onBlurFormHandler = useCallback(
    (event) => {
      const { name, value } = event.target;
      setRewardsFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    },
    [setRewardsFormData]
  );

  const changeRewardsHandler = useCallback(async () => {
    try {
      await contracts.rewards.methods
        .setBaseURI(rewardsNewBaseURI, rewardsNewSize)
        .send()
        .on("receipt", async () => {
          const rewards = await getRewardsMetadata(contracts);
          setRewardsMetadata(rewards);
          setRewardsFormData(INITIAL_FORM_DATA);
          notify(
            "Congratulations!",
            "Rewards base URI and size changed successfully",
            "success",
            5000
          );
        })
        .on("error", (error) => {
          notify("Something went wrong", error?.message, "danger", 10000);
        });
    } catch (error) {
      notify("Error", error.message, "error");
    }
  }, [contracts, rewardsNewBaseURI, rewardsNewSize]);

  return (
    <div className={classes.root}>
      <h2>Administración de recompensas</h2>
      <div className={classes.section}>
        <p>
          Existe un total de {pendingRewards} recompensas por repartir ¿Desear
          ejecutar ahora el reparto?
        </p>
        <div className={classes.button}>
          <Button onClick={mintRewardsHandler}>Realizar reparto</Button>
        </div>
      </div>
      <h2>Modificar recompensas</h2>
      <div className={classes.section}>
        <div className={classes.form}>
          <label>BaseURI</label>
          <input
            className={classes.input}
            name="rewardsNewBaseURI"
            value={rewardsNewBaseURI}
            onChange={onBlurFormHandler}
          ></input>
          <label>Total de elementos</label>
          <input
            className={classes.input}
            name="rewardsNewSize"
            value={rewardsNewSize}
            onChange={onBlurFormHandler}
          ></input>
          <div className={classes.button} style={{ marginTop: "20px" }}>
            <Button
              disabled={!rewardsNewBaseURI || !rewardsNewSize}
              onClick={changeRewardsHandler}
            >
              Modificar Datos
            </Button>
          </div>
        </div>
      </div>
      <h2>Listado de recompensas disponibles</h2>
      <div className={classes.section}>
        <CardContainer>
          {rewardsMetadata.map((metadata) => (
            <NonFungibleToken
              key={metadata.tokenId}
              metadata={metadata}
              title={"Crypto Reward"}
              tokenDetails={() => {}}
            />
          ))}
        </CardContainer>
      </div>
    </div>
  );
};

export default withConnectionRequired(withRoleAdmin(RewardsAdministration));
