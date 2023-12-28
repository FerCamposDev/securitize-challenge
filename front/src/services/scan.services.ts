import axios from "axios";
import { ScanResult, Transaction } from "../dto/scan.dto";

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_SCAN_API,
})

export const getLastTransactions = async (address: string): Promise<ScanResult<Transaction[] | string>> => {
  const res = await api.get('/', {
    params: {
      module: 'account',
      action: 'txlist',
      address,
      startblock: '0',
      endblock: '99999999',
      page: '1',
      offset: '10',
      sort: 'asc',
      apikey: import.meta.env.VITE_APP_SCAN_API_KEY,
    }
  });
  return res.data;
}

export const getAddressBalance = async (address: string): Promise<ScanResult<string>> => {
  const res = await api.get('/', {
    params: {
      module: 'account',
      action: 'balance',
      address,
      tag: 'latest',
      apikey: import.meta.env.VITE_APP_SCAN_API_KEY,
    }
  });
  return res.data;
}