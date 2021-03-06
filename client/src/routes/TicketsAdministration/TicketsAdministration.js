import React, { useCallback, useContext, useEffect, useState } from "react";
import { Web3Context } from "../../context/Web3";
import Button from "../../core/Button";

import withConnectionRequired from "../../hocs/withConnectionRequired";
import withRoleAdmin from "../../hocs/withRoleAdmin";
import { notify } from "../../utils/notifications";

import useStyles from "./TicketsAdministration.style";

const getTeamLogo = (team) => {
  switch (team) {
    case "Real Madrid":
      return "realmadrid.png";
    case "Chelsea":
      return "chelsea.png";
    case "Bayern Munich":
      return "bayern.png";
    case "Barcelona F.C.":
      return "barcelona.png";
    case "Rayo Vallecano":
      return "rayo.png";
    case "Atletic de Bilbao":
      return "bilbao.png";
    case "Real Betis":
      return "betis.png";
    default:
      return "";
  }
};

const TicketsAdministration = () => {
  const classes = useStyles();
  const { contracts } = useContext(Web3Context);
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    if (contracts) {
      const getMatches = async () => {
        const matches = await contracts.management.methods
          .getAllMatchs()
          .call();
        setMatches(matches);
        console.log(matches);
      };
      getMatches();
    }
  }, [contracts]);

  const airDropMatch = useCallback(
    async (id) => {
      try {
        notify(
          "Processing...",
          "This process may take several minutes, please wait.",
          "info",
          10000
        );
        await contracts.management.methods
          .airdropMatchTickets(id)
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
      <h2>Administraci??n de entradas</h2>
      {matches.map((match) => (
        <div className={classes.matchTicketRoot} key={match.matchId}>
          <div>
            <img
              alt={match.local}
              className={classes.logo_small}
              src={`${process.env.PUBLIC_URL}/assets/images/logos/${getTeamLogo(
                match.local
              )}`}
            />
            <img
              alt="vs"
              className={classes.logo}
              src={`${process.env.PUBLIC_URL}/assets/images/vs.png`}
            />
            <img
              alt={match.visitor}
              className={classes.logo}
              src={`${process.env.PUBLIC_URL}/assets/images/logos/${getTeamLogo(
                match.visitor
              )}`}
            />
          </div>
          <Button onClick={() => airDropMatch(match.matchId)}>
            Repartir entradas
          </Button>
        </div>
      ))}
    </div>
  );
};

export default withConnectionRequired(withRoleAdmin(TicketsAdministration));
