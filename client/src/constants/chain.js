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

export const ALLOWED_CHAINS = [
  { value: MUMBAI_CHAIN_ID, label: "Polygon Testnet" },
  { value: AVAX_FUJI_CHAIN_ID, label: "Avalanche Testnet" },
  { value: GANACHE_CHAIN_ID, label: "Ganache (localhost)" },
];

export const getSelectedChainId = () => {
  const chainId = localStorage.getItem("currenctChainId");
  return chainId ? parseInt(chainId) : MUMBAI_CHAIN_ID;
};

export const getSelectedChainData = () => {
  const chainId = getSelectedChainId();
  switch (chainId) {
    case MUMBAI_CHAIN_ID:
      return MUMBAI_CHAIN_DATA;
    case AVAX_FUJI_CHAIN_ID:
      return AVAX_FUJI_CHAIN_DATA;
    case GANACHE_CHAIN_ID:
      return GANACHE_CHAIN_DATA;
    default:
      return MUMBAI_CHAIN_DATA;
  }
};

export const CHAIN_ID = getSelectedChainId();
export const CHAIN_DATA = getSelectedChainData();
