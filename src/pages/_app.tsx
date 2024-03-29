import "@/styles/globals.css";
import { PersistGate } from "redux-persist/integration/react";
import type { AppProps } from "next/app";
import { wrapper } from "@/store/store";
import { useStore } from "react-redux";
import {
  configureChains,
  createConfig,
  mainnet,
  sepolia,
  WagmiConfig,
} from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { Layout } from "./Layout";
import { MantineProvider } from "@mantine/core";
import { InjectedConnector } from "wagmi/connectors/injected";
import { alchemyProvider } from "wagmi/providers/alchemy";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet, sepolia],
  [
    alchemyProvider({ apiKey: "ZKSi2bnMz9GcnVpeGFCXkd2RQC_hUBB5" }),
    publicProvider(),
  ]
);

const config = createConfig({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new InjectedConnector({ chains }),
  ],
  publicClient,
  webSocketPublicClient,
});

function App({ Component, pageProps }: AppProps) {
  const store: any = useStore();
  return (
    <PersistGate persistor={store.__persistor} loading={<div>Loading</div>}>
      <WagmiConfig config={config}>
        <MantineProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </MantineProvider>
      </WagmiConfig>
    </PersistGate>
  );
}

export default wrapper.withRedux(App);
