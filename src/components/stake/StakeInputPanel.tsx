"use client";

import Image from "next/image";

import { ArrowDownIcon } from "@/components/common/icons/ArrowDownIcon";
import {
  TokenInput,
  TokenInputProps,
} from "@/components/common/inputs/TokenInput";

import stepSrc from "@/assets/step.svg";
import xStepSrc from "@/assets/xStep.svg";
import { useTokenUsdPrice } from "@/hooks/useTokenUsdPrice";
import {
  stepTokenMintAddress,
  xStepTokenMintAddress,
} from "@/hooks/useStepStakingProgram";

export type StakeInputPanelProps = {
  mode: "stake" | "unstake";
  stepBalance: number;
  xStepBalance: number;
  stepPerXStep: number;
  stakeAmount: number;
  onChangeStaKeAmount: (value: number) => void;
};

export function StakeInputPanel({
  mode,
  stepBalance,
  xStepBalance,
  stepPerXStep,
  stakeAmount,
  onChangeStaKeAmount,
}: StakeInputPanelProps) {
  const [price] = useTokenUsdPrice([
    mode === "stake"
      ? stepTokenMintAddress.toString()
      : xStepTokenMintAddress.toString(),
  ]);

  const stakeToken: TokenInputProps = {
    icon: <Image src={stepSrc} width={28} height={28} alt="step token" />,
    symbol: "STEP",
    balance: stepBalance,
    amount: mode === "stake" ? stakeAmount : stakeAmount * stepPerXStep,
    onChangeAmount: mode === "stake" ? onChangeStaKeAmount : undefined,
    price: mode === "stake" ? price : undefined,
    label: mode === "stake" ? "You stake" : "You receive",
  };

  const receiveToken: TokenInputProps = {
    icon: <Image src={xStepSrc} width={28} height={28} alt="xStep token" />,
    symbol: "xSTEP",
    balance: xStepBalance,
    amount: mode === "unstake" ? stakeAmount : stakeAmount / stepPerXStep,
    onChangeAmount: mode === "unstake" ? onChangeStaKeAmount : undefined,
    price: mode === "unstake" ? price : undefined,
    label: mode === "unstake" ? "You stake" : "You receive",
  };

  return (
    <div className="flex flex-col items-center gap-3 rounded-lg rounded-tl-none bg-neutral-900 p-4">
      <TokenInput {...(mode === "stake" ? stakeToken : receiveToken)} />

      <ArrowDownIcon className="text-yellow-400" />

      <TokenInput {...(mode === "stake" ? receiveToken : stakeToken)} />
    </div>
  );
}
