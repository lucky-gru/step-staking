"use client";

import { ExplorerLink } from "@/components/common/links/ExplorerLink";
import { Alert } from "@/components/common/notifications/Alert";

export function StakingProgressAlert({
  kind,
  tx,
}: {
  kind: "stake" | "unstake";
  tx: string;
}) {
  return (
    <Alert variant="info">
      <div className="flex flex-col gap-5">
        <h1 className="text-base font-bold text-white/85">
          You are stacking {kind === "stake" ? "STEP" : "xSTEP"}
        </h1>

        <div className="flex flex-col items-end gap-4">
          <p className="text-sm text-neutral-400">
            Confirmation is in progress
          </p>

          <ExplorerLink label="View on Solscan" path={`/tx/${tx}`} />
        </div>
      </div>
    </Alert>
  );
}
