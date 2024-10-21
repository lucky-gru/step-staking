"use client";

import type { Wallet } from "@solana/wallet-adapter-react";
import type { DetailedHTMLProps, FC, ImgHTMLAttributes } from "react";
import React from "react";

export interface WalletIconProps
  extends DetailedHTMLProps<
    ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > {
  wallet: { adapter: Pick<Wallet["adapter"], "icon" | "name"> } | null;
}

export const WalletIcon: FC<WalletIconProps> = ({ wallet, ...props }) => {
  return (
    wallet && (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={wallet.adapter.icon}
        alt={`${wallet.adapter.name} icon`}
        className="!h-5 !w-5"
        {...props}
      />
    )
  );
};
