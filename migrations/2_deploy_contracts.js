require("dotenv").config();

var CryptoTicketsMembershipNFTs = artifacts.require(
  "./CryptoTicketsMembershipNFTs.sol"
);
var CryptoTicketsMatchNFTs = artifacts.require("./CryptoTicketsMatchNFTs.sol");
var CryptoTicketsMarketplace = artifacts.require(
  "./CryptoTicketsMarketplace.sol"
);

module.exports = async function (deployer) {
  await deployer.deploy(CryptoTicketsMatchNFTs);

  await deployer.deploy(
    CryptoTicketsMembershipNFTs,
    CryptoTicketsMatchNFTs.address
  );

  await deployer.deploy(
    CryptoTicketsMarketplace,
    CryptoTicketsMatchNFTs.address,
    process.env.CLUB_ADDRESS
  );

  var cryptoTicketsMatch = await CryptoTicketsMatchNFTs.deployed();

  await cryptoTicketsMatch.grantAdminRol(CryptoTicketsMembershipNFTs.address);
};
4;
