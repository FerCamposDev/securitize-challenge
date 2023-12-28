import { Card, CardContent, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";
import { FiatCurrency } from "../types/currencies"
import { useGetFiatETHPairs } from "../store/coingecko.queries";
import { CURRENCY_OPTIONS } from "../constants/currency";

type Props = {
  currency: FiatCurrency;
  onSelectCurrency: (selectedCurrency: FiatCurrency) => void;
}

const FiatCurrencySelector: React.FC<Props> = ({ currency, onSelectCurrency }) => {
  const { data } = useGetFiatETHPairs();

  const currentPrice = data?.ethereum[currency];

  const handleSelect = (event: SelectChangeEvent) => {
    onSelectCurrency(event.target.value as FiatCurrency);
  };

  return (
    <Card>
      <CardContent>
        <FormControl fullWidth>
          <InputLabel id="currency-selector">Fiat Currency</InputLabel>
          <Select
            labelId="currency-selector"
            label="Fiat Currency"
            value={currency}
            onChange={handleSelect}
          >
            {CURRENCY_OPTIONS.map((opt) => (
              <MenuItem key={opt.value} value={opt.value} title="ASD">
                {opt.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Typography variant="h5">
          {currentPrice}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default FiatCurrencySelector