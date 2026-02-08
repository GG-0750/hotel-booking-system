import React from 'react';
import './App.css';

const MyBookings = ({ bookings, setBookings }) => {
  
const handleCancel = async (bookingId) => {
  if (!window.confirm("Do you really want to cancel this reservation?")) return;

  try {
    const response = await fetch(`http://localhost:5000/bookings/${bookingId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      const updatedList = bookings.filter(b => b._id !== bookingId);
      setBookings(updatedList);
      
      alert("✅ Reservation successfully cancelled. Your refund is being processed.");
    } else {
      alert("❌ Could not cancel. Please try again.");
    }
  } catch (error) {
    console.error("Cancellation error:", error);
  }
};

    return (
    <div className="bookings-container">
      <h2 className="page-title">My Reservations</h2>
      
      {bookings && bookings.length > 0 ? (
        bookings.map((booking) => {
          console.log("Current Booking Object:", booking);
          
          // Safety check to see if Mongoose successfully joined the data
          const isPopulated = typeof booking.hotelId === 'object' && booking.hotelId !== null;

          return (
            <div key={booking._id} className="booking-card">
              <div className="booking-details">
                <h3>
                  {isPopulated ? booking.hotelId.name : "Populate Failed (Check Server)"}
                </h3>
                <p>
                  {isPopulated ? booking.hotelId.location : `ID: ${booking.hotelId}`}
                </p>
                <span className="status-badge">Confirmed</span>
              </div>
              
              <button 
                className="cancel-btn" 
                onClick={() => handleCancel(booking._id)}
              >
                Cancel Booking
              </button>
            </div>
          );
        }) 
      ) : (
        <div className="empty-state-box">
          <p>No active bookings found. Start exploring!</p>
        </div>
      )}
    </div>
  );
};

export default MyBookings;