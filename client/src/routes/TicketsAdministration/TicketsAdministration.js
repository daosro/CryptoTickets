import React, { useCallback, useContext, useState } from "react";
import { Web3Context } from "../../context/Web3";
import Button from "../../core/Button";

import withConnectionRequired from "../../hocs/withConnectionRequired";
import { notify } from "../../utils/notifications";

import useStyles from "./TicketsAdministration.style";

const TicketsAdministration = () => {
  const classes = useStyles();
  const { contracts } = useContext(Web3Context);

  const airDropMatch = useCallback(async () => {
    try {
      notify(
        "Processing...",
        "This process may take several minutes, please wait.",
        "info",
        10000
      );
      await contracts.matchTickets.methods
        .mintMatch(
          "ipfs://bafkreic3xz5cssins4ihcyoo27kcmflwmgqvpbm2stpr3xfxxnsykgkali/season0"
        )
        .send()
        .on("receipt", function () {
          notify(
            "Congratulations!",
            "Match airdrop successfully",
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
  }, [contracts]);

  return (
    <>
      <div className={classes.root}>
        <h2>Administración de entradas</h2>
        <Button onClick={airDropMatch}>Airdrop Match</Button>
      </div>
    </>
  );
};

export default withConnectionRequired(TicketsAdministration);
