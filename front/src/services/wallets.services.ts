import axios from "axios";
import { NewWallet, Wallet } from "../dto/wallet.dto";

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
})

export const getAllWallets = async (): Promise<Wallet[]> => {
  const res = await api.get('/wallets');
  return res.data;
}

export const getWalletById = async (id: string): Promise<Wallet> => {
  const res = await api.get(`/wallets/${id}`);
  return res.data;
}

export const toggleFavoriteWallet = async (id: string): Promise<Wallet> => {
  const res = await api.patch(`/wallets/${id}`);
  return res.data;
}

export const addNewWallet = async (wallet: NewWallet) => {
  return api.post(`/wallets`, wallet);
}

export const deleteWallet = async (id: string) => {
  return api.delete(`/wallets/${id}`);
}
