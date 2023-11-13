const { ethers } = require("hardhat");

async function main() {
  const Repolice = await ethers.getContractFactory("Repolice");
  const repolice = await Repolice.deploy();

  console.log("Repolice deployed to:", repolice.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
