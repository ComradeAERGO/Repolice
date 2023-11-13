import { defineConfig } from "@wagmi/cli";
import { hardhat, react } from "@wagmi/cli/plugins";

const SEPOLIA_REPOLICE = "0x170F2FBC19270Ef156edbEC5D769b30861af2E1D";
export default defineConfig({
  out: "src/RepoliceABI.ts",
  // contracts: [
  //   {
  //     abi: abi as any,
  //     address: SEPOLIA_REPOLICE,
  //     name: "Repolice",
  //   },
  // ],
  plugins: [
    react(),
    hardhat({
      project: "./",
    }),
  ],
});
