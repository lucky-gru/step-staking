"use client";

import { Alert } from "@/components/common/notifications/Alert";
import { WalletIcon } from "../WalletIcon";
import { WalletName } from "@solana/wallet-adapter-base";
import { CopyIcon } from "../../icons/CopyIcon";

export type AddressCopiedToClipboardAlertProps = {
  address: string;
};

export function AddressCopiedToClipboardAlert({
  address,
}: AddressCopiedToClipboardAlertProps) {
  return (
    <Alert icon={<CopyIcon size={24} className="text-neutral-500" />}>
      <div className="flex flex-col gap-4">
        <h1 className="text-base font-bold text-white/85">
          Address copied to clipboard
        </h1>

        <p className="text-sm text-neutral-400">{address}</p>
      </div>
    </Alert>
  );
}
