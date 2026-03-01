import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // 👈 NEW
import Map from "./Map";
import "./Emergency.css";

function Emergency() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    patientName: "",
    bloodGroup: "",
    hospital: "",
    contact: "",
    location: null
  });

  const [userLocation, setUserLocation] = useState(null);

  const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

  // 🌐 Auto switch API URL
  const API_URL =
    window.location.hostname === "localhost"
      ? "http://localhost:4000"
      : "https://your-backend.onrender.com";

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 📍 Get user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const coords = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
          };

          setUserLocation(coords);

          setForm((prev) => ({
            ...prev,
            location: coords
          }));
        },
        (err) => {
          console.log("Location access denied:", err);
        }
      );
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.location) {
      alert("Please select location");
      return;
    }

    // 📍 Convert to GeoJSON
    const payload = {
      ...form,
      location: {
        type: "Point",
        coordinates: [form.location.lng, form.location.lat]
      }
    };

    try {
      const response = await axios.post(
        `${API_URL}/api/v1/hackathon/emergency`,
        payload
      );

      console.log("Response:", response.data);

      alert("✅ Emergency request submitted!");

      navigate("/"); 

    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      alert("❌ Something went wrong!");
    }
    finally{
        navigate("/donors", {
  state: {
    lat: form.location.lat,
    lng: form.location.lng,
    bloodGroup: form.bloodGroup
  }
});
    }
  };

 return (
  <div className="emergency-page">

    {/* HEADER */}
    <div className="page-header">
      <h1>🚨 Emergency Blood Request</h1>
      <p>Fill details to find nearby donors instantly</p>
    </div>

    {/* MAIN GRID */}
    <div className="emergency-grid">

      {/* LEFT FORM */}
      <form onSubmit={handleSubmit} className="form-card">

        <input
          name="patientName"
          placeholder="Patient Name"
          onChange={handleChange}
          required
        />

        <select
          name="bloodGroup"
          onChange={handleChange}
          defaultValue=""
          required
        >
          <option value="" disabled>Select Blood Group</option>
          {bloodGroups.map((group) => (
            <option key={group} value={group}>{group}</option>
          ))}
        </select>

        <input
          name="hospital"
          placeholder="Hospital Name"
          onChange={handleChange}
          required
        />

        <input
          name="contact"
          placeholder="Contact Number"
          onChange={handleChange}
          required
        />

        {form.location && (
          <p className="location-text">
            📍 {form.location.lat.toFixed(4)}, {form.location.lng.toFixed(4)}
          </p>
        )}

        <button type="submit" className="submit-btn">
          🚑 Find Donors
        </button>
      </form>

      {/* RIGHT MAP */}
      <div className="map-card">
        <Map setForm={setForm} userLocation={userLocation} />
      </div>

    </div>

  </div>
);
}

export default Emergency;