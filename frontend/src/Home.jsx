import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div style={{
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '20px',
      padding: '0',
      textAlign: 'center',
      minHeight: '100vh',
      width: '100vw',
      backgroundColor: '#000000',
      color: '#ffffff',
      fontFamily: 'Arial, sans-serif',
      boxSizing: 'border-box',
      overflowX: 'hidden'
    }}>
      {/* Floating shapes background */}
      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0px) translateX(0px); }
            50% { transform: translateY(-20px) translateX(10px); }
            100% { transform: translateY(0px) translateX(0px); }
          }
        `}
      </style>

      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        zIndex: 0
      }}>
        {[...Array(5)].map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            width: `${50 + i * 20}px`,
            height: `${50 + i * 20}px`,
            backgroundColor: 'rgba(170, 51, 255, 0.1)',
            borderRadius: '50%',
            animation: `float ${10 + i * 2}s ease-in-out infinite`,
            top: `${i * 20}%`,
            left: `${i * 15}%`
          }}></div>
        ))}
      </div>

      {/* Main content */}
      <h1 style={{
        marginBottom: '40px',
        fontSize: '40px',
        color: '#aa33ff',
        zIndex: 1
      }}>
        Hotel Booking System
      </h1>

      {/* Using navigate() instead of <Link> ensures the button click always works */}
      <button 
        onClick={() => navigate('/search')}
        style={{
          padding: '15px 30px',
          margin: '10px',
          fontSize: '18px',
          cursor: 'pointer',
          borderRadius: '8px',
          border: '2px solid #aa33ff',
          backgroundColor: '#6600cc',
          color: '#ffffff',
          transition: '0.3s',
          zIndex: 1,
          fontWeight: 'bold'
        }}
        onMouseOver={e => e.currentTarget.style.backgroundColor = '#8000ff'}
        onMouseOut={e => e.currentTarget.style.backgroundColor = '#6600cc'}
      >
        Go to Search
      </button>

      <button 
        onClick={() => navigate('/featured')}
        style={{
          padding: '15px 30px',
          margin: '10px',
          fontSize: '18px',
          cursor: 'pointer',
          borderRadius: '8px',
          border: '2px solid #aa33ff',
          backgroundColor: '#6600cc',
          color: '#ffffff',
          transition: '0.3s',
          zIndex: 1,
          fontWeight: 'bold'
        }}
        onMouseOver={e => e.currentTarget.style.backgroundColor = '#8000ff'}
        onMouseOut={e => e.currentTarget.style.backgroundColor = '#6600cc'}
      >
        View Featured Hotels
      </button>
    </div>
  );
}

export default Home;