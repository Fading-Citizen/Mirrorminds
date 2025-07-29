function SimpleApp() {
  console.log('SimpleApp rendering...');
  
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)', 
      color: 'white', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      fontFamily: 'system-ui'
    }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ 
          fontSize: '3rem',
          background: 'linear-gradient(135deg, #00d4ff 0%, #9333ea 50%, #4f46e5 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          MirrorMinds
        </h1>
        <p style={{ fontSize: '1.2rem', color: '#a1a1aa' }}>
          Core Operating Gifts Assessment
        </p>
        <p style={{ marginTop: '2rem', color: '#71717a' }}>
          React app is working! 🎉
        </p>
      </div>
    </div>
  );
}

export default SimpleApp;
