import { Box, Checkbox, Grid, IconButton, Tooltip, Typography } from "@mui/material";
import { Wallet } from "../dto/wallet.dto"
import { useDeleteWallet, useToggleFavoriteWallet } from "../store/wallets.queries";
import { Delete, Favorite, FavoriteBorder } from "@mui/icons-material";
import { clueAddress } from "../utils/address";

type Props = {
  wallet: Wallet;
  onSelect: (wallet: Wallet) => void;
}

const WalletItem: React.FC<Props> = ({ wallet, onSelect }) => {
  const toggle = useToggleFavoriteWallet();
  const deleteWallet = useDeleteWallet();

  return (
    <Grid container alignItems="center" justifyContent="space-between">
      <Box display="flex" alignItems="center">
        <Tooltip title={wallet.favorite ? 'Set as not favorite' : 'Set as favorite'} arrow>
          <Checkbox
            size="small"
            name="favorite"
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite />}
            checked={wallet.favorite}
            onClick={() => toggle.mutate(wallet._id)}
            disabled={toggle.isPending}
          />
        </Tooltip>
        <Typography variant="body2" onClick={() => onSelect(wallet)} bgcolor="red">
          {clueAddress(wallet.address)}
        </Typography>
      </Box>
      <IconButton
        onClick={() => deleteWallet.mutate(wallet._id)}
        disabled={deleteWallet.isPending}
      >
        <Delete />
      </IconButton>
    </Grid>
  )
}

export default WalletItem