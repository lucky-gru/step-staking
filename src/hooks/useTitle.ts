"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useSolBalance } from "./useSolBalance";
import { useTokenUsdPrice } from "./useTokenUsdPrice";

export const useTitle = () => {
  const pathname = usePathname();
  const { data: balance } = useSolBalance(); // Get Sol balance
  const [price] = useTokenUsdPrice([
    "So11111111111111111111111111111111111111112", // Get Sol price
  ]);

  useEffect(() => {
    if (balance && price)
      document.title = `$ ${((balance * Number(price)) / 1e9).toFixed(2)} USD | Step`;
  }, [balance, price, pathname]);
};
