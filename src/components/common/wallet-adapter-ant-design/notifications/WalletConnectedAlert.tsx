"use client";

import { Alert } from "@/components/common/notifications/Alert";
import { WalletIcon } from "../WalletIcon";
import { WalletName } from "@solana/wallet-adapter-base";

export type WalletConnectedAlertProps = {
  walletIcon?: string;
  walletName?: WalletName<string>;
  address: string;
};

export function WalletConnectedAlert({
  walletIcon,
  walletName,
  address,
}: WalletConnectedAlertProps) {
  return (
    <Alert
      icon={
        walletIcon && walletName ? (
          <WalletIcon
            wallet={{ adapter: { icon: walletIcon, name: walletName } }}
          />
        ) : null
      }
    >
      <h1 className="text-base font-bold text-white/85">
        Connected to {address}
      </h1>
    </Alert>
  );
}
