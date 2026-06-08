import { BrowserRouter, Route, Routes } from 'react-router-dom';
import StorePage from './pages/StorePage';
import { LoginPage } from './pages/LoginPage';

function App() {
  return (
    <BrowserRouter>
      <div style={{ backgroundColor: '#f3eff7', minHeight: '100vh' }}>
        <Routes>
          <Route path="/" element={<StorePage />} />
          
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App
