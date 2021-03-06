import React, { useCallback, useEffect, useState } from "react";
import { CHAIN_DATA, CHAIN_ID } from "../../constants/chain";
import CryptoTicketsMatchNFTsContract from "../../contracts/CryptoTicketsMatchNFTs.json";
import CryptoTicketsMembershipNFTsContract from "../../contracts/CryptoTicketsMembershipNFTs.json";
import CryptoTicketsMarketplaceContract from "../../contracts/CryptoTicketsMarketplace.json";
import CryptoTicketsManagementContract from "../../contracts/CryptoTicketsMatchManagement.json";
import CryptoTicketsRewardsContract from "../../contracts/CryptoTicketsRewards.json";
import {
  enableWeb3Instance,
  getContractInstance,
  getUserAccounts,
  getWeb3Instance,
  switchToCorrectChain,
} from "../../utils/web3";

const Web3Context = React.createContext("web3context");

const switchToContractChain = async (web3, awaitTime) => {
  const connectedToCorrectChain = await switchToCorrectChain(
    web3,
    CHAIN_ID,
    CHAIN_DATA,
    awaitTime
  );
  return connectedToCorrectChain;
};

const getContractInstances = async (web3, account) => {
  const networkId = await web3.eth.net.getId();

  const membershipContract = getContractInstance(
    web3,
    networkId,
    CryptoTicketsMembershipNFTsContract,
    account
  );
  const matchTicketsContract = getContractInstance(
    web3,
    networkId,
    CryptoTicketsMatchNFTsContract,
    account
  );
  const marketplaceContract = getContractInstance(
    web3,
    networkId,
    CryptoTicketsMarketplaceContract,
    account
  );
  const rewardsContract = getContractInstance(
    web3,
    networkId,
    CryptoTicketsRewardsContract,
    account
  );
  const managementContract = getContractInstance(
    web3,
    networkId,
    CryptoTicketsManagementContract,
    account
  );
  return {
    membership: membershipContract,
    matchTickets: matchTicketsContract,
    marketplace: marketplaceContract,
    rewards: rewardsContract,
    management: managementContract,
  };
};

const connectAccount = async (web3) => {
  await enableWeb3Instance();
  // Use web3 to get the user's accounts.
  const accounts = await getUserAccounts(web3);

  const connectedToCorrectChain = await switchToContractChain(web3, 0);
  if (connectedToCorrectChain) {
    // Get the contract instance.
    const contracts = await getContractInstances(web3, accounts[0]);
    return { accounts, contracts, isConnected: accounts.length > 0 };
  }
  return { accounts: null, contracts: {}, isConnected: false };
};

const INITIAL_STATE = {
  web3: null,
  isConnected: false,
  accounts: null,
  contracts: {},
};

const Web3Provider = ({ children }) => {
  const [{ web3, accounts, isConnected, contracts }, setState] =
    useState(INITIAL_STATE);

  useEffect(() => {
    const getWeb3 = async () => {
      const web3 = await getWeb3Instance();
      // Check if the user is already connected.
      const accounts = await getUserAccounts(web3);
      if (accounts.length > 0) {
        const connectedToCorrectChain = await switchToContractChain(web3, 0);
        const contracts = await getContractInstances(web3, accounts[0]);
        setState((prevState) => ({
          ...prevState,
          web3,
          contracts,
          accounts: connectedToCorrectChain ? accounts : null,
          isConnected: connectedToCorrectChain,
        }));
      } else {
        setState((prevState) => ({ ...prevState, web3 }));
      }
    };
    getWeb3();
  }, []);

  useEffect(() => {
    let onChainChanged;
    let onAccountChanged;
    let onDisconnect;
    if (window.ethereum) {
      onChainChanged = async () => {
        setState((prevState) => ({ ...prevState, isConnected: false }));
        const connectedToCorrectChain = await switchToContractChain(web3, 3000);
        if (!connectedToCorrectChain) {
          setState((prevState) => ({ ...INITIAL_STATE, web3: prevState.web3 }));
        } else {
          const { accounts, isConnected, contracts } = await connectAccount(
            web3
          );
          setState((prevState) => ({
            ...prevState,
            accounts,
            isConnected,
            contracts,
          }));
        }
      };
      onAccountChanged = async () => {
        const accounts = await web3.eth.getAccounts();
        if (accounts.length > 0) {
          const contracts = await getContractInstances(web3, accounts[0]);
          setState((prevState) => ({ ...prevState, accounts, contracts }));
        } else {
          // The user is disconnected.
          setState((prevState) => ({ ...INITIAL_STATE, web3: prevState.web3 }));
        }
      };
      onDisconnect = () => {
        setState((prevState) => ({ ...INITIAL_STATE, web3: prevState.web3 }));
      };
      window.ethereum.on("chainChanged", onChainChanged);
      window.ethereum.on("accountsChanged", onAccountChanged);
      // window.ethereum.on('connect', () =>{ });
      window.ethereum.on("disconnect", onDisconnect);
    }
    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener("chainChanged", onChainChanged);
        window.ethereum.removeListener("accountsChanged", onAccountChanged);
        window.ethereum.removeListener("disconnect", onDisconnect);
      }
    };
  }, [web3]);

  const connect = useCallback(async () => {
    try {
      const { accounts, isConnected, contracts } = await connectAccount(web3);
      setState((prevState) => ({
        ...prevState,
        accounts,
        isConnected,
        contracts,
      }));
    } catch (error) {
      console.error(error);
    }
  }, [web3]);

  return (
    <Web3Context.Provider
      value={{
        web3,
        accounts,
        contracts,
        isConnected,
        connect,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

const Web3Consumer = Web3Context.Consumer;

export { Web3Context, Web3Provider, Web3Consumer };
