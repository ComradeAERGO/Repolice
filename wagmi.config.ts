import { defineConfig } from "@wagmi/cli";
import { hardhat, react } from "@wagmi/cli/plugins";
import { abi } from "./artifacts/contracts/Repolice.sol/Repolice.json";

const SEPOLIA_REPOLICE = "0xDA092E403Fce0C278eA55191966aa603FacF9fDF";
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
