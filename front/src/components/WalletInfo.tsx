import React, { useState } from 'react'
import { Wallet } from '../dto/wallet.dto'
import { useGetLastTransaction } from '../store/scan.queries'
import { Alert, Collapse, Grid, Stack } from '@mui/material'
import { isOneYearAgo } from '../utils/time'
import ETHPrices from './ETHPrices'
import { FiatCurrency } from '../types/currencies'
import FiatCurrencySelector from './FiatCurrencySelector'

type Props = {
  wallet?: Wallet
}

const WalletInfo: React.FC<Props> = ({ wallet }) => {
  const { data: transaction } = useGetLastTransaction(wallet?.address);
  const [selectedCurrency, setSelectedCurrency] = useState<FiatCurrency>(FiatCurrency.Dollar);

  if (!wallet) return null;

  const isOldWallet = isOneYearAgo(transaction?.timeStamp);

  return (
    <Stack>
      <Collapse in={!transaction || isOldWallet}>
        <Alert severity="error">
          {isOldWallet ? "Wallet is old!" : "This wallet doesn't have transactions"}
        </Alert>
      </Collapse>
      {wallet.address}

      <Grid container gap={4}>
        <Grid item xs={12} md={6}>
          <ETHPrices key={selectedCurrency} currency={selectedCurrency} />
        </Grid>
        <Grid item xs={12} md={6}>
          <FiatCurrencySelector
            currency={selectedCurrency}
            onSelectCurrency={setSelectedCurrency}
          />
        </Grid>
      </Grid>
    </Stack>
  )
}

export default WalletInfo