import { QueryClient, QueryClientProvider } from 'react-query';
import Routes from './Routes';
import { ReactQueryDevtools } from 'react-query/devtools'

const queryClient = new QueryClient();


export default function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <Routes />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </div>
  );
}