import { CircularProgress, Container, Grid, Typography } from "@mui/material";
import { useGetWallets } from "../store/wallets.queries";
import WalletList from "../components/WalletList";
import AddWalletModal from "../components/AddWalletModal";

const HomePage = () => {
  const { data = [], isFetching, error } = useGetWallets();

  if (isFetching) {
    return (
      <Grid container justifyContent="center" alignItems="center" height={400}>
        <CircularProgress />
      </Grid>
    )
  }

  if (error) throw error;

  return (
    <Container maxWidth="md" sx={{ py: 4, px: 2 }}>
      <Grid container justifyContent="space-between" alignItems="center">
        <Typography variant="h6">
          Your wallets
        </Typography>
        <AddWalletModal />
      </Grid>

      <WalletList wallets={data} />
    </Container>
  )
}

export default HomePage;
