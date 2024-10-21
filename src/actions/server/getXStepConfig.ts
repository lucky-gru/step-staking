"use server";
import "server-only";

export type XStepConfig = {
  apr: number;
  price: number;
  stepPerXStep: number;
  totalStepStaked: number;
  tvl: number;
};

export async function getXStepConfig(): Promise<XStepConfig | null> {
  try {
    const res = await fetch(
      "https://api.step.finance/v1/markets/xstep?cluster=mainnet-beta&funding_start=2021-10-14",
    ).then((res) => res.json());

    if (!res) {
      throw new Error();
    }

    console.log(res);

    return res as XStepConfig;
  } catch (err) {
    console.log("Failed at fetching apy", err);

    return null;
  }
}
