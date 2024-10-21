"use client";

import dynamic from "next/dynamic";

export const WalletButton = dynamic(
  async () =>
    (await import("@/components/common/wallet-adapter-ant-design"))
      .WalletMultiButton,
  {
    ssr: false,
  },
);
