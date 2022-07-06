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
  await cryptoTicketsManagement.grantAdminRol(
    CryptoTicketsMembershipNFTs.address
  );
  await cryptoTicketsMatch.grantAdminRol(CryptoTicketsMatchManagement.address);
  await cryptoTicketsMatch.grantClubRol(CryptoTicketsMatchManagement.address);

  await cryptoTicketsManagement.addNewMatch(
    "Real Madrid", // Local
    "Rayo Vallecano", // Visitor
    "ipfs://bafybeiaijux6ugx26qrxh7do36seqro6xzgmjtnagc3pbqimn6e63yruwe/", // Car Base URL
    "ipfs://bafybeiaijux6ugx26qrxh7do36seqro6xzgmjtnagc3pbqimn6e63yruwe/5", // Marketplace Ticket NFT
    30, // Match mints allowed
    new Date(new Date().setMonth(new Date().getMonth() + 2)).getTime(), // Expiration date
    5, // Total tokens in car path (For the rollup)
    "20000000000000000" // Price in wei
  );
  await cryptoTicketsManagement.addNewMatch(
    "Real Madrid",
    "Real Betis",
    "ipfs://bafybeiaeamdeii2liwhh7lapkccmobjs7bhxllfurh7h5eik5jv7w22xk4/",
    "ipfs://bafybeiaeamdeii2liwhh7lapkccmobjs7bhxllfurh7h5eik5jv7w22xk4/5",
    30,
    new Date(new Date().setMonth(new Date().getMonth() + 3)).getTime(),
    5,
    "30000000000000000"
  );
  await cryptoTicketsManagement.addNewMatch(
    "Real Madrid",
    "Atletic de Bilbao",
    "ipfs://bafybeid576zpokj7n57mnytsweyat2w4kjp6bdstwhcz4b6szkrnluheyi/",
    "ipfs://bafybeid576zpokj7n57mnytsweyat2w4kjp6bdstwhcz4b6szkrnluheyi/5",
    30,
    new Date(new Date().setMonth(new Date().getMonth() + 3)).getTime(),
    5,
    "10000000000000000"
  );
  await cryptoTicketsManagement.addNewMatch(
    "Real Madrid",
    "Chelsea",
    "ipfs://bafybeifoxm5q4f7d2jryjnuu5jgkuafsmc4cn244n7npae7vaqhfatrryi/",
    "ipfs://bafybeifoxm5q4f7d2jryjnuu5jgkuafsmc4cn244n7npae7vaqhfatrryi/5",
    30,
    new Date(new Date().setMonth(new Date().getMonth() + 3)).getTime(),
    5,
    "60000000000000000"
  );
  await cryptoTicketsManagement.addNewMatch(
    "Real Madrid",
    "Bayern Munich",
    "ipfs://bafybeibo67eeeuw25jmcvrbhbuerjl6m6appi5gr5mnif4522mw5tuhiti/",
    "ipfs://bafybeibo67eeeuw25jmcvrbhbuerjl6m6appi5gr5mnif4522mw5tuhiti/5",
    30,
    new Date(new Date().setMonth(new Date().getMonth() + 3)).getTime(),
    5,
    "80000000000000000"
  );
};
4;
