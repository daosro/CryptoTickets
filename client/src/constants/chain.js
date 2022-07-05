export const MUMBAI_CHAIN_ID = 80001;
export const MUMBAI_CHAIN_ID_HEX = "0x13881";
export const MUMBAI_CHAIN_DATA = {
  chainName: "Polygon Testnet",
  nativeCurrency: {
    name: "MATIC",
    symbol: "MATIC",
    decimals: 18,
  },
  rpcUrls: ["https://matic-mumbai.chainstacklabs.com"],
  blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
};

export const AVAX_FUJI_CHAIN_ID = 43113;
export const AVAX_FUJI_CHAIN_DATA = {
  chainName: "Fuji (C-Chain)",
  nativeCurrency: {
    name: "AVAX",
    symbol: "AVAX",
    decimals: 18,
  },
  rpcUrls: ["https://api.avax-test.network/ext/C/rpc"],
  blockExplorerUrls: ["https://testnet.snowtrace.io"],
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

export const CHAIN_ID = AVAX_FUJI_CHAIN_ID;
export const CHAIN_DATA = AVAX_FUJI_CHAIN_DATA;
