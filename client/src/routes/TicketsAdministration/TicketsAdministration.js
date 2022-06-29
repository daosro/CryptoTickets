import React, { useCallback, useContext, useState } from "react";
import { Web3Context } from "../../context/Web3";
import Button from "../../core/Button";

import withConnectionRequired from "../../hocs/withConnectionRequired";
import { notify } from "../../utils/notifications";

import useStyles from "./TicketsAdministration.style";

const FOOTBALL_MATCHES = [
  {
    id: 0,
    homeTeam: "Real Madrid",
    homeTeamLogo: "realmadrid.png",
    awayTeam: "Chelsea",
    awayTeamLogo: "chelsea.png",
  },
  {
    id: 1,
    homeTeam: "Real Madrid",
    homeTeamLogo: "realmadrid.png",
    awayTeam: "Bayern Munich",
    awayTeamLogo: "bayern.png",
  },
  {
    id: 2,
    homeTeam: "Real Madrid",
    homeTeamLogo: "realmadrid.png",
    awayTeam: "Barcelona F.C.",
    awayTeamLogo: "barcelona.png",
  },
  {
    id: 3,
    homeTeam: "Real Madrid",
    homeTeamLogo: "realmadrid.png",
    awayTeam: "Cádiz C.F.",
    awayTeamLogo: "cadiz.png",
  },
];

const TicketsAdministration = () => {
  const classes = useStyles();
  const { contracts } = useContext(Web3Context);

  const airDropMatch = useCallback(
    async (id) => {
      try {
        notify(
          "Processing...",
          "This process may take several minutes, please wait.",
          "info",
          10000
        );
        await contracts.matchTickets.methods
          .mintMatch(
            `ipfs://bafybeidpaq5ba6237nat7nmj6yjrkfv2i3qdjj5tnh6kt4b7l7xd3te4u4/season${id}`
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
    },
    [contracts]
  );

  return (
    <div className={classes.root}>
      <h2>Administración de entradas</h2>
      {FOOTBALL_MATCHES.map((match) => (
        <div className={classes.matchTicketRoot} key={match.id}>
          <div>
            <img
              alt="home team"
              className={classes.logo_small}
              src={`${process.env.PUBLIC_URL}/assets/images/logos/${match.homeTeamLogo}`}
            />

            <img
              alt="vs"
              className={classes.logo}
              src={`${process.env.PUBLIC_URL}/assets/images/vs.png`}
            />

            <img
              alt="away team"
              className={classes.logo}
              src={`${process.env.PUBLIC_URL}/assets/images/logos/${match.awayTeamLogo}`}
            />
          </div>
          <Button onClick={() => airDropMatch(match.id)}>
            Repartir entradas
          </Button>
        </div>
      ))}
    </div>
  );
};

export default withConnectionRequired(TicketsAdministration);
