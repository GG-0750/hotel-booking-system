import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './Home'; 
import SearchPage from './SearchPage'; 
import FeaturedHotelsPage from './FeaturedHotelsPage';
import MyBookings from './MyBookings';
import Navbar from './Navbar'; 
import Dashboard from './Dashboard'; 

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [bookings, setBookings] = useState([]);
  const [isFading, setIsFading] = useState(false);
  

useEffect(() => {
  fetch('http://localhost:5000/bookings')
    .then((res) => {
      // Check if the server actually found the page
      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      console.log("Bookings loaded successfully:", data);
      setBookings(data);
    })
    .catch((err) => {
      console.error("Could not load bookings:", err.message);
      // Keep bookings as an empty array so the app doesn't crash
      setBookings([]); 
    });
}, []);

  useEffect(() => {
    // Start fading out slightly before the 2 seconds are up
    const fadeTimer = setTimeout(() => setIsFading(true), 1200);
    
    // Completely remove splash screen at 2 seconds
    const removeTimer = setTimeout(() => setShowIntro(false), 2000); 

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  return (
    <>
      {showIntro && (
        <div className={`splash-wrapper ${isFading ? 'fade-exit' : ''}`}>
          <Home />
        </div>
      )}

      {!showIntro && (
        <Router>
          <Navbar />
          <div className="main-content">
            <Routes>
              <Route path="/search" element={<SearchPage />} />
              <Route path="/featured" element={<FeaturedHotelsPage />} />
              <Route path="/" element={<Dashboard bookings={bookings} />} />
              <Route path="/my-bookings" element={<MyBookings bookings={bookings} />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </Router>
      )}
    </>
  );
}

export default App;