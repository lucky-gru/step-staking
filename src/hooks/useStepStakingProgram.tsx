"use client";

import { useCallback, useEffect, useMemo } from "react";
import { PublicKey } from "@solana/web3.js";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getAccount,
  getAssociatedTokenAddressSync,
  getMint,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { BN } from "@coral-xyz/anchor";
import { useSnackbar } from "notistack";
import { getStepStakingProgram } from "@/anchor/export/program";

import { useAnchorProvider } from "./useAnchorProvider";
import { ApproveAlert } from "@/components/stake/notifications/ApproveAlert";
import { StakingProgressAlert } from "@/components/stake/notifications/StakingProgressAlert";
import { UserRejectTransactionAlert } from "@/components/stake/notifications/UserRejectTransactionAlert";
import { StakeResultAlert } from "@/components/stake/notifications/StakeResultAlert";
import { StakeErrorAlert } from "@/components/stake/notifications/StakeErrorAlert";
import { useTokenBalance } from "./useTokenBalance";
import { initTokenAccountTx } from "@/utils/initTokenAccountTx";

export const TOKEN_BALANCE_KEY = "get-token-balance";
export const STEP_TO_XSTEP_CHANGE_RATE_KEY = "step-to-xstep-change-rate";

export const stepTokenMintAddress = new PublicKey(
  process.env.NEXT_PUBLIC_STEP_TOKEN_MINT_ADDRESS ||
    "StepAscQoEioFxxWGnh2sLBDFp9d8rvKz2Yp39iDpyT",
);
export const xStepTokenMintAddress = new PublicKey(
  process.env.NEXT_PUBLIC_X_STEP_TOKEN_MINT_ADDRESS ||
    "xStpgUCss9piqeFUk2iLVcvJEGhAdJxJQuwLkXP555G",
);
export const tokenVaultAddress = new PublicKey(
  process.env.NEXT_PUBLIC_TOKEN_VAULT_ADDRESS ||
    "ANYxxG365hutGYaTdtUQG8u2hC4dFX9mFHKuzy9ABQJi",
);
export const tokenVaultNonce =
  process.env.NEXT_PUBLIC_TOKEN_VAULT_NONCE &&
  !Number.isNaN(+process.env.NEXT_PUBLIC_TOKEN_VAULT_NONCE)
    ? +process.env.NEXT_PUBLIC_TOKEN_VAULT_NONCE
    : 253;

