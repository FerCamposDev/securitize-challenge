import { isAddress } from "web3-validator";

export const clueAddress = (address: string) => {
  if (!isAddress(address)) return address;
  return `${address?.slice(0, 5)}...${address?.slice(-4)}`;
}
