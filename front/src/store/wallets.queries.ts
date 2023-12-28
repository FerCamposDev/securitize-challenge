import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { WALLET_KEY, WALLET_REFRESH_KEY } from "./keys"
import { addNewWallet, deleteWallet, getAllWallets, toggleFavoriteWallet } from "../services/wallets.services"
import { Wallet } from "../dto/wallet.dto"

export const useGetWallets = () => {
  return useQuery({
    queryKey: [WALLET_REFRESH_KEY, 'get'],
    queryFn: getAllWallets,
    select: wallets => wallets?.sort((a: Wallet, b: Wallet) => Number(b?.favorite) - Number(a?.favorite)),
    staleTime: Infinity,
    placeholderData: [],
  })
}

export const useToggleFavoriteWallet = () => {
  const cache = useQueryClient();

  return useMutation({
    mutationKey: [WALLET_KEY, 'toggle'],
    mutationFn: toggleFavoriteWallet,
    onSuccess: () => cache.invalidateQueries({
      queryKey: [WALLET_REFRESH_KEY],
    }),
  })
}

export const useAddNewWallet = () => {
  const cache = useQueryClient();

  return useMutation({
    mutationKey: [WALLET_KEY, 'post'],
    mutationFn: addNewWallet,
    onSuccess: () => cache.invalidateQueries({
      queryKey: [WALLET_REFRESH_KEY],
    }),
  })
}

export const useDeleteWallet = () => {
  const cache = useQueryClient();

  return useMutation({
    mutationKey: [WALLET_KEY, 'delete'],
    mutationFn: deleteWallet,
    onSuccess: () => cache.invalidateQueries({
      queryKey: [WALLET_REFRESH_KEY],
    }),
  })
}