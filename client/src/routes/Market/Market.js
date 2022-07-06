import React, { useCallback, useContext, useEffect, useState } from "react";
import { Web3Context } from "../../context/Web3";
import { CardContainer } from "../../core/Card";
import NonFungibleToken from "../../core/NonFungibleToken";
import withConnectionRequired from "../../hocs/withConnectionRequired";
import { getOnSaleTokenInfo } from "../../utils/contracts";
import { notify } from "../../utils/notifications";
import { getContractAddress, getTokenMetadataById } from "../../utils/web3";

import CryptoTicketsMatchManagementContract from "../../contracts/CryptoTicketsMatchManagement.json";

import useStyles from "./Market.style";
import { CHAIN_ID } from "../../constants/chain";
import { getNFTMetadataObject } from "../../services/nft";
import LoadingPage from "../../core/LoadingPage";

const getOnSaleTokensMetadata = async (contracts, web3) => {
  const result = [];
  try {
    const onSaleTokenInfo = await getOnSaleTokenInfo(contracts);
    if (onSaleTokenInfo?.length > 0) {
      for (let tokenInfo of onSaleTokenInfo) {
        const metadata = await getTokenMetadataById(
          contracts.matchTickets,
          tokenInfo.tokenId
        );
        if (metadata) {
          result.push({
            ...metadata,
            ...tokenInfo,
            price: web3.utils.fromWei(tokenInfo.price.toString(), "ether"),
          });
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
  return result;
};

const getOnSaleClubMatch = async (contracts, web3) => {
  let onSaleClubMatchs = [];
  if (contracts && contracts.management) {
    try {
      const result = await contracts.management.methods.getAllMatchs().call();

      for (let match of result) {
        const metadata = await getNFTMetadataObject(match.metadataURI);
        onSaleClubMatchs.push({
          ...match,
          ...metadata,
          verified: true,
          soldout: Number(match.totalSales) >= Number(match.maxCapacity),
          seller: getContractAddress(
            CHAIN_ID,
            CryptoTicketsMatchManagementContract
          ),
          price: web3.utils.fromWei(match.pvp.toString(), "ether"),
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
  return onSaleClubMatchs;
};

const Market = () => {
  const classes = useStyles();
  const { web3, accounts, contracts } = useContext(Web3Context);
  const [loadingClubMatchs, setLoadingClubMatchs] = useState(true);
  const [loadingMarketMatchs, setLoadingMarketMatchs] = useState(true);
  const [onSaleClubMatch, setOnSaleClubMatch] = useState([]);
  const [onSaleTokenMetadataList, setonSaleTokenMetadataList] = useState([]);

  useEffect(() => {
    const getOnSaleTokens = async () => {
      const tokensOnSale = await getOnSaleTokensMetadata(contracts, web3);
      setonSaleTokenMetadataList(tokensOnSale);
      setLoadingClubMatchs(false);
      const onSaleClubTickets = await getOnSaleClubMatch(contracts, web3);
      setOnSaleClubMatch(onSaleClubTickets);
      setLoadingMarketMatchs(false);
    };
    getOnSaleTokens();
  }, [web3, contracts]);

  const buyTokenHandler = useCallback(
    async ({ price, tokenId }) => {
      const account = accounts[0];
      await contracts.marketplace.methods
        .purchase(tokenId)
        .send({
          from: account,
          value: web3.utils.toWei(price.toString(), "ether"),
        })
        .on("receipt", async () => {
          const tokensOnSale = await getOnSaleTokensMetadata(contracts, web3);
          setonSaleTokenMetadataList(tokensOnSale);
          notify(
            "Congratulations!",
            "Ticket buy successfully",
            "success",
            5000
          );
        })
        .on("error", (error, receipt) => {
          notify("Something went wrong", error?.message, "danger", 10000);
        });
    },
    [accounts, web3, contracts]
  );

  const buyTicketToClubHandler = useCallback(
    async (matchInfo) => {
      const account = accounts[0];
      await contracts.management.methods
        .mintSaleMatchTicket(matchInfo.matchId)
        .send({
          from: account,
          value: web3.utils.toWei(matchInfo.price.toString(), "ether"),
        })
        .on("receipt", async () => {
          const tokensOnSale = await getOnSaleTokensMetadata(contracts, web3);
          setonSaleTokenMetadataList(tokensOnSale);
          const onSaleClubTickets = await getOnSaleClubMatch(contracts, web3);
          setOnSaleClubMatch(onSaleClubTickets);
          notify(
            "Congratulations!",
            "Ticket buy successfully",
            "success",
            5000
          );
        })
        .on("error", (error, receipt) => {
          notify("Something went wrong", error?.message, "danger", 10000);
        });
    },
    [accounts, web3, contracts]
  );

  return (
    <div className={classes.root}>
      <h2>Marketplaces</h2>

      <CardContainer>
        {loadingClubMatchs ? (
          <LoadingPage />
        ) : (
          onSaleClubMatch.map((match) => (
            <NonFungibleToken
              key={match.matchId}
              metadata={match}
              title={"Crypto Ticket Oficial"}
              tokenDetails={() => {}}
              buyToken={() => buyTicketToClubHandler(match)}
            />
          ))
        )}
        {loadingMarketMatchs ? (
          <LoadingPage />
        ) : (
          onSaleTokenMetadataList.map((metadata) => (
            <NonFungibleToken
              key={metadata.tokenId}
              metadata={metadata}
              title={"Crypto Ticket"}
              tokenDetails={() => {}}
              buyToken={() => buyTokenHandler(metadata)}
            />
          ))
        )}
      </CardContainer>
    </div>
  );
};

export default withConnectionRequired(Market);
