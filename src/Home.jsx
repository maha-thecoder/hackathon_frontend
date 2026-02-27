import "./Home.css";
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate=useNavigate()
  return (
    <div className="home-container">
      <div className="overlay">
        <h1 className="home-title">🚑 Emergency Blood Donation System</h1>

        <p className="home-text">
          Connecting donors and patients instantly to save lives in critical situations.
        </p>

        <div className="home-actions">
          <button className="btn emergency-btn" onClick={()=>navigate('/split')}>
            🚨 Request Blood
          </button>

          <button className="btn donor-btn" onClick={()=>navigate("/eligible-test")}>
            ❤️ Become a Donor
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;