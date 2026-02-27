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
    <div>
        <div className="page-header">
      <h2>🚨 Emergency Blood Request</h2>
</div>

    <div className="container">

      <form onSubmit={handleSubmit} className="form">
        {/* Patient Name */}
        <input
          name="patientName"
          placeholder="Patient Name"
          onChange={handleChange}
          required
        />

        {/* Blood Group */}
        <select
          name="bloodGroup"
          onChange={handleChange}
          defaultValue=""
          required
        >
          <option value="" disabled>Select Blood Group</option>
          {bloodGroups.map((group) => (
            <option key={group} value={group}>
              {group}
            </option>
          ))}
        </select>

        {/* Units */}
       

        {/* Hospital */}
        <input
          name="hospital"
          placeholder="Hospital Name"
          onChange={handleChange}
          required
        />

        {/* Contact */}
        <input
          name="contact"
          placeholder="Contact Number"
          onChange={handleChange}
          required
        />

        {/* 📍 Map */}
        <Map setForm={setForm} userLocation={userLocation} />

        {/* Coordinates */}
        {form.location && (
          <p>
            📍 Selected Location: {form.location.lat.toFixed(4)},{" "}
            {form.location.lng.toFixed(4)}
          </p>
        )}

        <button type="submit">Submit</button>
      </form>
    </div>
    </div>
  );
}

export default Emergency;