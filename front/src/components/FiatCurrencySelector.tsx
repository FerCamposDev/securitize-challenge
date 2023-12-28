import { Card, CardContent, FormControl, Stack, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";
import { FiatCurrency } from "../types/currencies"
import { useGetFiatETHPairs } from "../store/coingecko.queries";
import { CURRENCY_OPTIONS, mapCurrencyToLabel } from "../constants/currency";

type Props = {
  currency: FiatCurrency;
  onSelectCurrency: (selectedCurrency: FiatCurrency) => void;
  walletBalance: number;
}

const FiatCurrencySelector: React.FC<Props> = ({ currency, walletBalance = 0, onSelectCurrency }) => {
  const { data } = useGetFiatETHPairs();

  const currentPrice = data?.ethereum[currency] || 0;

  const handleSelect = (event: SelectChangeEvent) => {
    onSelectCurrency(event.target.value as FiatCurrency);
  };

  return (
    <Card sx={{ height: 130 }}>
      <CardContent>
        <Stack gap={2}>
          <FormControl fullWidth>
            <InputLabel id="currency-selector">Fiat Currency</InputLabel>
            <Select
              labelId="currency-selector"
              label="Fiat Currency"
              value={currency}
              onChange={handleSelect}
            >
              {CURRENCY_OPTIONS.map((opt) => (
                <MenuItem key={opt.value} value={opt.value}>
                  {opt.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Typography variant="h6" textAlign="center">
            Balance in {mapCurrencyToLabel[currency]}: {(currentPrice * walletBalance).toFixed(2)}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default FiatCurrencySelector