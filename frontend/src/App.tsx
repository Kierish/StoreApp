import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import StorePage from './pages/StorePage/StorePage';
import { LoginPage } from './pages/AuthPages/LoginPage';
import { RegisterPage } from './pages/AuthPages/RegisterPage';
import { AuthProvider } from './contexts/AuthContext';
import { ProductPage } from './pages/ProductPage/ProductPage';
import { EditProductPage } from './pages/EditProductPage/EditProductPage';
import { CreateProductPage } from './pages/CreateProductPage/CreateProductPage';
import { UsersPage } from './pages/AdminPages/UsersPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1, 
      refetchOnWindowFocus: false, 
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
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="/product/new" element={<CreateProductPage />} />
              <Route path="/product/:id/edit" element={<EditProductPage />} />
              <Route path="/admin/users" element={<UsersPage />} />
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