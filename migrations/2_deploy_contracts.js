var STRMMembership = artifacts.require("./STRMMembership.sol");
var STRMMatchTickets = artifacts.require("./STRMMatchTickets.sol");

module.exports = async function (deployer) {
  await deployer.deploy(STRMMatchTickets);

  await deployer.deploy(STRMMembership, STRMMatchTickets.address);

  var strmMatchTickets = await STRMMatchTickets.deployed();

  await strmMatchTickets.grantAdminRol(STRMMembership.address);
};
4;
