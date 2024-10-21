"use client";

import Image from "next/image";
import { getPercentageStr } from "@/utils/price";

import { useGetApy } from "@/hooks/useGetApy";

import xStepSrc from "@/assets/xStep.svg";

export function AboutStepStake() {
  const { data: apy } = useGetApy();

  return (
    <div className="flex flex-col gap-8 rounded-lg bg-neutral-900 p-8 text-sm text-white">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Image src={xStepSrc} width={28} height={28} alt="xStep" />
          <span className="font-bold">xSTEP staking APY</span>
        </div>
        <span className="font-mono font-bold">
          {getPercentageStr(apy || 0)}%
        </span>
      </div>

      <div className="flex flex-col gap-4">
        <h5 className="text-sm font-bold">
          &quot;Where is my staking rewards?&quot;
        </h5>
        <p className="leading-[25px] text-neutral-400">
          xSTEP is a yield bearing asset. This means it is automatically worth
          more STEP over time. You don&apos;t need to claim any rewards, or do
          anything other than hold your xSTEP to benefit from this. Later, when
          you unstake your xSTEP you will receive more STEP than you initially
          deposited.
        </p>
      </div>
    </div>
  );
}
