import { useEffect,useState } from 'react';
import Footer from './components/footer';

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
    <div style={{ minHeight: '100vh', width: '100%', backgroundColor: '#121212', color: '#ffffff', padding: '20px' }}>
      <h2 style={{ marginBottom: '20px' }}>Search Hotels</h2>
      <input
        type="text"
        placeholder="Enter city..."
        value={query}
        onChange={e => setQuery(e.target.value)}
        style={{ padding: '8px', width: '250px', borderRadius: '5px', border: 'none' }}
      />
      <button
        onClick={handleSearch}
        style={{ padding: '8px 12px', marginLeft: '10px', borderRadius: '5px', border: 'none', backgroundColor: '#00aaff', color: '#fff', cursor: 'pointer' }}
      >
        Search
      </button>

      <div style={{ marginTop: '20px' }}>
        {results.length === 0 ? (
          <p>No results</p>
        ) : (
          results.map(h => (
            <div key={h._id} style={{ backgroundColor: '#333', padding: '20px', marginTop: '10px', borderRadius: '5px' }}>
              <p>{h.name} - {h.location} - ₹{h.price}</p>
              <button 
                onClick={() => handleBook(h._id)} 
                style={{ marginTop: '10px', cursor: 'pointer', padding: '5px 10px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px' }}
              >
                Book Now
              </button>
            </div>
          ))
        )}
      </div>
      <Footer />
    </div>
  );
}

export default SearchPage;
