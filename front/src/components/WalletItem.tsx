import { Checkbox, IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText, Tooltip, useMediaQuery, useTheme } from "@mui/material";
import { Wallet } from "../dto/wallet.dto"
import { useDeleteWallet, useToggleFavoriteWallet } from "../store/wallets.queries";
import { Delete, Favorite, FavoriteBorder } from "@mui/icons-material";
import { clueAddress } from "../utils/address";

type Props = {
  wallet: Wallet;
  onSelect: (wallet: Wallet) => void;
  isSelected: boolean;
}

const WalletItem: React.FC<Props> = ({ wallet, isSelected, onSelect }) => {
  const toggle = useToggleFavoriteWallet();
  const deleteWallet = useDeleteWallet();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <ListItem
      key={wallet._id}
      disablePadding
      secondaryAction={(
        <IconButton
          onClick={() => deleteWallet.mutate(wallet._id)}
          disabled={deleteWallet.isPending}
        >
          <Delete />
        </IconButton>
      )}
    >
      <ListItemButton selected={isSelected} onClick={() => onSelect(wallet)}>
        <ListItemIcon>
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
        </ListItemIcon>
        <ListItemText>
          {isMobile ? clueAddress(wallet.address) : wallet.address}
        </ListItemText>
      </ListItemButton>
    </ListItem>
  )
}

export default WalletItem