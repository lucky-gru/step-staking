"use client";

import { Alert } from "@/components/common/notifications/Alert";

export function ApproveAlert() {
  return (
    <Alert variant="info">
      <h1 className="text-base font-bold text-white/85">
        Approve transactions from your wallet
      </h1>
    </Alert>
  );
}
