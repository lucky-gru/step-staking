"use client";

import Image from "next/image";

import { Alert } from "@/components/common/notifications/Alert";

import xStepSrc from "@/assets/xStep.svg";
import stepSrc from "@/assets/step.svg";
import { getTokenBalanceStr } from "@/utils/price";
import { ExplorerLink } from "@/components/common/links/ExplorerLink";

export type StakeResultAlertProps = {
  type: "stake" | "unstake";
  stepTokenAmount: number;
  xStepTokenAmount: number;
  tx: string;
};

export function StakeResultAlert({
  type,
  stepTokenAmount,
  xStepTokenAmount,
  tx,
}: StakeResultAlertProps) {
  const stepCom = (
    <div className="flex items-center gap-2">
      <span className="text-base font-bold text-teal-400">
        {type === "stake" ? "-" : "+"}
      </span>
      <Image src={stepSrc} width={28} height={28} alt="xStep token" />
      <span className="text-sm font-medium text-neutral-400">
        {getTokenBalanceStr(stepTokenAmount)}
      </span>
      <span className="text-sm font-black text-neutral-400">STEP</span>
    </div>
  );

  const xStepCom = (
    <div className="flex items-center gap-2">
      <span className="text-base font-bold text-teal-400">
        {type === "stake" ? "+" : "-"}
      </span>
      <Image src={xStepSrc} width={28} height={28} alt="xStep token" />
      <span className="text-sm font-medium text-neutral-400">
        {getTokenBalanceStr(xStepTokenAmount)}
      </span>
      <span className="text-sm font-black text-neutral-400">xSTEP</span>
    </div>
  );

  return (
    <Alert variant="success">
      <div className="flex flex-col gap-4">
        <h1 className="text-lg font-bold text-white/85">
          You {type} {type === "stake" ? "STEP" : "xSTEP"}
        </h1>

        <span className="text-sm text-neutral-400">You {type}:</span>

        {type === "stake" ? stepCom : xStepCom}

        <span className="text-sm text-neutral-400">You received:</span>

        {type === "stake" ? xStepCom : stepCom}

        <div className="flex justify-end">
          <ExplorerLink path={`/tx/${tx}`} label="View on Solscan" />
        </div>
      </div>
    </Alert>
  );
}
