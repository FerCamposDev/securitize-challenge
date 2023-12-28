import { Container } from "@mui/material";
import { useGetWallets } from "../store/wallets.queries";
import WalletList from "../components/WalletList";

const HomePage = () => {
  const { data = [], error } = useGetWallets();

  if (error) return <>{error}</>

  return (
    <Container maxWidth="md" sx={{ py: 4, px: 2 }}>
      <WalletList wallets={data} />
    </Container>
  )
}

export default HomePage;
