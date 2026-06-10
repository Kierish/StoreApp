import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; // <-- Import these
import StorePage from './pages/StorePage';
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { AuthProvider } from './contexts/AuthContext';

// Create a client (the cache memory)
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1, // If a request fails, try exactly 1 more time before showing an error
      refetchOnWindowFocus: false, // Don't refetch every time the user clicks on the browser tab
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <div style={{ backgroundColor: '#f3eff7', minHeight: '100vh' }}>
            <Routes>
              <Route path="/" element={<StorePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Routes>
          </div>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;