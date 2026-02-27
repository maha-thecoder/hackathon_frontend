import { useNavigate } from "react-router-dom";
import "./Services.css";

function Services() {
  const navigate = useNavigate();

  return (
    <div className="services-container">

      <h2 className="title">🚑 Emergency Services</h2>
      <p className="subtitle">Choose what you are looking for</p>

      <div className="card-container">

        {/* 🧑 Donor */}
        <div
          className="service-card"
          onClick={() => navigate("/emergency")}
        >
          <div className="icon">🧑‍🤝‍🧑</div>
          <h3>Nearest Donor</h3>
          <p>Find blood donors near your location</p>
        </div>

        {/* 🏥 Blood Bank */}
        <div
          className="service-card"
onClick={() => window.open("https://eraktkosh.com/", "_blank")}
>
          <div className="icon">🏥</div>
          <h3>Nearest Blood Bank</h3>
          <p>Locate nearby blood banks instantly</p>
        </div>

      </div>

    </div>
  );
}

export default Services;