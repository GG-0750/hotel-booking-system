import { useNavigate } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-hero"> {/* Use this class instead of inline styles */}
      <h1>Welcome to BookNest</h1><br></br>
      <p>Find your perfect home away from home.</p>
    </div>
  );
};


export default Home;