export function useStepStakingProgram() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { invalidate: invalidateStepBalance } =
    useTokenBalance(stepTokenMintAddress);
  const { invalidate: invalidateXStepBalance } = useTokenBalance(
    xStepTokenMintAddress,
  );
  const queryClient = useQueryClient();

  // const { connection } = useConnection();
  const provider = useAnchorProvider();
  const program = useMemo(() => getStepStakingProgram(provider), [provider]);

  const { data: stepPerXStep } = useQuery({
    queryKey: [STEP_TO_XSTEP_CHANGE_RATE_KEY],
    queryFn: async () => {
      try {
        // Fetch the token account data
        const tokenAccountInfo = await getAccount(
          provider.connection,
          tokenVaultAddress,
          "confirmed",
        );

        // Fetch the token account data
        const xMintAccountInfo = await getMint(
          provider.connection,
          xStepTokenMintAddress,
        );

        const stepToken = Number(tokenAccountInfo.amount) / 1e9;
        const xStepSupply = Number(xMintAccountInfo.supply) / 1e9;

        if (xStepSupply === 0) {
          return 0;
        }

        return stepToken / xStepSupply;
      } catch (error) {
        console.error("Error fetching exchange rate:", error);
        return 0;
      }
    },
  });

  useEffect(() => {
    const listener = program.addEventListener("PriceChange", (event) => {
      const stepPerXStep = +event?.stepPerXStep;

      if (!Number.isNaN(stepPerXStep)) {
        queryClient.setQueryData([STEP_TO_XSTEP_CHANGE_RATE_KEY], stepPerXStep);
      }
    });

    return () => {
      program.removeEventListener(listener);
    };
  }, [program, queryClient]);

  const successHandler = useCallback(
    async (amount: number, tx: string, kind: "stake" | "unstake") => {
      const snackId = enqueueSnackbar(
        <StakingProgressAlert kind={kind} tx={tx} />,
        {
          persist: true,
        },
      );

      const confirmation = await provider.connection.confirmTransaction(
        tx,
        "finalized",
      );

      closeSnackbar(snackId);

      if (!confirmation.value.err) {
        const stepPerXStep = queryClient.getQueryData<number>([
          STEP_TO_XSTEP_CHANGE_RATE_KEY,
        ]);

        invalidateStepBalance();
        invalidateXStepBalance();

        enqueueSnackbar(
          <StakeResultAlert
            type="stake"
            stepTokenAmount={amount}
            xStepTokenAmount={amount * (stepPerXStep || 1)}
            tx={tx}
          />,
          {
            autoHideDuration: 5000,
          },
        );
      } else {
        const message =
          typeof confirmation.value.err === "string"
            ? confirmation.value.err
            : "";
        enqueueSnackbar(
          <StakeErrorAlert
            title={`Error ${kind === "stake" ? "staking" : "unstaking"} STEP`}
            errorMessage={message}
          />,
          {
            autoHideDuration: 5000,
          },
        );
      }
    },
    [
      closeSnackbar,
      enqueueSnackbar,
      invalidateStepBalance,
      invalidateXStepBalance,
      provider.connection,
      queryClient,
    ],
  );

  const errorHandler = useCallback(
    (errorName: string, errorMessage: string, kind: "stake" | "unstake") => {
      if (
        errorName === "WalletSignTransactionError" &&
        errorMessage === "User rejected the request."
      ) {
        enqueueSnackbar(<UserRejectTransactionAlert />, {
          autoHideDuration: 5000,
        });
      } else {
        enqueueSnackbar(
          <StakeErrorAlert
            title={`Error ${kind === "stake" ? "staking" : "unstaking"} STEP`}
            errorMessage={errorMessage}
          />,
          {
            autoHideDuration: 5000,
          },
        );
      }
    },
    [enqueueSnackbar],
  );

  const stakeMutation = useMutation({
    mutationKey: ["step-stake", "stake"],
    mutationFn: async ({
      amount,
      walletAddress,
    }: {
      amount: number;
      walletAddress: PublicKey;
    }) => {
      const tokenFrom = getAssociatedTokenAddressSync(
        stepTokenMintAddress,
        walletAddress,
      );

      const { transaction, tokenAccount: xTokenTo } = await initTokenAccountTx(
        provider.connection,
        xStepTokenMintAddress,
        walletAddress,
      );

      try {
        enqueueSnackbar(<ApproveAlert />, {
          autoHideDuration: 5000,
        });

        transaction.add(
          await program.methods
            .stake(tokenVaultNonce, new BN(Math.floor(amount * 1e9)))
            .accounts({
              tokenMint: stepTokenMintAddress,
              tokenVault: tokenVaultAddress,
              tokenProgram: TOKEN_PROGRAM_ID,
              xTokenMint: xStepTokenMintAddress,
              tokenFrom: tokenFrom,
              xTokenTo: xTokenTo,
              tokenFromAuthority: walletAddress,
            })
            .transaction(),
        );

        const tx = await provider.sendAndConfirm(transaction);

        await successHandler(amount, tx, "stake");

        return tx;
      } catch (err) {
        return Promise.reject(err);
      }
    },
    onSuccess: async (tx) => {
      // handle extra logic
    },
    onError: (err) => {
      errorHandler(err.name, err.message, "stake");
    },
  });

  const unstakeMutation = useMutation({
    mutationKey: ["step-stake", "unstake"],
    mutationFn: async ({
      amount,
      walletAddress,
    }: {
      amount: number;
      walletAddress: PublicKey;
    }) => {
      const xTokenFrom = getAssociatedTokenAddressSync(
        xStepTokenMintAddress,
        walletAddress,
      );

      const { transaction, tokenAccount: tokenTo } = await initTokenAccountTx(
        provider.connection,
        stepTokenMintAddress,
        walletAddress,
      );

      try {
        enqueueSnackbar(<ApproveAlert />, {
          autoHideDuration: 5000,
        });

        transaction.add(
          await program.methods
            .unstake(tokenVaultNonce, new BN(Math.floor(amount * 1e9)))
            .accounts({
              tokenMint: stepTokenMintAddress,
              xTokenMint: xStepTokenMintAddress,
              xTokenFrom: xTokenFrom,
              tokenTo: tokenTo,
              tokenVault: tokenVaultAddress,
              tokenProgram: TOKEN_PROGRAM_ID,
              xTokenFromAuthority: walletAddress,
            })
            .transaction(),
        );

        const tx = await provider.sendAndConfirm(transaction);

        await successHandler(amount, tx, "unstake");

        return tx;
      } catch (err) {
        return Promise.reject(err);
      }
    },
    onSuccess: async (tx) => {
      // handle extra logic
    },
    onError: (err) => {
      errorHandler(err.name, err.message, "unstake");
    },
  });

  return {
    stepPerXStep: stepPerXStep || 1,
    stakeMutation,
    unstakeMutation,
  };
}
