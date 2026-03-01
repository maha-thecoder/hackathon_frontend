import "./OneLife.css";
import { useNavigate } from "react-router-dom";
import { FaHospital, FaRobot, FaPhoneAlt,FaUserPlus } from "react-icons/fa";

function OneLife() {
  const navigate = useNavigate();

  return (
    <div className="one-life-container">
      
      <div className="one-life-card">

        <h1 className="title">
          🩸 ONE PAGE ONE LIFE
        </h1>

        <p className="subtitle">
          A single click can save a life. Choose your path to help.
        </p>

        <div className="options">

          {/* Blood Bank */}
          <div
            className="option-card"
            onClick={() => navigate("/split")}
          >
            <FaHospital className="icon" />
            <h3>Find Blood Donors</h3>
            <p>Find nearby blood donors and banks instantly</p>
          </div>

          <div
  className="option-card"
  onClick={() => navigate("/eligible-test")}
>
  <FaUserPlus className="icon" />
  <h3>Become a Donor</h3>
  <p>Register yourself and help save lives</p>
</div>

          {/* AI Assist */}
          <div
            className="option-card"
            onClick={() => navigate("/chatbot")}
          >
            <FaRobot className="icon" />
            <h3>AI Smart Assist</h3>
            <p>Get instant help and guidance</p>
          </div>

        </div>

        {/* INFO SECTION */}
        <div className="info-section">
          <p>
            Our platform connects donors, patients, and hospitals in real-time.
            In emergency situations, every second matters — we help you find help instantly.
          </p>
        </div>

        {/* HELPLINE SECTION */}
        <div className="helpline">
          <h3><FaPhoneAlt /> Emergency Helplines</h3>
          <p>🚑 Ambulance: <strong>108</strong></p>
          <p>🩸 Blood Helpline: <strong>1910</strong></p>
          <p>📞 General Emergency: <strong>112</strong></p>
        </div>

      </div>
    </div>
  );
}

export default OneLife;