import { Link } from "react-router-dom";

export function LoginPage() {
  return (
    <div style={{ 
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '60px 20px',
      fontFamily: 'sans-serif' 
    }}>
      <div style={{ 
        backgroundColor: 'white', 
        padding: '40px', 
        borderRadius: '12px', 
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        width: '100%',
        maxWidth: '400px',
        textAlign: 'center'
      }}>
        <div style={{ textAlign: 'left', marginBottom: '20px' }}>
          <Link to="/" style={{ textDecoration: 'none', color: '#5b01ab', fontWeight: 'bold', fontSize: '0.9rem' }}>
            ← Back to Store
          </Link>
        </div>
        <h2 style={{ fontSize: '1.8rem', color: '#333', margin: '0 0 10px 0' }}>
          Welcome Back
        </h2>
        <p style={{ color: '#666', fontSize: '0.95rem', margin: '0 0 30px 0' }}>
          Please sign in to your account.
        </p>

        <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div style={{ textAlign: 'left' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.85rem', fontWeight: 'bold', color: '#555' }}>
              Email Address
            </label>
            <input 
              type="email" 
              placeholder="you@example.com"
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '8px',
                border: '1px solid #ddd',
                fontSize: '1rem',
                boxSizing: 'border-box',
                outline: 'none'
              }} 
            />
          </div>

          
          <div style={{ textAlign: 'left' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.85rem', fontWeight: 'bold', color: '#555' }}>
              Password
            </label>
            <input 
              type="password" 
              placeholder="••••••••"
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '8px',
                border: '1px solid #ddd',
                fontSize: '1rem',
                boxSizing: 'border-box',
                outline: 'none'
              }} 
            />
          </div>

          <button 
            type="button"
            style={{
              backgroundColor: '#5b01ab',
              color: 'white',
              border: 'none',
              padding: '14px',
              borderRadius: '24px',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              marginTop: '10px',
              boxShadow: '0 4px 12px rgba(91, 1, 171, 0.2)'
            }}
          >
            Sign In
          </button>
        </form>

      </div>
    </div>
  );
}