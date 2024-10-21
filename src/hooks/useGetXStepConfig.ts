"use client";

import { useQuery } from "@tanstack/react-query";

import { getXStepConfig } from "@/actions/server/getXStepConfig";

export const GET_APY_KEY = "get-xstep-config";

export function useGetXStepConfig() {
  return useQuery({
    queryKey: [GET_APY_KEY],
    queryFn: async () => {
      try {
        const config = await getXStepConfig();

        console.log("config ===>", config);
        return config;
      } catch (err) {
        return Promise.reject("Error at fetching config");
      }
    },
    refetchInterval: 5000, // refetch once a 5 sec
  });
}
