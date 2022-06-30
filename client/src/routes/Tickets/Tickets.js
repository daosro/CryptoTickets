import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { USER_ZONE_SUBSCRIBER_PATH } from "../../constants/routes";
import { Web3Context } from "../../context/Web3";
import Card, { CardContainer } from "../../core/Card";
import Button from "../../core/Button";
import NonFungibleToken from "../../core/NonFungibleToken";

import useStyles from "./Tickets.style";
import { getTokenBalanceOf, getTokenMetadataByIndex } from "../../utils/web3";

const Tickets = () => {
  const classes = useStyles();
  const { accounts, contracts } = useContext(Web3Context);
  const [subscriberNFTMetadata, setSubscriberNFTMetadata] = useState(null);
  const [ticketsNFTsMetadata, setTicketsNFTsMetadata] = useState([]);

  useEffect(() => {
    if (accounts?.[0] || contracts.lenght) {
      const getUserToken = async () => {
        const account = accounts[0];
        const membershipTokensLength = await getTokenBalanceOf(
          contracts.membership,
          account
        );
        if (membershipTokensLength > 0) {
          const metadata = await getTokenMetadataByIndex(
            contracts.membership,
            account,
            0
          );
          setSubscriberNFTMetadata(metadata);
        } else {
          setSubscriberNFTMetadata(null);
        }
        const ticketsTokensLength = await getTokenBalanceOf(
          contracts.matchTickets,
          account
        );
        if (ticketsTokensLength > 0) {
          const tokensMetadata = [];

          for (let i = 0; i < ticketsTokensLength; i++) {
            const metadata = await getTokenMetadataByIndex(
              contracts.matchTickets,
              account,
              i
            );
            if (metadata) {
              tokensMetadata.push(metadata);
            }
          }
          setTicketsNFTsMetadata(tokensMetadata);
        } else {
          setTicketsNFTsMetadata([]);
        }
      };
      getUserToken();
    }
  }, [accounts, contracts]);

  return (
    <div className={classes.root}>
      <h2>Mis entradas</h2>
      <CardContainer>
        {subscriberNFTMetadata ? (
          <NonFungibleToken
            metadata={subscriberNFTMetadata}
            title={"Abono de Socio"}
            tokenDetails={() => {}}
          />
        ) : (
          <Card
            xs={12}
            sm={6}
            md={4}
            lg={3}
            xl={3}
            xxl={2.4}
            header={"Aún no eres socio"}
          >
            <div className={classes.cardContent}>
              <div className={classes.cardText}>
                No esperes más y hazte socio hoy mismo
              </div>
              <Link to={USER_ZONE_SUBSCRIBER_PATH}>
                <Button className={classes.carHeader}>Quiero ser socio</Button>
              </Link>
            </div>
          </Card>
        )}
        {ticketsNFTsMetadata.map((metadata) => (
          <NonFungibleToken
            metadata={metadata}
            title={"Crypto Ticket"}
            tokenDetails={() => {}}
            useToke={() => {}}
            sellToken={() => {}}
          />
        ))}
      </CardContainer>
    </div>
  );
};

export default Tickets;
