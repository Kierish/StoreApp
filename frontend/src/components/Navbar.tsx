import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <header style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      backgroundColor: '#5b01ab', 
      padding: '15px 40px', 
      boxShadow: '0 4px 15px rgba(91, 1, 171, 0.15)', 
      marginBottom: '30px',
      boxSizing: 'border-box'
    }}>
      <h1 style={{ color: '#ffffff', margin: 0, fontSize: '1.6rem', fontWeight: 'bold', cursor: 'pointer' }}>
        Store
      </h1>
      
      <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
        <input 
          type="text" 
          placeholder="Search for products..." 
          style={{ 
            width: '380px', 
            padding: '10px 40px 10px 16px', 
            borderRadius: '24px', 
            border: 'none',
            backgroundColor: 'white',
            color: '#333',
            fontSize: '0.9rem',
            outline: 'none',
          }} 
        />
        <span style={{ position: 'absolute', right: '16px', color: '#5b01ab', cursor: 'pointer', fontWeight: 'bold' }}>
          🔍
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: '#ffffff', fontWeight: 'bold', fontSize: '0.95rem' }}>
          <span style={{ fontSize: '1.3rem' }}>🛒</span>
          <span>Cart</span>
          <span style={{ backgroundColor: '#ffffff', color: '#5b01ab', fontSize: '0.75rem', fontWeight: 'bold', padding: '2px 7px', borderRadius: '10px' }}>
            0
          </span>
        </div>

        <Link to="/login" style={{ textDecoration: 'none' }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px', 
            cursor: 'pointer',
            color: '#5b01ab',
            fontWeight: 'bold',
            fontSize: '0.95rem',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '20px',
            backgroundColor: 'white'
          }}>
            <span style={{ fontSize: '1.1rem' }}>👤</span>
            <span>Log In</span>
          </div>
        </Link>
      </div>
    </header>
  );
}