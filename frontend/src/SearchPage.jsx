import { useEffect,useState } from 'react';
import './App.css'; 


function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    console.log("button was freakin clicked!");
    try {
      const res = await fetch(
        `http://localhost:5000/hotels/search?location=${query}`
      );
      if(!res.ok) {throw new Error("Failed to fetch hotels");}

      const data = await res.json();
      setResults(data);
      
    }
    catch (err) {
      console.error(err);
      setResults([]);
    }
  };

  const handleBook = async (hotelId) => {
  const name = prompt("Please enter your name to confirm booking:");
  
  if (!name) return; // Exit if they cancel the prompt

  try {
    const response = await fetch("http://localhost:5000/api/book", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        hotelId: hotelId, 
        customerName: name 
      }),
    });

    if (response.ok) {
      alert("Booking confirmed! See you in Chennai!");
    } else {
      alert("Something went wrong with the booking.");
    }
  } catch (err) {
    console.error("Error:", err);
  }
};


return (
  <div className="page-container">
    <h2>Search Hotels</h2><br></br>
    
    <div className="search-controls">
      <input
        type="text"
        placeholder="Enter city..."
        value={query}
        onChange={e => setQuery(e.target.value)}
        className="search-input"
      />
      <button onClick={handleSearch} className="search-btn">
        Search
      </button>
    </div>

    {results.length === 0 ? (
      <div className="no-results">
        <p>No results found. Try searching for "Chennai".</p>
      </div>
    ) : (
      <div className="hotel-grid">
        {results.map(h => (
          <div key={h._id} className="hotel-card">
            {h.image && <img src={h.image} alt={h.name} className="hotel-image" />}
            
            <div className="hotel-info">
              <h3>{h.name}</h3>
              <p>{h.location}</p>
              <p className="price">₹{h.price} / night</p>
              
              <button onClick={() => handleBook(h._id)} className="book-btn">
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    )}
    
  </div>
);
}

export default SearchPage;
