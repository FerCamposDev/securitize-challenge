import { ChangeEvent, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Checkbox from '@mui/material/Checkbox';
import Tooltip from '@mui/material/Tooltip';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';

import { useAddNewWallet } from '../store/wallets.queries';
import { NewWallet } from '../dto/wallet.dto';
import { isAddress } from 'web3-validator';

const AddWalletModal = () => {
  const [open, setOpen] = useState(false);
  const [wallet, setWallet] = useState<NewWallet>({ address: '', favorite: false })

  const { mutate, isPending } = useAddNewWallet();

  const handleClickOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const handleSave = () => {
    mutate(wallet)
  }

  const handleChangeAddress = (event: ChangeEvent<HTMLInputElement>) => {
    setWallet(prevData => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }))
  }

  const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWallet(prevData => ({
      ...prevData,
      favorite: event.target.checked,
    }))
  };

  const isInvalid = Boolean(wallet.address && !isAddress(wallet.address));

  return (
    <>
      <Button variant="contained" size="small" onClick={handleClickOpen}>
        Add wallet
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Wallet</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add a new wallet, please enter your address here.
          </DialogContentText>
          <TextField
            autoFocus
            name="address"
            margin="dense"
            label="Address account"
            fullWidth
            variant="standard"
            onChange={handleChangeAddress}
            error={isInvalid}
            helperText={isInvalid ? "Invalid address" : ''}
            InputProps={{
              startAdornment: (
                <Tooltip title={wallet.favorite ? 'Set as not favorite' : 'Set as favorite'} arrow>
                  <Checkbox
                    size="small"
                    name="favorite"
                    icon={<FavoriteBorder />}
                    checkedIcon={<Favorite />}
                    onChange={handleCheck}
                  />
                </Tooltip>
              )
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={handleSave}
            variant="contained"
            disabled={isInvalid || isPending || !wallet.address}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default AddWalletModal
