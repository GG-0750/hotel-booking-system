import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css'; 

const Dashboard = ({ bookings }) => {
   console.log("Dashboard received bookings:", bookings);
  const navigate = useNavigate();
  const [recommendations, setRecommendations] = useState([]);
  useEffect(() => {
  fetch('http://localhost:5000/recommendations/Ganga')
    .then(res => res.json())
    .then(data => setRecommendations(data))
    .catch(err => console.error(err));
}, []);
return (
    <div className="page-container">
      <div className="dashboard-welcome">
        <h2>Hello, Traveler!</h2>
      </div>

      {/* Logic: Only show ONE of these based on bookings.length */}
      {bookings && bookings.length > 0 ? (
        <div className="booking-summary">
          <h2>You have {bookings.length} active reservations!</h2><br></br>
          <p>Ready for your next trip?</p><br></br>
          <button className="search-btn" onClick={() => navigate('/my-bookings')} style={{marginTop: '20px'}}>
            View All Bookings
          </button>
        </div>
      ) : (
        <div className="empty-state-box">
          <p>You haven't booked any hotels yet.</p>
          <button className="book-btn" onClick={() => navigate('/featured')} style={{width: 'auto', padding: '12px 30px', marginTop: '20px'}}>
            Tap to see featured hotels
          </button>
        </div>
      )}
       {/* Recommendations Section */}
      {recommendations.length > 0 && (
        <div className="recommendations-section">
          <h3>Recommended For You</h3>
          <div className="recommendations-grid">
            {recommendations.map(hotel => (
              <div key={hotel._id} className="recommendation-card">
                <div>
                  <h4>{hotel.name}</h4>
                  <p style={{ color: '#aaa', fontSize: '0.9rem' }}>{hotel.location}</p>
                  <p style={{ color: '#00d4ff', fontWeight: 'bold', margin: '8px 0' }}>
                    ₹{hotel.price}/night
                  </p>
                  <p className="recommendation-description">
                    {hotel.description ? hotel.description.substring(0, 100) + '...' : 'Luxury stay'}
                  </p>
                </div>
                <button 
                  className="book-btn" 
                  onClick={() => navigate('/featured')}
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;