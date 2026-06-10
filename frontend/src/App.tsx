import { BrowserRouter, Route, Routes } from 'react-router-dom';
import StorePage from './pages/StorePage';
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { AuthProvider } from './contexts/AuthContext'; 

function App() {
  return (
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
  );
}

export default App;