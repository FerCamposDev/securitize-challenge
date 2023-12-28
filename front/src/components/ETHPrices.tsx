import { Card, CardContent, CardHeader, Grid, IconButton, TextField, Tooltip, Typography } from '@mui/material';
import { FiatCurrency } from '../types/currencies'
import { useGetFiatETHPairs } from '../store/coingecko.queries';
import { Cached, Close, Done, Edit } from '@mui/icons-material';
import { ChangeEvent, useState } from 'react';
import { mapCurrencyToLabel, mapCurrencyToSymbol } from '../constants/currency';
import { useQueryClient } from '@tanstack/react-query';
import { GECKO_PRICE_EDITABLE_KEY } from '../store/keys';
import { PriceResults } from '../dto/coingecko.dto';
import toast from 'react-hot-toast';

type Props = {
  currency: FiatCurrency;
}

const ETHPrices: React.FC<Props> = ({ currency }) => {
  const queryCache = useQueryClient();
  const { data, refetch } = useGetFiatETHPairs();
  const [isEditing, setIsEditing] = useState(false);
  const [newValue, setNewValue] = useState(data?.ethereum[currency]);

  const handleEdit = () => setIsEditing(true);

  const handleClose = () => {
    setIsEditing(false);
    setNewValue(data?.ethereum[currency]);
  };

  const handleSave = () => {
    if (!newValue) return toast.error('Invalid price');

    queryCache.setQueryData([GECKO_PRICE_EDITABLE_KEY], (oldData: PriceResults) => {
      return {
        ethereum: {
          ...oldData.ethereum,
          [currency]: newValue
        }
      }
    })
    setIsEditing(false);
  };

  const handleChangeNewValue = (e: ChangeEvent<HTMLInputElement>) => {
    setNewValue(Number(e.target.value));
  }

  return (
    <Card sx={{ height: 130 }}>
      <CardHeader
        action={isEditing ? (
          <Grid>
            <IconButton size="small" onClick={handleClose} color="error">
              <Close fontSize="small" />
            </IconButton>
            <IconButton size="small" onClick={handleSave} color="success">
              <Done fontSize="small" />
            </IconButton>
          </Grid>
        ) : (
          <Grid>
            <Tooltip title="Reload All Prices" arrow>
              <IconButton size="small" onClick={() => refetch()} color="info">
                <Cached fontSize="small" />
              </IconButton>
            </Tooltip>
            <IconButton size="small" onClick={handleEdit} color="info">
              <Edit fontSize="small" />
            </IconButton>
          </Grid>
        )}
      />
      <CardContent>
        <Grid container justifyContent="center" alignItems="center">
          {isEditing ? (
            <TextField
              fullWidth
              autoFocus
              type='number'
              label={mapCurrencyToLabel[currency]}
              onChange={handleChangeNewValue}
              size="small"
              value={newValue}
              defaultValue={data?.ethereum[currency]}
            />
          ) : (
            <>
              <Typography variant="subtitle2">
                ETH Price: {mapCurrencyToSymbol[currency]}&nbsp;
              </Typography>
              <Typography variant="subtitle2" fontWeight={600}>
                {data?.ethereum[currency]}
              </Typography>
            </>
          )}
        </Grid>
      </CardContent>
    </Card>
  )
}

export default ETHPrices