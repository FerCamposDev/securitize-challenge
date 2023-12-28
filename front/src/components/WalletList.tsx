import { Collapse, Grid, Stack, Typography } from '@mui/material'
import { Wallet } from '../dto/wallet.dto'
import WalletItem from './WalletItem';
import AddWalletModal from './AddWalletModal';
import { useState } from 'react';
import WalletInfo from './WalletInfo';

type Props = {
  wallets: Wallet[];
}

const WalletList: React.FC<Props> = ({ wallets = [] }) => {
  const [selectedWallet, setSelectedWallet] = useState<Wallet>();

  const handleSelect = (newSelection: Wallet) => {
    if (newSelection?._id === selectedWallet?._id) {
      return setSelectedWallet(undefined);
    }
    setSelectedWallet(newSelection);
  };

  console.log('selectedWallet :>> ', selectedWallet);

  return (
    <Stack>
      <Grid container justifyContent="space-between" alignItems="center">
        <Typography>
          Your wallets
        </Typography>
        <AddWalletModal />
      </Grid>
      {wallets.map((wallet) => (
        <WalletItem key={wallet._id} wallet={wallet} onSelect={handleSelect} />
      ))}

      <Collapse in={Boolean(selectedWallet)}>
        <WalletInfo wallet={selectedWallet} />
      </Collapse>
    </Stack>
  )
}

export default WalletList