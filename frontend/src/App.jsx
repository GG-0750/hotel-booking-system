import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import SearchPage from './SearchPage';
import FeaturedHotelsPage from './FeaturedHotelsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/featured" element={<FeaturedHotelsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
