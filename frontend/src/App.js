import { QueryClient, QueryClientProvider } from 'react-query';
import Routes from './Routes';
import { ReactQueryDevtools } from 'react-query/devtools'
import { AppContextProvider } from './contexts/AppContext';

const queryClient = new QueryClient();


export default function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <AppContextProvider>
          <Routes />
        </AppContextProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </div>
  );
}