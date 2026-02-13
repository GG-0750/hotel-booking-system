import { useEffect, useState } from 'react';
import './App.css';

function FeaturedHotelsPage() {
  // State declarations
  const [hotels, setHotels] = useState([]);
  const [sentiments, setSentiments] = useState({});
  const [reviewText, setReviewText] = useState('');
  const [selectedHotel, setSelectedHotel] = useState(null);

  // Fetch hotels and sentiment data
  useEffect(() => {
    fetch('http://localhost:5000/hotels')
      .then(res => res.json())
      .then(data => {
        setHotels(data);
        
        // Fetch sentiment for each hotel
        data.forEach(hotel => {
          if (hotel.reviews && hotel.reviews.length > 0) {
            fetch(`http://localhost:5000/hotels/${hotel._id}/sentiment`)
              .then(res => res.json())
              .then(sentimentData => {
                setSentiments(prev => ({
                  ...prev,
                  [hotel._id]: sentimentData
                }));
              });
          }
        });
      })
      .catch(err => console.error(err));
  }, []);

  // Image handler
  const getSafeImage = (hotel, index) => {
    if (hotel.image && hotel.image.startsWith('http') && !hotel.image.includes('placeholder')) {
      return hotel.image;
    }
    
    const name = hotel.name ? hotel.name.toLowerCase() : "";
    
    if (name.includes('hyatt')) {
      return "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80";
    }
    if (name.includes('novotel')) {
      return "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80";
    }
    if (name.includes('taj')) {
      return "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80";
    }
    
    const gallery = [
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=800&q=80"
    ];
    return gallery[index % gallery.length];
  };

  // Convert sentiment score to stars
  const convertToStars = (score) => {
    const stars = Math.max(1, Math.min(5, (score + 10) / 4));
    return stars.toFixed(1);
  };

  // Render star rating
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    return (
      <>
        {'★'.repeat(fullStars)}
        {hasHalfStar && '⯨'}
        {'☆'.repeat(5 - fullStars - (hasHalfStar ? 1 : 0))}
      </>
    );
  };

  // Handle booking
  const handleBookNow = async (hotel) => {
    const newBooking = {
      hotelId: hotel._id,
      customerName: "Ganga",
    };

    try {
      const response = await fetch('http://localhost:5000/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBooking),
      });

      if (response.ok) {
        alert(`Success! ${hotel.name} has been added to your reservations.`);
        window.location.href = "/my-bookings";
      }
    } catch (error) {
      console.error("Booking error:", error);
    }
  };

  // Handle review submission
  const handleSubmitReview = async (hotelId) => {
    if (!reviewText.trim()) {
      alert("Please write a review");
      return;
    }
    
    try {
      const response = await fetch(`http://localhost:5000/hotels/${hotelId}/review`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ review: reviewText })
      });
      
      if (response.ok) {
        alert("Review submitted!");
        setReviewText('');
        setSelectedHotel(null);
        window.location.reload();
      }
    } catch (error) {
      console.error("Error submitting review:", error);
    }
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
                
                {/* Sentiment & Reviews */}
                {sentiments[h._id] && (
                  <div style={{ marginTop: '12px', marginBottom: '12px' }}>
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '8px',
                      fontSize: '1.1rem',
                      color: '#ffd700'
                    }}>
                      {renderStars(convertToStars(sentiments[h._id].averageScore))}
                      <span style={{ fontSize: '0.9rem', color: '#aaa' }}>
                        {convertToStars(sentiments[h._id].averageScore)}/5
                      </span>
                    </div>
                    
                    <div style={{ 
                      marginTop: '10px',
                      padding: '10px',
                      background: '#1a1a1a',
                      borderRadius: '8px',
                      fontSize: '0.85rem',
                      color: '#ccc'
                    }}>
                      {h.reviews && h.reviews.slice(0, 2).map((review, idx) => (
                        <p key={idx} style={{ margin: '6px 0', fontStyle: 'italic' }}>
                          "{review}"
                        </p>
                      ))}
                      {h.reviews && h.reviews.length > 2 && (
                        <p style={{ color: '#00d4ff', fontSize: '0.8rem', marginTop: '8px' }}>
                          +{h.reviews.length - 2} more reviews
                        </p>
                      )}
                    </div>
                  </div>
                )}
                
                {/* Price */}
                <div className="price-tag">
                  <span style={{ color: '#00d4ff', fontWeight: 'bold', fontSize: '1.2rem' }}>
                    ₹{h.price || h.pricePerNight || "8,500"}
                  </span>
                  <span style={{ fontSize: '0.7rem', color: '#fff' }}> / night</span>
                </div>
                
                {/* Book Now Button */}
                <button 
                  className="book-btn" 
                  onClick={() => handleBookNow(h)}
                >
                  Book Now
                </button>
                
                {/* Write Review Button */}
                <button 
                  style={{
                    marginTop: '10px',
                    padding: '8px 16px',
                    background: 'transparent',
                    border: '1px solid #00d4ff',
                    color: '#00d4ff',
                    borderRadius: '5px',
                    cursor: 'pointer'
                  }}
                  onClick={() => setSelectedHotel(selectedHotel === h._id ? null : h._id)}
                >
                  {selectedHotel === h._id ? 'Cancel' : 'Write Review'}
                </button>

                {/* Review Form */}
                {selectedHotel === h._id && (
                  <div style={{ marginTop: '15px' }}>
                    <textarea
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                      placeholder="Share your experience..."
                      style={{
                        width: '100%',
                        minHeight: '80px',
                        padding: '10px',
                        background: '#1a1a1a',
                        border: '1px solid #333',
                        borderRadius: '5px',
                        color: '#fff',
                        fontSize: '0.9rem'
                      }}
                    />
                    <button
                      onClick={() => handleSubmitReview(h._id)}
                      style={{
                        marginTop: '8px',
                        padding: '8px 20px',
                        background: '#00d4ff',
                        border: 'none',
                        borderRadius: '5px',
                        color: '#000',
                        fontWeight: 'bold',
                        cursor: 'pointer'
                      }}
                    >
                      Submit Review
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FeaturedHotelsPage;