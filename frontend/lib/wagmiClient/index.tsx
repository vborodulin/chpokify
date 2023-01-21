import {
  createClient, configureChains, defaultChains,
} from 'wagmi';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { publicProvider } from 'wagmi/providers/public';

const { chains, provider, webSocketProvider } = configureChains(
  defaultChains,
  [publicProvider()]
);

const connectors = [
  new MetaMaskConnector({ chains }),
  new WalletConnectConnector({
    chains,
    options: {
      qrcode: true,
    },
  }),
];

const client = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

export {
  client,
};
