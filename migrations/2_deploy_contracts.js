var SportTickets = artifacts.require("./SportTickets.sol");

module.exports = function(deployer) {
  deployer.deploy(SportTickets);
};
