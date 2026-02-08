import React from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css'; 

const Dashboard = ({ bookings }) => {
   console.log("Dashboard received bookings:", bookings);
  const navigate = useNavigate();

return (
    <div className="page-container">
      <div className="dashboard-welcome">
        <h2>Hello, Traveler!</h2>
        <div className="divider"></div>
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
    </div>
  );
};

export default Dashboard;