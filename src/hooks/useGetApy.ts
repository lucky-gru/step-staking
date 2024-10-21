"use client";

import { useQuery } from "@tanstack/react-query";

import { getAPY } from "@/actions/client/getApy";

export const GET_APY_KEY = "get-apy";

export function useGetApy() {
  return useQuery({
    queryKey: [GET_APY_KEY],
    queryFn: getAPY,
    refetchInterval: 5000, // refetch once a 5 sec
  });
}
