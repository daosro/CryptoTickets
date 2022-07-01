var CryptoTicketsMembershipNFTs = artifacts.require(
  "./CryptoTicketsMembershipNFTs.sol"
);
var CryptoTicketsMatchNFTs = artifacts.require("./CryptoTicketsMatchNFTs.sol");

module.exports = async function (deployer) {
  await deployer.deploy(CryptoTicketsMatchNFTs);

  await deployer.deploy(
    CryptoTicketsMembershipNFTs,
    CryptoTicketsMatchNFTs.address
  );

  var cryptoTicketsMatch = await CryptoTicketsMatchNFTs.deployed();

  await cryptoTicketsMatch.grantAdminRol(CryptoTicketsMembershipNFTs.address);
};
4;
