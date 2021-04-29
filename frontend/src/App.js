import { QueryClient, QueryClientProvider } from 'react-query';
import Routes from './Routes';
import { ReactQueryDevtools } from 'react-query/devtools'
import { CartContextProvider } from './contexts/CartContext';

const queryClient = new QueryClient();


export default function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <CartContextProvider>
          <Routes />
        </CartContextProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </div>
  );
}