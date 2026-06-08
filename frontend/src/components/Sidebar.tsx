export function Sidebar() {
  return (
    <aside style={{ 
      width: '260px', 
      backgroundColor: 'white', 
      padding: '20px', 
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
      height: 'fit-content',
      flexShrink: 0
    }}>
      <h3 style={{ borderBottom: '1px solid #eee', paddingBottom: '10px', margin: '0 0 15px 0' }}>
        Filters
      </h3>
      <p style={{ color: '#888', fontSize: '0.9rem' }}>
        Placeholder for categories, price sliders, etc.
      </p>
    </aside>
  );
}