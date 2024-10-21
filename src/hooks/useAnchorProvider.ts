"use client";

import { useMemo } from "react";
import {
  useConnection,
  useWallet,
  AnchorWallet,
} from "@solana/wallet-adapter-react";
import { AnchorProvider } from "@coral-xyz/anchor";

export function useAnchorProvider() {
  const { connection } = useConnection();
  const wallet = useWallet();

  return useMemo(
    () =>
      new AnchorProvider(connection, wallet as AnchorWallet, {
        commitment: "confirmed",
      }),
    [wallet, connection],
  );
}
