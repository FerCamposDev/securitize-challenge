import { useQuery } from "@tanstack/react-query"
import { SCAN_REFRESH_KEY } from "./keys"
import { getAddressBalance, getLastTransactions } from "../services/scan.services"
import { fromWei } from "web3-utils"

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
    placeholderData: { result: [] },
  })
}

export const useGetAddressBalance = (address?: string) => {
  return useQuery({
    queryKey: [SCAN_REFRESH_KEY, 'balance', address],
    enabled: Boolean(address),
    queryFn: () => getAddressBalance(address!),
    select: (res) => {
      return Number(fromWei(res.result || 0, 'ether'));
    },
    staleTime: Infinity,
    placeholderData: { result: '0' },
  })
}
