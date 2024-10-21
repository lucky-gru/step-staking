"use client";

const priceApi =
  process.env.NEXT_PUBLIC_MARKET_TOKEN_PRICE_API ||
  "https://api-v3.raydium.io/mint/price";

export async function getTokenUsdPrice(
  mintAddresses: string[],
): Promise<Record<string, number>> {
  try {
    const res = await fetch(
      `${priceApi}?mints=${mintAddresses.join(",")}`,
    ).then((res) => res.json());

    if (!res || !res.success) {
      throw new Error();
    }

    return res.data as Record<string, number>;
  } catch (err) {
    console.error("Failed at fetching price chart", err);
    return {};
  }
}
