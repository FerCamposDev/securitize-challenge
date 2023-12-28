import { FiatCurrency } from "../types/currencies";
import { ISelectInput } from "../types/inputs";

export const mapCurrencyToLabel: Record<FiatCurrency, string> = {
  [FiatCurrency.Dollar]: 'Dollar',
  [FiatCurrency.Euro]: 'Euro',
}

export const CURRENCY_OPTIONS: ISelectInput<FiatCurrency>[] = [
  {
    label: mapCurrencyToLabel[FiatCurrency.Dollar],
    value: FiatCurrency.Dollar
  },
  {
    label: mapCurrencyToLabel[FiatCurrency.Euro],
    value: FiatCurrency.Euro
  }
];
