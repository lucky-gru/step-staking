"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useWallet } from "@solana/wallet-adapter-react";
import { BN } from "@coral-xyz/anchor";

import { StakeInputPanel } from "./StakeInputPanel";

import { Tabs } from "@/components/common/tabs/Tabs";
import { DownloadIcon } from "@/components/common/icons/DownloadIcon";
import { UploadIcon } from "@/components/common/icons/UploadIcon";
import { FilledButton } from "@/components/common/buttons/FilledButton";

import {
  stepTokenMintAddress,
  useStepStakingProgram,
  xStepTokenMintAddress,
} from "@/hooks/useStepStakingProgram";
import { useTokenBalance } from "@/hooks/useTokenBalance";

const tabItems = [
  {
    id: "stake",
    label: (
      <div className="flex items-center gap-2 text-sm">
        <DownloadIcon size={16} />
        <span>Stake</span>
      </div>
    ),
  },
  {
    id: "unstake",
    label: (
      <div className="flex items-center gap-2 text-sm">
        <UploadIcon size={16} />
        <span>Unstake</span>
      </div>
    ),
  },
];

export function StakeTabPanel({
  selectedTab,
}: {
  selectedTab: "stake" | "unstake";
}) {
  const router = useRouter();
  const { publicKey } = useWallet();
  const {
    query: { data: stepBalance },
  } = useTokenBalance(stepTokenMintAddress);
  const {
    query: { data: xStepBalance },
  } = useTokenBalance(xStepTokenMintAddress);
  const { stakeMutation, unstakeMutation, stepPerXStep } =
    useStepStakingProgram();

  const [stakeAmount, setStakeAmount] = useState(0);

  const handleStake = () => {
    if (!publicKey) {
      return;
    }

    if (selectedTab === "stake") {
      stakeMutation.mutate({
        amount: stakeAmount,
        walletAddress: publicKey,
      });
    } else {
      unstakeMutation.mutate({
        walletAddress: publicKey,
        amount: stakeAmount,
      });
    }
  };

  const handleChangeSelectedTab = (selected: string) => {
    router.push(`/${selected}`);
  };

  let disabled = false;
  let btnLabel = "Stake";

  if (selectedTab === "stake") {
    if (stepBalance && stepBalance < stakeAmount) {
      btnLabel = "Insufficient STEP balance";
      disabled = true;
    } else {
      btnLabel = "Stake";
    }
  }

  if (selectedTab === "unstake") {
    if (stepBalance && stepBalance < stakeAmount) {
      btnLabel = "Insufficient xSTEP balance";
      disabled = true;
    } else {
      btnLabel = "Unstake";
    }
  }

  if (stakeAmount === 0) {
    disabled = true;
    btnLabel = "Enter an amount";
  }

  if (stakeMutation.isPending || unstakeMutation.isPending) {
    disabled = true;
    btnLabel = "Approve transactions from your wallet";
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col">
        <Tabs
          items={tabItems}
          selected={selectedTab}
          onChangeSelection={handleChangeSelectedTab}
        />
        <StakeInputPanel
          mode={selectedTab as "stake" | "unstake"}
          stakeAmount={stakeAmount}
          onChangeStaKeAmount={setStakeAmount}
          stepBalance={stepBalance || 0}
          xStepBalance={xStepBalance || 0}
          stepPerXStep={stepPerXStep}
        />
      </div>

      <FilledButton
        className="!h-[60px] !rounded-sm !text-base !font-extrabold"
        onClick={handleStake}
        disabled={disabled}
      >
        {btnLabel}
      </FilledButton>
    </div>
  );
}
