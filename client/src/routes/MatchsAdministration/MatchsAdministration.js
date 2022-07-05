import React, { useCallback, useContext, useState } from "react";
import { Web3Context } from "../../context/Web3";
import Button from "../../core/Button";

import withConnectionRequired from "../../hocs/withConnectionRequired";
import withRoleAdmin from "../../hocs/withRoleAdmin";
import { notify } from "../../utils/notifications";

import useStyles from "./MatchsAdministration.style";

const MatchsAdministration = () => {
  const classes = useStyles();
  const [matchData, setMatchData] = useState({});
  const { web3, contracts } = useContext(Web3Context);

  const onChangeFromDataHandler = useCallback(
    (event) => {
      const { name, value } = event.target;
      setMatchData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    },
    [setMatchData]
  );

  const addNewMatchHandler = useCallback(async () => {
    if (contracts && contracts.management) {
      const {
        local,
        visitor,
        baseURI,
        maxCapacity,
        expirationDate,
        carTotalTokens,
        pvp,
      } = matchData;
      try {
        const finalBaseURI = `${baseURI}${baseURI.endsWith("/") ? "" : "/"}`;
        contracts.management.methods
          .addNewMatch(
            local,
            visitor,
            finalBaseURI,
            `${finalBaseURI}${maxCapacity}`,
            maxCapacity,
            new Date(expirationDate).getTime(),
            carTotalTokens,
            web3.utils.toWei(pvp.toString(), "ether")
          )
          .send()
          .on("receipt", async () => {
            notify(
              "Congratulations!",
              "Match Add Successfully",
              "success",
              5000
            );
            setMatchData({});
          })
          .on("error", (error) => {
            notify("Something went wrong", error?.message, "danger", 10000);
          });
      } catch (error) {
        console.log(error);
      }
    }
  }, [web3, contracts, matchData]);

  return (
    <div className={classes.root}>
      <h2>Dar de alta nuevos partidos</h2>
      <div className={classes.section}>
        <div className={classes.form}>
          <label>Equipo Local</label>
          <input
            className={classes.input}
            name="local"
            value={matchData.local}
            onChange={onChangeFromDataHandler}
          />
          <label>Equipo Visitante</label>
          <input
            className={classes.input}
            name="visitor"
            value={matchData.visitor}
            onChange={onChangeFromDataHandler}
          />
          <label>Base URI</label>
          <input
            className={classes.input}
            name="baseURI"
            value={matchData.baseURI}
            onChange={onChangeFromDataHandler}
          />
          <label>PVP</label>
          <input
            type="number"
            className={classes.input}
            name="pvp"
            value={matchData.pvp}
            onChange={onChangeFromDataHandler}
          />
          <label>Aforo</label>
          <input
            type="number"
            className={classes.input}
            name="maxCapacity"
            value={matchData.maxCapacity}
            onChange={onChangeFromDataHandler}
          />
          <label>Fecha</label>
          <input
            type="datetime-local"
            className={classes.input}
            name="expirationDate"
            value={matchData.expirationDate}
            onChange={onChangeFromDataHandler}
          />
          <label>Car Total Tokens</label>
          <input
            type="number"
            className={classes.input}
            name="carTotalTokens"
            value={matchData.carTotalTokens}
            onChange={onChangeFromDataHandler}
          />
          <div className={classes.button} style={{ marginTop: "20px" }}>
            <Button
              // disabled={!rewardsNewBaseURI || !rewardsNewSize}
              onClick={addNewMatchHandler}
            >
              Añadir partido
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withConnectionRequired(withRoleAdmin(MatchsAdministration));
