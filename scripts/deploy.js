const hre = require("hardhat");

async function main() {
  const Library = await hre.ethers.getContractFactory("Library");
  const library = await Library.deploy();
  await library.waitForDeployment();

  const address = await library.getAddress();
  console.log("Library deployed to:", address);
  console.log("Copy this address into frontend/app.js");
}

main().catch((e) => { console.error(e); process.exit(1); });