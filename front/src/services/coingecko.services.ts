import axios from "axios";
import { PriceResults } from "../dto/coingecko.dto";
import { FiatCurrency } from "../types/currencies";

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_COINGECKO_API,
})

export const getETHPrices = async (): Promise<PriceResults> => {
  const res = await api.get('/v3/simple/price', {
    params: {
      ids: 'ethereum',
      vs_currencies: `${FiatCurrency.Dollar},${FiatCurrency.Euro}`
    }
  });
  return res.data;
}