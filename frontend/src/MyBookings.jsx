import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/my-bookings');
        setBookings(response.data);
      } catch (err) {
        console.error("Error fetching bookings", err);
      }
    };
    fetchBookings();
  }, []);

        return (
        <div className="bookings-container">
            <h2 className="page-title">My Chennai Hotel Bookings</h2>
            
            {bookings.length === 0 ? (
            <div className="no-results-box">
                <p>No bookings found. Time to plan a trip!</p>
            </div>
            ) : (
            <div className="booking-grid">
                {bookings.map((b) => (
                <div key={b._id} className="booking-card">
                    <div className="booking-details">
                    <span className="status-badge">✅ Confirmed</span>
                    <h3>{b.hotelId?.name || "Premium Chennai Stay"}</h3>
                    <p><strong>Guest:</strong> {b.userName}</p>
                    <p className="booking-price">₹{b.hotelId?.price || "---"}</p>
                    </div>

                    <button 
                    className="cancel-btn" 
                    onClick={() => handleCancel(b._id)}
                    >
                    Cancel Booking
                    </button>
                </div>
                ))}
            </div>
            )}
        </div>
        );
};

export default MyBookings;