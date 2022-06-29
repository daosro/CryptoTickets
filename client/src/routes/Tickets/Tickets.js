import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { USER_ZONE_SUBSCRIBER_PATH } from "../../constants/routes";
import { Web3Context } from "../../context/Web3";
import Card, { CardContainer } from "../../core/Card";
import Button from "../../core/Button";
import NonFungibleToken from "../../core/NonFungibleToken";

import { getNFTMetadataObject } from "../../services/nft";

import useStyles from "./Tickets.style";

const Tickets = () => {
  const classes = useStyles();
  const { accounts, contracts } = useContext(Web3Context);
  const [subscriberNFTMetadata, setSubscriberNFTMetadata] = useState(null);
  const [ticketsNFTsMetadata, setTicketsNFTsMetadata] = useState([]);

  useEffect(() => {
    if (accounts?.[0] || contracts.lenght) {
      const getUserToken = async () => {
        const account = accounts[0];
        const tokenLength = await contracts.membership.methods
          .balanceOf(account)
          .call();

        if (tokenLength > 0) {
          // Fetch the first NFT metadata so you should only mint one Subscriber NFT
          const tokenId = await contracts.membership.methods
            .tokenOfOwnerByIndex(account, 0)
            .call();

          const tokenMetadataURI = await contracts.membership.methods
            .tokenURI(tokenId)
            .call();

          const metadata = await getNFTMetadataObject(tokenMetadataURI);
          setSubscriberNFTMetadata({ ...metadata, tokenId: tokenId });
        } else {
          setSubscriberNFTMetadata(null);
        }
        const ticketsLength = await contracts.matchTickets.methods
          .balanceOf(account)
          .call();
        if (ticketsLength > 0) {
          const tokensMetadata = [];

          for (let i = 0; i < ticketsLength; i++) {
            const tokenId = await contracts.matchTickets.methods
              .tokenOfOwnerByIndex(account, i)
              .call();
            try {
              const tokenMetadataURI = await contracts.matchTickets.methods
                .tokenURI(tokenId)
                .call();

              const metadata = await getNFTMetadataObject(tokenMetadataURI);
              tokensMetadata.push({ ...metadata, tokenId: tokenId });
            } catch (error) {
              console.error(error);
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
          <NonFungibleToken metadata={subscriberNFTMetadata} />
        ) : (
          <Card xs={12} sm={6} md={3} lg={4} header={"Aún no eres socio"}>
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
          <NonFungibleToken metadata={metadata} />
        ))}
      </CardContainer>
    </div>
  );
};

export default Tickets;
