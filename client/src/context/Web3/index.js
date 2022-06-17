import React, { useCallback, useEffect, useState } from "react";
import SportTicketsContract from "../../contracts/SportTickets.json";
import { getWeb3 } from "../../getWeb3";

const Web3Context = React.createContext("web3context");

const connectWeb3 = async () => {
  const web3 = await getWeb3();
  // Use web3 to get the user's accounts.
  const accounts = await web3.eth.getAccounts();
  // Get the contract instance.
  const networkId = await web3.eth.net.getId();
  const deployedNetwork = SportTicketsContract.networks[networkId];
  const contract = new web3.eth.Contract(
    SportTicketsContract.abi,
    deployedNetwork && deployedNetwork.address
  );

  return { web3, accounts, contract };
};

const Web3Provider = ({ children }) => {
  const [{ web3, accounts, contract }, setState] = useState({
    web3: null,
    accounts: null,
    contract: null,
  });

  const startWeb3 = useCallback(async () => {
    try {
      const { web3, accounts, contract } = await connectWeb3();
      setState({ web3, accounts, contract });
    } catch (e) {
      console.error(e);
    }
  }, []);

  return (
    <Web3Context.Provider
      value={{
        web3,
        accounts,
        contract,
        connect: startWeb3,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

const Web3Consumer = Web3Context.Consumer;

export { Web3Context, Web3Provider, Web3Consumer };
