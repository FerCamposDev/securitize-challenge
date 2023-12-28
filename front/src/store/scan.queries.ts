import { useQuery } from "@tanstack/react-query"
import { SCAN_REFRESH_KEY } from "./keys"
import { getLastTransactions } from "../services/scan.services"

export const useGetLastTransaction = (address?: string) => {
  return useQuery({
    queryKey: [SCAN_REFRESH_KEY, 'transactions', address],
    enabled: Boolean(address),
    queryFn: () => getLastTransactions(address!),
    select: res => {
      if (!Array.isArray(res?.result) || !res?.result.length) {
        return undefined;
      }
      return res.result.at(-1);
    },
    staleTime: Infinity,
    placeholderData:{ result: [] },
  })
}
