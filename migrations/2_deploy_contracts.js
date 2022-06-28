var STRMMembership = artifacts.require("./STRMMembership.sol");
var STRMMatchTickets = artifacts.require("./Match.sol");

module.exports = function (deployer) {
  deployer.deploy(STRMMembership);
  deployer.deploy(STRMMatchTickets);
};
4;
