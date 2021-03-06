require("dotenv").config();
const path = require("path");
const HDWalletProvider = require("@truffle/hdwallet-provider");

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    ganache: {
      host: "127.0.0.1", // Localhost (default: none)
      port: 7545, // Standard Ethereum port (default: none)
      network_id: 1337, // Any network (default: none)
    },
    mumbai: {
      provider: () =>
        new HDWalletProvider(
          process.env.MNEMONIC,
          `https://matic-mumbai.chainstacklabs.com/`
        ),
      network_id: 80001,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
    },
    avalanche_fuji: {
      provider: () =>
        new HDWalletProvider(
          process.env.MNEMONIC,
          `https://api.avax-test.network/ext/bc/C/rpc`
        ),
      network_id: 43113,
      confirmations: 2,
      networkCheckTimeoutnetworkCheckTimeout: 10000,
      timeoutBlocks: 200,
      skipDryRun: true,
    },
  },
  compilers: {
    solc: {
      version: "^0.8.4",
    },
  },
};
