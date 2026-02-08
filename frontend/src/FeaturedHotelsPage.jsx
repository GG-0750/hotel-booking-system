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


    const handleBookNow = async (hotel) => {
    const newBooking = {
      hotelId: hotel._id, // This ensures we use a REAL ID from the database
      customerName: "Ganga", // You can change this to a dynamic user later
    };

    try {
      const response = await fetch('http://localhost:5000/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBooking),
      });

      if (response.ok) {
        alert(`Success! ${hotel.name} has been added to your reservations.`);
        // Optional: Redirect to My Bookings
        window.location.href = "/my-bookings";
      }
    } catch (error) {
      console.error("Booking error:", error);
    }
  };


  const getSafeImage = (hotel, index) => {
    // 1. If the database has a VALID looking URL, use it
    if (hotel.image && hotel.image.startsWith('http') && !hotel.image.includes('placeholder')) {
      return hotel.image;
    }
    
    // 2. Normalize the name for searching
    const name = hotel.name ? hotel.name.toLowerCase() : "";
    
    // 3. High-quality Specific Matches
    if (name.includes('hyatt')) {
      return "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80"; // Luxury Hyatt style
    }
    if (name.includes('novotel')) {
      return "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80"; // Modern Novotel style
    }
    if (name.includes('taj')) {
      return "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80"; // Palace style
    }
    
    // 4. Randomized Backup Gallery
    const gallery = [
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=800&q=80"
    ];
    return gallery[index % gallery.length];
  };
   
  return (
    <div className="page-container">
      <h2 style={{ marginBottom: '30px', color: '#00d4ff' }}>Featured Stays</h2>
      
      {hotels.length === 0 ? (
        <div className="empty-state-box"><p>Searching for luxury...</p></div>
      ) : (
        <div className="hotel-grid"> 
          {hotels.map((h, index) => (
            <div key={h._id} className="hotel-card">
              <div className="image-wrapper">
                <img 
                  src={getSafeImage(h, index)} 
                  className="hotel-image" 
                  alt={h.name} 
                  loading="lazy"
                />
              </div>
              
              <div className="hotel-info">
                <h3>{h.name}</h3>
                <p style={{ color: '#aaa', fontSize: '0.9rem' }}>{h.location}</p>
                <div className="price-tag">
                  <span style={{ color: '#00d4ff', fontWeight: 'bold', fontSize: '1.2rem' }}>
                    ₹{h.price || h.pricePerNight || "8,500"}
                  </span>
                  <span style={{ fontSize: '0.7rem', color: '#fff' }}> / night</span>
                </div>
                <button 
                        className="book-btn" 
                        onClick={() => handleBookNow(h)}
                      >
                        Book Now
                </button>              
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