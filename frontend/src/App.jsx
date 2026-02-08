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
  const [isTransitioning, setIsTransitioning] = useState(false);
  

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


// Splash screen logic: show Home component for 2 seconds, then fade out and show the main app
  useEffect(() => {
    // Start fading out slightly before the 2 seconds are up
    const transitionTimer = setTimeout(() => setIsTransitioning(true), 800);
    
    // Completely remove splash screen at 2 seconds
    const removeTimer = setTimeout(() => setShowIntro(false), 1400); 

    return () => {
      clearTimeout(transitionTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  return (
    <>
      {showIntro && (
        <div className={`splash-wrapper ${isTransitioning ? 'splash-exit-active' : ''}`}>
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
              <Route path="/my-bookings" element={<MyBookings bookings={bookings} setBookings={setBookings} />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </Router>
      )}
    </>
  );
}

export default App;