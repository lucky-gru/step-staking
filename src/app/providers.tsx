"use client";

import { ReactNode, useCallback } from "react";
import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { clusterApiUrl } from "@solana/web3.js";
import { SnackbarProvider } from "notistack";
import { WalletError } from "@solana/wallet-adapter-base";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  LedgerWalletAdapter,
  TorusWalletAdapter,
  Coin98WalletAdapter,
  CoinbaseWalletAdapter,
  MathWalletAdapter,
  XDEFIWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { WalletModalProvider } from "@/components/common/wallet-adapter-ant-design";
import { StylessContent } from "@/components/common/notifications/StylessContent";

import "@/components/common/wallet-adapter-ant-design/style.css";

export const queryClient = new QueryClient();

export function Providers({ children }: { children: ReactNode }) {
  const onError = useCallback((error: WalletError) => {
    console.error(error);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryStreamedHydration>
        <AntdRegistry>
          <ConnectionProvider
            endpoint={
              process.env.NEXT_PUBLIC_MAINNET_RPC ||
              clusterApiUrl("mainnet-beta")
            }
          >
            <WalletProvider
              wallets={[
                new PhantomWalletAdapter(),
                new SolflareWalletAdapter(),
                new LedgerWalletAdapter(),
                new TorusWalletAdapter(),
                new Coin98WalletAdapter(),
                new CoinbaseWalletAdapter(),
                new MathWalletAdapter(),
                new XDEFIWalletAdapter(),
              ]}
              onError={onError}
              autoConnect={true}
            >
              <WalletModalProvider>
                <SnackbarProvider
                  Components={{
                    default: StylessContent,
                  }}
                >
                  {children}
                </SnackbarProvider>
              </WalletModalProvider>
            </WalletProvider>
          </ConnectionProvider>
        </AntdRegistry>
      </ReactQueryStreamedHydration>
    </QueryClientProvider>
  );
}
