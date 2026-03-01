import "./Home.css";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="home-content">

        <div className="hero-badge">
          🩸 ONE PAGE ONE LIFE
        </div>

        <h1 className="home-title">
          One Page. <span>One Life.</span>
        </h1>

        <p className="home-text">
          In emergencies, every second matters.  
          We connect donors and patients instantly to save lives when it matters most.
        </p>

        <div className="home-actions">
          <button
            className="btn primary-btn"
            onClick={() => navigate("/split")}
          >
            🚨 Request Blood
          </button>

          <button
            className="btn secondary-btn"
            onClick={() => navigate("/eligible-test")}
          >
            ❤️ Become a Donor
          </button>
        </div>

      </div>
    </div>
  );
}

export default Home;