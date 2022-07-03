require("dotenv").config();

var CryptoTicketsMembershipNFTs = artifacts.require(
  "./CryptoTicketsMembershipNFTs.sol"
);
var CryptoTicketsMatchNFTs = artifacts.require("./CryptoTicketsMatchNFTs.sol");
var CryptoTicketsMarketplace = artifacts.require(
  "./CryptoTicketsMarketplace.sol"
);
var CryptoTicketsRewards = artifacts.require("./CryptoTicketsRewards.sol");

module.exports = async function (deployer) {
  await deployer.deploy(CryptoTicketsRewards);

  await deployer.deploy(CryptoTicketsMatchNFTs, CryptoTicketsRewards.address);

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
  var cryptoTicketsReward = await CryptoTicketsRewards.deployed();

  await cryptoTicketsMatch.grantAdminRol(CryptoTicketsMembershipNFTs.address);
  await cryptoTicketsReward.grantAdminRol(CryptoTicketsMatchNFTs.address);
  // TODO: grantAdminRol each time we add more admins
};
4;
