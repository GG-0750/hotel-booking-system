import { Link } from 'react-router-dom';

function Home() {
  return (
    <div style={{
      position: 'relative', // important for z-index
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
            width: `${50 + i*20}px`,
            height: `${50 + i*20}px`,
            backgroundColor: 'rgba(170, 51, 255, 0.1)',
            borderRadius: '50%',
            animation: `float ${20 + i*5}s ease-in-out infinite`,
            top: `${i*20}%`,
            left: `${i*15}%`
          }}></div>
        ))}
      </div>

      {/* Main content on top of shapes */}
      <h1 style={{
        marginBottom: '40px',
        fontSize: '40px',
        color: '#aa33ff',
        zIndex: 1
      }}>
        Hotel Booking System
      </h1>

      <Link to="/search">
        <button style={{
          padding: '15px 30px',
          margin: '10px',
          fontSize: '18px',
          cursor: 'pointer',
          borderRadius: '8px',
          border: '2px solid #aa33ff',
          backgroundColor: '#6600cc',
          color: '#ffffff',
          transition: '0.3s',
          zIndex: 1
        }}
        onMouseOver={e => e.currentTarget.style.backgroundColor = '#8000ff'}
        onMouseOut={e => e.currentTarget.style.backgroundColor = '#6600cc'}
        >
          Search
        </button>
      </Link>

      <Link to="/featured">
        <button style={{
          padding: '15px 30px',
          margin: '10px',
          fontSize: '18px',
          cursor: 'pointer',
          borderRadius: '8px',
          border: '2px solid #aa33ff',
          backgroundColor: '#6600cc',
          color: '#ffffff',
          transition: '0.3s',
          zIndex: 1
        }}
        onMouseOver={e => e.currentTarget.style.backgroundColor = '#8000ff'}
        onMouseOut={e => e.currentTarget.style.backgroundColor = '#6600cc'}
        >
          Featured Hotels
        </button>
      </Link>
    </div>
  );
}

export default Home;
