import React, { useContext, useEffect, useState } from "react";
import { Web3Context } from "../../context/Web3";
import { CardContainer } from "../../core/Card";
import NonFungibleToken from "../../core/NonFungibleToken";
import withConnectionRequired from "../../hocs/withConnectionRequired";

import { getTokenBalanceOf, getTokenMetadataByIndex } from "../../utils/web3";

import useStyles from "./Rewards.style";

const getRewardsTokensMetadata = async (account, contracts) => {
  const result = [];
  try {
    const balanceLength = await getTokenBalanceOf(contracts.rewards, account);
    if (balanceLength > 0) {
      for (let i = 0; i < balanceLength; i++) {
        const metadata = await getTokenMetadataByIndex(
          contracts.rewards,
          account,
          i
        );
        if (metadata) {
          result.push(metadata);
        }
      }
    }
  } catch (error) {
    console.error(error);
  } finally {
    return result;
  }
};

const Rewards = () => {
  const classes = useStyles();
  const { accounts, contracts } = useContext(Web3Context);
  const [rewardsTokenList, setrewardsTokenList] = useState([]);

  useEffect(() => {
    if (accounts && accounts[0] && contracts) {
      const gerRewardsMetadata = async () => {
        const result = await getRewardsTokensMetadata(accounts[0], contracts);
        setrewardsTokenList(result);
      };
      gerRewardsMetadata();
    }
  }, [accounts, contracts]);

  return (
    <div className={classes.root}>
      <h2>Mis recomponsas</h2>
      <CardContainer>
        {rewardsTokenList.length === 0 && (
          <div className={classes.empty}>
            <p>No tienes recompensas</p>
          </div>
        )}
        {rewardsTokenList.map((metadata) => (
          <NonFungibleToken
            key={metadata.tokenId}
            metadata={metadata}
            title={"Crypto Reward"}
            tokenDetails={() => {}}
          />
        ))}
      </CardContainer>
    </div>
  );
};

export default withConnectionRequired(Rewards);
