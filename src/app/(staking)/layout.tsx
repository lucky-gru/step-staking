"use client";

import { ReactNode } from "react";
import { useWallet } from "@solana/wallet-adapter-react";

import { StakeBlank } from "@/components/stake/StakeBlank";
import { StakeIcon } from "@/components/common/icons/StakeIcon";
import { AboutStepStake } from "@/components/stake/AboutStake";

export default function Layout({ children }: { children: ReactNode }) {
  const { connected, connecting } = useWallet();

  if (!connected) {
    return <StakeBlank status={connecting ? "connecting" : "disconnected"} />;
  }

  return (
    <div className="w-full py-[100px]">
      <div className="mx-auto flex max-w-[450px] flex-col items-center gap-8 px-4">
        <div className="flex items-center gap-5 text-4xl text-white">
          <StakeIcon />
          <h1 className="text-3xl font-bold">Stake STEP</h1>
        </div>

        <span className="text-sm text-neutral-400">
          Stake STEP to receive xSTEP
        </span>

        <div className="flex flex-col gap-5">
          <AboutStepStake />
          {children}
        </div>
      </div>
    </div>
  );
}
