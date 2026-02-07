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


  return (
    <div style={{ minHeight: '100vh',width: '100%', backgroundColor: '#121212', color: '#ffffff', padding: '20px' }}>
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
              {h.name} - {h.location} - ₹{h.price} 
            </div>
          ))
        )}
      </div>

      <Footer />
    </div>
  );
}

export default SearchPage;
