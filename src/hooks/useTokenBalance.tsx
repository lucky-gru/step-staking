"use client";

import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAccount, getAssociatedTokenAddressSync } from "@solana/spl-token";
import { useCallback } from "react";
import { useSnackbar } from "notistack";
import { StakeErrorAlert } from "@/components/stake/notifications/StakeErrorAlert";

export const TOKEN_BALANCE_KEY = "get-token-balance";

export function useTokenBalance(mintAddress: PublicKey) {
  const wallet = useWallet();
  const { connection } = useConnection();
  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();

  const walletAddress = wallet.publicKey;

  const query = useQuery({
    queryKey: [TOKEN_BALANCE_KEY, { walletAddress, mintAddress }],
    queryFn: async () => {
      if (!walletAddress) {
        return 0;
      }

      try {
        // Get the associated token account address
        const tokenAccountAddress = getAssociatedTokenAddressSync(
          mintAddress,
          walletAddress,
        );

        // Fetch the token account data
        const tokenAccountInfo = await getAccount(
          connection,
          tokenAccountAddress,
          "confirmed",
        );

        return Number(tokenAccountInfo.amount) / 1e9;
      } catch (error) {
        // console.error("Error fetching token balance:", error);
        return 0;
      }
    },
    refetchInterval: 5000,
  });

  const invalidate = useCallback(() => {
    queryClient.invalidateQueries({
      queryKey: [TOKEN_BALANCE_KEY, { walletAddress, mintAddress }],
    });
  }, [mintAddress, queryClient, walletAddress]);

  return {
    query,
    invalidate,
  };
}
