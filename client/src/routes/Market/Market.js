import React, { useCallback, useContext, useEffect, useState } from "react";
import { Web3Context } from "../../context/Web3";
import { CardContainer } from "../../core/Card";
import NonFungibleToken from "../../core/NonFungibleToken";
import withConnectionRequired from "../../hocs/withConnectionRequired";
import { getOnSaleTokenInfo } from "../../utils/contracts";
import { notify } from "../../utils/notifications";
import { getTokenMetadataById } from "../../utils/web3";

import useStyles from "./Market.style";

const getOnSaleTokensMetadata = async (contracts, web3) => {
  const onSaleTokenInfo = await getOnSaleTokenInfo(contracts);
  const result = [];
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
  return result;
};

const Market = () => {
  const classes = useStyles();
  const { web3, accounts, contracts } = useContext(Web3Context);
  const [onSaleTokenMetadataList, setonSaleTokenMetadataList] = useState([]);

  useEffect(() => {
    const getOnSaleTokens = async () => {
      const tokensOnSale = await getOnSaleTokensMetadata(contracts, web3);
      setonSaleTokenMetadataList(tokensOnSale);
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

  return (
    <div className={classes.root}>
      <h2>Marketplaces</h2>
      <CardContainer>
        {onSaleTokenMetadataList.map((metadata) => (
          <NonFungibleToken
            key={metadata.tokenId}
            metadata={metadata}
            title={"Crypto Ticket"}
            tokenDetails={() => {}}
            buyToken={() => buyTokenHandler(metadata)}
          />
        ))}
      </CardContainer>
    </div>
  );
};

export default withConnectionRequired(Market);
