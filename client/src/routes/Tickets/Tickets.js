import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { USER_ZONE_SUBSCRIBER_PATH } from "../../constants/routes";
import { Web3Context } from "../../context/Web3";
import Card from "../../core/Card";
import Button from "../../core/Button";
import NonFungibleToken from "../../core/NonFungibleToken";

import { getNFTMetadataObject } from "../../services/nft";

import useStyles from "./Tickets.style";

const Tickets = () => {
  const classes = useStyles();
  const { accounts, contract } = useContext(Web3Context);
  const [subscriberNFTMetadata, setSubscriberNFTMetadata] = useState(null);

  useEffect(() => {
    if (accounts?.[0] || contract) {
      const getUserToken = async () => {
        const account = accounts[0];
        const tokenLength = await contract.methods.balanceOf(account).call();

        if (tokenLength > 0) {
          // Fetch the first NFT metadata so you should only mint one Subscriber NFT
          const tokenId = await contract.methods
            .tokenOfOwnerByIndex(account, 0)
            .call();

          const tokenMetadataURI = await contract.methods
            .tokenURI(tokenId)
            .call();

          const metadata = await getNFTMetadataObject(tokenMetadataURI);
          setSubscriberNFTMetadata({ ...metadata, tokenId: tokenId });
        } else {
          setSubscriberNFTMetadata(null);
        }
      };
      getUserToken();
    }
  }, [accounts, contract]);

  return (
    <div className={classes.root}>
      <h2>Mis entradas</h2>
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
    </div>
  );
};

export default Tickets;
