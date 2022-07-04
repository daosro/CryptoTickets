require("dotenv").config();

var CryptoTicketsMembershipNFTs = artifacts.require(
  "./CryptoTicketsMembershipNFTs.sol"
);
var CryptoTicketsMatchNFTs = artifacts.require("./CryptoTicketsMatchNFTs.sol");
var CryptoTicketsMarketplace = artifacts.require(
  "./CryptoTicketsMarketplace.sol"
);
var CryptoTicketsRewards = artifacts.require("./CryptoTicketsRewards.sol");
var CryptoTicketsMatchManagement = artifacts.require(
  "./CryptoTicketsMatchManagement.sol"
);

module.exports = async function (deployer) {
  await deployer.deploy(CryptoTicketsRewards);

  await deployer.deploy(CryptoTicketsMatchNFTs, CryptoTicketsRewards.address);

  await deployer.deploy(
    CryptoTicketsMatchManagement,
    CryptoTicketsMatchNFTs.address
  );

  await deployer.deploy(
    CryptoTicketsMembershipNFTs,
    CryptoTicketsMatchNFTs.address,
    CryptoTicketsMatchManagement.address
  );

  await deployer.deploy(
    CryptoTicketsMarketplace,
    CryptoTicketsMatchNFTs.address,
    process.env.CLUB_ADDRESS
  );

  var cryptoTicketsMatch = await CryptoTicketsMatchNFTs.deployed();
  var cryptoTicketsManagement = await CryptoTicketsMatchManagement.deployed();
  var cryptoTicketsReward = await CryptoTicketsRewards.deployed();

  await cryptoTicketsReward.grantAdminRol(CryptoTicketsMatchNFTs.address);
  await cryptoTicketsMatch.grantAdminRol(CryptoTicketsMembershipNFTs.address);
  await cryptoTicketsMatch.grantAdminRol(CryptoTicketsMatchManagement.address);
  await cryptoTicketsMatch.grantClubRol(CryptoTicketsMatchManagement.address);

  await cryptoTicketsManagement.addNewMatch(
    "Real Madrid",
    "Rayo Vallecano",
    "ipfs://bafybeiaijux6ugx26qrxh7do36seqro6xzgmjtnagc3pbqimn6e63yruwe/",
    20,
    new Date().getTime(),
    5
  );
};
4;
