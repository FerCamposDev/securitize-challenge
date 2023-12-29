import { Collapse, Grid, List, Stack, Typography } from '@mui/material'
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

  return (
    <Stack gap={4}>
      <Grid container justifyContent="space-between" alignItems="center">
        <Typography variant="h6">
          Your wallets
        </Typography>
        <AddWalletModal />
      </Grid>
      <List sx={{ maxHeight: 300, overflowY: 'auto' }}>
        {wallets.map((wallet) => (
          <WalletItem
            key={wallet._id}
            wallet={wallet}
            isSelected={selectedWallet?._id === wallet._id}
            onSelect={handleSelect}
          />
        ))}
      </List>

      <Collapse in={Boolean(selectedWallet)}>
        <WalletInfo wallet={selectedWallet} />
      </Collapse>
    </Stack>
  )
}

export default WalletList