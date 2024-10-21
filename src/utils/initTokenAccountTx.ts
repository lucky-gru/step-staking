import { Connection, PublicKey, Transaction } from "@solana/web3.js";
import {
  createAssociatedTokenAccountInstruction,
  getAccount,
  TokenAccountNotFoundError,
  TokenInvalidAccountOwnerError,
  getAssociatedTokenAddressSync,
} from "@solana/spl-token";

export async function initTokenAccountTx(
  connection: Connection,
  mintAccount: PublicKey,
  payer: PublicKey,
) {
  const tokenAccount = getAssociatedTokenAddressSync(mintAccount, payer);

  const transaction = new Transaction();

  try {
    // Fetch the token account data
    await getAccount(connection, tokenAccount, "confirmed");
  } catch (err: unknown) {
    if (
      err instanceof TokenAccountNotFoundError ||
      err instanceof TokenInvalidAccountOwnerError
    ) {
      transaction.add(
        createAssociatedTokenAccountInstruction(
          payer,
          tokenAccount,
          payer,
          mintAccount,
        ),
      );
    }
  }

  return {
    transaction,
    tokenAccount,
  };
}
