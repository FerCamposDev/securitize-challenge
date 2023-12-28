import { Wallet } from "@mui/icons-material";

export interface Wallet {
  _id: string;
  address: string;
  favorite?: boolean;
}

export interface NewWallet extends Omit<Wallet, '_id'> {}