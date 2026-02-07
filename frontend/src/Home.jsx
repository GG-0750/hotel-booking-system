import { useNavigate } from 'react-router-dom';

const Home = () => {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '100vh',
      textAlign: 'center',
      background: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url("https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1350&q=80")',
      backgroundSize: 'cover',
      color: 'white',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ fontSize: '3.5rem', marginBottom: '10px' }}>Welcome to BookNest</h1>
      <p style={{ fontSize: '1.5rem' }}>Find your perfect home away from home.</p>
      <p style={{ marginTop: '20px', fontStyle: 'italic' }}>Use the menu on the top left to start your journey.</p>
    </div>
  );
};


export default Home;