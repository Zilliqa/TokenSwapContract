// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const TokenSwap = await hre.ethers.getContractFactory('TokenSwap');
  const swap = await TokenSwap.deploy('0x6d99deF8e251Bf34345e4b081028dD2cd49d98C1','0xa5E6e035daa1B85383f36f36D22562F552591df9','0x1504fa1C7f10a7766aFfe8cF8cB16025047ef2af','0x3dfCB4eb9722cA35804cDd6412E36A91Fa041f8b');

  await swap.deployed();

  console.log("swap token deployed to", swap.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
