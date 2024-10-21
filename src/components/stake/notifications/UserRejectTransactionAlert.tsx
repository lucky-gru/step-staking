"use client";

import { Alert } from "@/components/common/notifications/Alert";

export function UserRejectTransactionAlert() {
  return (
    <Alert variant="error">
      <div className="flex flex-col gap-4">
        <h1 className="text-base font-bold text-white/85">
          You declined this transaction
        </h1>
        <p className="text-sm text-neutral-400">
          You declined this transaction in your wallet, or the transaction has
          timed out.
        </p>
      </div>
    </Alert>
  );
}
