require("dotenv").config();
require("@nomiclabs/hardhat-waffle");

const SEPOLIA_PRIVATE_KEY = `0x${process.env.PRIVATE_KEY}`;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "sepolia",
  solidity: "0.8.20",
  paths: {
    contracts: "./src/contracts",
  },
  networks: {
    sepolia: {
      chainID: 11155111,
      url: `https://sepolia.infura.io/v3/3c82ec9d8b904f50ba4d516cd0e74897`,
      accounts: [SEPOLIA_PRIVATE_KEY],
    },
  },
};
