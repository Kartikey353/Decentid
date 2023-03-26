var Documentverification = artifacts.require("Documentverification");

module.exports = function(deployer) {
  // Deploy the SolidityContract contract as our only task
  deployer.deploy(Documentverification);
};