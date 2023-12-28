import React, { useState } from 'react'
import { Wallet } from '../dto/wallet.dto'
import { useGetAddressBalance, useGetLastTransaction } from '../store/scan.queries'
import { Alert, Grid, Stack } from '@mui/material'
import { isOneYearAgo } from '../utils/time'
import ETHPrices from './ETHPrices'
import { FiatCurrency } from '../types/currencies'
import FiatCurrencySelector from './FiatCurrencySelector'

type Props = {
  wallet?: Wallet
}

const WalletInfo: React.FC<Props> = ({ wallet }) => {
  const { data: transaction, isFetching } = useGetLastTransaction(wallet?.address);
  const { data: walletBalance, isFetching: isFetchingBalance } = useGetAddressBalance(wallet?.address);
  const [selectedCurrency, setSelectedCurrency] = useState<FiatCurrency>(FiatCurrency.Dollar);

  if (!wallet) return null;

  if (isFetching || isFetchingBalance) return 'Loading';

  const isOldWallet = isOneYearAgo(transaction?.timeStamp);

  return (
    <Stack gap={4}>
      {walletBalance ? (
        <Alert severity="success">
          ETH Balance: {walletBalance}
        </Alert>
      ) : (
        <Alert severity="error">
          {isOldWallet ? "Wallet is old!" : "This wallet doesn't have transactions"}
        </Alert>
      )}

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <ETHPrices key={selectedCurrency} currency={selectedCurrency} />
        </Grid>
        <Grid item xs={12} md={6}>
          <FiatCurrencySelector
            currency={selectedCurrency}
            onSelectCurrency={setSelectedCurrency}
            walletBalance={walletBalance || 0}
          />
        </Grid>
      </Grid>
    </Stack>
  )
}

export default WalletInfo