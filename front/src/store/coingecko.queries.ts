import { useQuery } from "@tanstack/react-query"
import { GECKO_PRICE_EDITABLE_KEY } from "./keys"
import { getETHPrices } from "../services/coingecko.services"

export const useGetFiatETHPairs = () => {
  return useQuery({
    queryKey: [GECKO_PRICE_EDITABLE_KEY],
    queryFn: getETHPrices,
    staleTime: Infinity,
    placeholderData:{ ethereum: { usd: 0, eur: 0 } },
  })
}
