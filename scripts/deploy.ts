import { ethers } from "hardhat";

async function main() {
  console.log("running")
  const name = "Favour";
  const age = 18

  const simpleRegistry = await ethers.deployContract("SimpleRegistry", [name, age],{});

  console.log(`contract Deployed to address ${simpleRegistry.target}`);
  await simpleRegistry.waitForDeployment();
  console.log(`contract Deployed to address ${simpleRegistry.target}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
