import { useEffect, useState } from 'react';
import Footer from './components/footer';

function FeaturedHotelsPage() {
  const [hotels, setHotels] = useState([]); // Initialize state

  useEffect(() => {
    fetch('http://localhost:5000/hotels') // Get all hotels
      .then(res => res.json())
      .then(data => setHotels(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ minHeight: '100vh',width: '100%', backgroundColor: '#121212', color: '#ffffff', padding: '20px' }}>
      <h2>Featured Hotels</h2>
      {hotels.length === 0 ? <p>Loading...</p> : hotels.map(h => (
        <div key={h._id} style={{ backgroundColor: '#333', padding: '20px', marginTop: '10px', borderRadius: '5px' }}>
          {h.name} - {h.location} {/* Use .location, not .city (matches your schema) */}
        </div>
      ))}
      <Footer />
    </div>
  );
}

export default FeaturedHotelsPage;
