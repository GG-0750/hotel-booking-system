import React from 'react';
import './App.css';

const MyBookings = ({ bookings }) => {
  
  
  return (
    <div className="bookings-container">
      <h2 style={{ color: '#00d4ff', marginBottom: '30px' }}>My Reservations</h2>
      
      {bookings && bookings.length > 0 ? (
        bookings.map((booking) => (
          <div key={booking._id} className="booking-card">
            <div className="booking-details">
              {/* If using .populate('hotelId'), use booking.hotelId.name */}
              <h3>{booking.hotelId?.name || "Hotel Stay"}</h3>
              <p>{booking.hotelId?.location || "Chennai"}</p>
              <span className="status-badge">Confirmed</span>
            </div>
            <button className="cancel-btn">Cancel Booking</button>
          </div>
        ))
      ) : (
        <div className="empty-state-box">
          <p>No active bookings found.</p>
        </div>
      )}
    </div>
  );
};

export default MyBookings;