import ReactDOM from 'react-dom/client';
import App from './App';
import { QueryClient, QueryClientProvider } from 'react-query';
import './styles/main.scss';
import { setupAxios } from './utils/axios';
import { AuthContextProvider } from './context/authContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

setupAxios();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <AuthContextProvider>
      <>
        <ToastContainer style={{ fontSize: '12px' }} />
        <App />
      </>
    </AuthContextProvider>
  </QueryClientProvider>
  // </React.StrictMode>,
);
