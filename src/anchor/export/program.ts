import { AnchorProvider, Program } from "@coral-xyz/anchor";
import { PublicKey } from "@solana/web3.js";
import { StepStakingJSON } from "../idl/step_staking";
import type { StepStakingIDL } from "../idl/step_staking";

// Re-export the generated IDL and type
export { StepStakingIDL, StepStakingJSON };

// The programId is imported from the program IDL.
export const STEP_STAKING_PROGRAM_ID = new PublicKey(
  process.env.NEXT_PUBLIC_STEP_STAKING_MAINNET_PROGRAM_ID || "",
);

// This is a helper function to get the Counter Anchor program.
export function getStepStakingProgram(provider: AnchorProvider) {
  return new Program(StepStakingJSON, STEP_STAKING_PROGRAM_ID, provider);
}
