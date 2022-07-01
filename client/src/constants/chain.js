export const MUMBAI_CHAIN_ID = 80001;
export const MUMBAI_CHAIN_ID_HEX = "0x13881";
export const MUMBAI_CHAIN_DATA = {
  // chainId: MUMBAI_CHAIN_ID_HEX,
  chainName: "Polygon Testnet",
  nativeCurrency: {
    name: "MATIC",
    symbol: "MATIC",
    decimals: 18,
  },
  rpcUrls: ["https://matic-mumbai.chainstacklabs.com"],
  blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
};

export const GANACHE_CHAIN_ID = 1337;
export const GANACHE_CHAIN_DATA = {
  chainName: "Ganache",
  nativeCurrency: {
    name: "ETH",
    symbol: "ETH",
    decimals: 18,
  },
  rpcUrls: ["http://127,0,0,1:7545"],
};

export const CHAIN_ID = GANACHE_CHAIN_ID;
export const CHAIN_DATA = GANACHE_CHAIN_DATA;
