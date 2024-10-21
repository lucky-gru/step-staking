"use client";

import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useQuery } from "@tanstack/react-query";

export const SOL_BALANCE_KEY = "get-sol-balance";

export function useSolBalance() {
  const { connection } = useConnection();
  const wallet = useWallet();

  const walletAddress = wallet.publicKey;

  return useQuery({
    queryKey: [SOL_BALANCE_KEY, { walletAddress }],
    queryFn: async () => {
      if (!walletAddress) {
        return 0;
      }

      try {
        return connection.getBalance(walletAddress);
      } catch (error) {
        console.error("Error fetching sol balance:", error);
        return 0;
      }
    },
    refetchInterval: 5000,
  });
}
