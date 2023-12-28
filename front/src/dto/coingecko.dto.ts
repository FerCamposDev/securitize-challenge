import { FiatCurrency } from "../types/currencies"

export interface PriceResults {
  ethereum: {
    [FiatCurrency.Dollar]: number;
    [FiatCurrency.Euro]: number;
  }
}
