import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import {
  // GlowWalletAdapter,
  PhantomWalletAdapter,
  // SlopeWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { ReactNode } from "react";

import { clusterApiUrl } from "@solana/web3.js";
import { useMemo } from "react";
import "@solana/wallet-adapter-react-ui/styles.css";
interface WalletConnectProviderProps {
  children: any;
}
export const WalletConnectProvider = ({
  children,
}: WalletConnectProviderProps) => {
  let network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => {
    if (network === WalletAdapterNetwork.Devnet) {
      return "https://cosmological-practical-rain.solana-devnet.quiknode.pro/9e757085a5f8f6a5ae082c0da4906492a78f6c80/";
    }
    return clusterApiUrl(network);
  }, [network]);

  const wallets = [new PhantomWalletAdapter()];
  // const wallets = useMemo(() => [new PhantomWalletAdapter()], [network]);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider
        wallets={wallets}
        autoConnect
        onError={(e) => console.log(e)}
      >
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};
