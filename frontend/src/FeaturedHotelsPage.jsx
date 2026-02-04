import { hotels } from './mockhotels';
import Footer from './components/footer';

function FeaturedHotelsPage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#121212', color: '#ffffff', padding: '20px' }}>
      <h2 style={{ marginBottom: '20px' }}>Featured Hotels</h2>
      {hotels.map(h => (
        <div key={h.id} style={{ backgroundColor: '#333', padding: '20px', marginTop: '10px', borderRadius: '5px' }}>
          {h.name} - {h.city}
        </div>
      ))}
      <Footer />
    </div>
  );
}

export default FeaturedHotelsPage;
