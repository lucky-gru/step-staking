"use client";

import { Alert } from "@/components/common/notifications/Alert";
import { DisconnectedIcon } from "../../icons/DisconnectedIcon";

export type WalletDisconnectedAlertProps = {
  address: string;
};

export function WalletDisconnectedAlert({
  address,
}: WalletDisconnectedAlertProps) {
  return (
    <Alert icon={<DisconnectedIcon size={24} className="text-orange-700" />}>
      <h1 className="text-base font-bold text-white/85">
        Disconnected from {address}
      </h1>
    </Alert>
  );
}
