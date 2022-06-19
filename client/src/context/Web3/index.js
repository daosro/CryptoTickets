import React, { useCallback, useEffect, useState } from "react";
import { CHAIN_DATA, CHAIN_ID } from "../../constants/chain";
import SportTicketsContract from "../../contracts/SportTickets.json";
import {
  enableWeb3Instance,
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

const getContractInstance = (web3, networkId) => {
  const deployedNetwork = SportTicketsContract.networks[networkId];
  const contract = new web3.eth.Contract(
    SportTicketsContract.abi,
    deployedNetwork && deployedNetwork.address
  );
  return contract;
};

const connectAccount = async (web3) => {
  await enableWeb3Instance();
  // Use web3 to get the user's accounts.
  const accounts = await getUserAccounts(web3);

  const networkId = await web3.eth.net.getId();
  const connectedToCorrectChain = await switchToContractChain(web3, 0);
  if (connectedToCorrectChain) {
    // Get the contract instance.
    const contract = getContractInstance(web3, networkId);
    return { accounts, contract, isConnected: accounts.length > 0 };
  }
  return { accounts: null, contract: null, isConnected: false };
};

const INITIAL_STATE = {
  web3: null,
  isConnected: false,
  accounts: null,
  contract: null,
};

const Web3Provider = ({ children }) => {
  const [{ web3, accounts, isConnected, contract }, setState] =
    useState(INITIAL_STATE);

  useEffect(() => {
    const getWeb3 = async () => {
      const web3 = await getWeb3Instance();
      // Check if the user is already connected.
      const accounts = await getUserAccounts(web3);
      if (accounts.length > 0) {
        const connectedToCorrectChain = await switchToContractChain(web3, 0);
        const contract = getContractInstance(web3, web3.eth.net.getId());
        setState((prevState) => ({
          ...prevState,
          web3,
          contract,
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
          const { accounts, isConnected, contract } = await connectAccount(
            web3
          );
          setState((prevState) => ({
            ...prevState,
            accounts,
            isConnected,
            contract,
          }));
        }
      };
      onAccountChanged = async () => {
        const accounts = await web3.eth.getAccounts();
        if (accounts.length > 0) {
          setState((prevState) => ({ ...prevState, accounts }));
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
      const { accounts, isConnected, contract } = await connectAccount(web3);
      setState((prevState) => ({
        ...prevState,
        accounts,
        isConnected,
        contract,
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
        contract,
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
