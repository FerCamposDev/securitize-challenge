import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query"
import HomePage from "./pages/Home"
import toast from "react-hot-toast";
import ErrorBoundary from "./components/ErrorBoundary";
import { isAxiosError } from "axios";

const handleError = (error: Error) => {
  if (isAxiosError(error)) {
    return toast.error(error?.response?.data?.message);
  }
  toast.error(error?.message);
}

function App() {
  const queryClient = new QueryClient({
    queryCache: new QueryCache({
      onError: handleError,
    }),
    mutationCache: new MutationCache({
      onError: handleError,
    })
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <HomePage />
      </ErrorBoundary>
    </QueryClientProvider>
  )
}

export default App;
