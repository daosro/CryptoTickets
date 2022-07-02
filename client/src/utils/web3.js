import Web3 from "web3";
import { getNFTMetadataObject } from "../services/nft";

/**
 * Get the a instance of web3.
 * @returns {Promise<{web3: Web3}>}
 */
export const getWeb3Instance = async () =>
  new Promise(async (resolve) => {
    // Modern dapp browsers...
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      resolve(web3);
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      // Use Mist/MetaMask's provider.
      const web3 = window.web3;
      console.log("Injected web3 detected.");
      resolve(web3);
    }
    // Fallback to localhost; use dev console port by default...
    else {
      const provider = new Web3.providers.HttpProvider("http://127.0.0.1:8545");
      const web3 = new Web3(provider);
      console.log("No web3 instance injected, using Local web3.");
      resolve(web3);
    }
  });

/**
 * Request the user to connect
 * @param {Web3} web3Instance
 */
export const enableWeb3Instance = async () => {
  try {
    // Request account access if needed
    await window.ethereum.enable();
  } catch (error) {
    console.error(error);
  }
};

/**
 * Get tue user accont, also check if the user is connected to the network.
 * @param {Web3} web3Instance
 * @returns String
 */
export const getUserAccounts = async (web3Instance) =>
  await web3Instance.eth.getAccounts();

export const switchToChain = async (chainIdHex, chainData) => {
  try {
    // Try to change to the correct chain.
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: chainIdHex }],
    });
    return true;
  } catch (switchError) {
    // This error code indicates that the chain has not been added to MetaMask.
    if (switchError.code === 4902) {
      try {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              ...chainData,
              chainId: chainIdHex,
            },
          ],
        });
        return true;
      } catch (addError) {
        console.error(addError);
      }
    }
    console.error(switchError);
  }
  return false;
};

export const switchToCorrectChain = async (
  web3Instance,
  chainId,
  chainData,
  awaitTime = 3000
) => {
  const networkId = await web3Instance.eth.net.getId();
  const chainIdHex = web3Instance.utils.toHex(chainId);
  if (networkId !== chainId) {
    await new Promise((resolve) => setTimeout(resolve, awaitTime));
    const isCorrectNetwork = await switchToChain(chainIdHex, chainData);
    return isCorrectNetwork;
  }
  return true;
};

export const getTokenBalanceOf = async (contract, account) =>
  await contract.methods.balanceOf(account).call();

export const getTokenMetadataById = async (contract, tokenId) => {
  let result = null;
  try {
    const tokenMetadataURI = await contract.methods.tokenURI(tokenId).call();

    result = await getNFTMetadataObject(tokenMetadataURI);
    result = { ...result, tokenId: tokenId };
  } catch (error) {
    console.error(error);
  } finally {
    return result;
  }
};

export const getTokenMetadataByIndex = async (contract, account, tokenIdx) => {
  let result = null;
  try {
    const tokenId = await contract.methods
      .tokenOfOwnerByIndex(account, tokenIdx)
      .call();

    const tokenMetadataURI = await contract.methods.tokenURI(tokenId).call();

    result = await getNFTMetadataObject(tokenMetadataURI);
    result = { ...result, tokenId: tokenId };
  } catch (error) {
    console.error(error);
  } finally {
    return result;
  }
};

export const getContractAddress = (networkId, contractJson) => {
  const contract = contractJson.networks[networkId];
  return contract && contract.address;
};

export const getContractInstance = (web3, networkId, contractJson, account) => {
  const result = new web3.eth.Contract(
    contractJson.abi,
    getContractAddress(networkId, contractJson),
    {
      from: account,
    }
  );

  return result;
};
