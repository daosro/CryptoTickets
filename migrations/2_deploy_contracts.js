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

  await deployer.deploy(
    CryptoTicketsMatchNFTs,
    CryptoTicketsRewards.address,
    process.env.CLUB_ADDRESS
  );

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
    "ipfs://bafybeiaijux6ugx26qrxh7do36seqro6xzgmjtnagc3pbqimn6e63yruwe/5",
    20,
    new Date(new Date().setMonth(new Date().getMonth() + 2)).getTime(),
    5,
    "5000000000000000000"
  );
  await cryptoTicketsManagement.addNewMatch(
    "Real Madrid",
    "Real Betis",
    "ipfs://bafybeiaeamdeii2liwhh7lapkccmobjs7bhxllfurh7h5eik5jv7w22xk4/",
    "ipfs://bafybeiaeamdeii2liwhh7lapkccmobjs7bhxllfurh7h5eik5jv7w22xk4/5",
    3,
    new Date(new Date().setMonth(new Date().getMonth() + 3)).getTime(),
    5,
    "1000000000000000000"
  );
};
4;
