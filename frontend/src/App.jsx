import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import SearchPage from './SearchPage';
import FeaturedHotelsPage from './FeaturedHotelsPage';
import MyBookings from './MyBookings';
import Navbar from './Navbar';

<nav>
  <Link to="/">Home</Link>
  <Link to="/search">Search Hotels</Link>
  <Link to="/my-bookings">My Bookings</Link> 
</nav>

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/featured" element={<FeaturedHotelsPage />} />
        <Route path="/my-bookings" element={<MyBookings />} />
      </Routes>
    </Router>
  );
}


export default App;
