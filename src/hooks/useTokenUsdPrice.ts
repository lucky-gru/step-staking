"use client";

import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import { getTokenUsdPrice } from "@/actions/client/getTokenUsdPrices";

export const TOKEN_USD_PRICE_KEY = "get-token-usd-price";

export function useTokenUsdPrice(addresses: string[]) {
  const { data } = useQuery({
    queryKey: [TOKEN_USD_PRICE_KEY, { addresses }],
    queryFn: () => getTokenUsdPrice(addresses),
    refetchInterval: 5000, // refetch once a 5 sec
  });

  return useMemo(() => {
    if (!data) {
      return addresses.map(() => 0);
    }

    return addresses.map((address) => data[address] || 0);
  }, [addresses, data]);
}
