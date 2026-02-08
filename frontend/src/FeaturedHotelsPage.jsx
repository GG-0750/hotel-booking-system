import { useEffect, useState } from 'react';
import Footer from './components/footer';
import './App.css';

function FeaturedHotelsPage() {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/hotels')
      .then(res => res.json())
      .then(data => setHotels(data))
      .catch(err => console.error(err));
  }, []);

  // Array of beautiful hotel images to use if the backend image is missing
  const backupImages = [
    "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1000", // Luxury Resort
    "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=1000", // Tropical Pool
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1000", // Modern Hotel
    "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=1000", // Boutique Stay
    "https://images.unsplash.com/photo-1551882547-ff43c63fedfe?q=80&w=1000"  // Grand Lobby
  ];

  return (
    <div className="page-container">
      <h2 style={{ marginBottom: '30px', color: '#00d4ff' }}>Featured Stays</h2>
      
      {hotels.length === 0 ? (
        <div className="empty-state-box"><p>Searching for luxury...</p></div>
      ) : (
        <div className="hotel-grid"> 
          {hotels.map((h, index) => (
            <div key={h._id} className="hotel-card">
              <img 
                src={h.image || backupImages[index % backupImages.length]} 
                className="hotel-image" 
                alt={h.name} 
              />
              
              <div className="hotel-info">
                <h3>{h.name}</h3>
                <p style={{ color: '#aaa' }}>{h.location}</p>
                <p style={{ fontWeight: 'bold', fontSize: '1.4rem', margin: '10px 0', color: '#00d4ff' }}>
                  ₹{h.price || h.pricePerNight || "8,500"} 
                  <span style={{ fontSize: '0.8rem', color: '#fff' }}> / night</span>
                </p>
                
                <button className="book-btn">Book Now</button>
              </div>
            </div>
          ))}
        </div>
      )}
      <Footer />
    </div>
  );
}

export default FeaturedHotelsPage;