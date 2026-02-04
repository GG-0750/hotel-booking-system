import { useState } from 'react';
import Search from './components/search'; // if you want, or we can move input here
import { hotels } from './mockhotels';
import Footer from './components/footer';

function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = () => {
    const filtered = hotels.filter(h =>
      h.city.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filtered);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#121212', color: '#ffffff', padding: '20px' }}>
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
            <div key={h.id} style={{ backgroundColor: '#333', padding: '20px', marginTop: '10px', borderRadius: '5px' }}>
              {h.name} - {h.city}
            </div>
          ))
        )}
      </div>

      <Footer />
    </div>
  );
}

export default SearchPage;
