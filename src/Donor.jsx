import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Map from "./Map";
import ImageUpload from "./imageupload";
import "./donor.css";

function Donor() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    age: "",
    bloodGroup: "",
    phone: "",
    location: null,
    image: "" // 🔥 NEW
  });

  const [userLocation, setUserLocation] = useState(null);

  const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

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
      navigator.geolocation.getCurrentPosition((pos) => {
        const coords = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        };

        setUserLocation(coords);

        setForm((prev) => ({
          ...prev,
          location: coords
        }));
      });
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.location) {
      alert("Please select location");
      return;
    }

    const payload = {
      ...form,
      age: Number(form.age),
      location: {
        type: "Point",
        coordinates: [form.location.lng, form.location.lat]
      }
    };

    try {
      const response = await axios.post(
        `${API_URL}/api/v1/hackathon/donor`,
        payload
      );

      console.log("Response:", response.data);

      alert("✅ Donor registered successfully!");

      navigate("/");

    } catch (error) {
      console.error(error.response?.data || error.message);
      alert("❌ Something went wrong!");
    }
  };

  return (
    <div className="donor-page">
<div className="page-header">
  <h2>🩸 Blood Donor Registration</h2>
  <p>Register as a donor and help save lives in emergencies</p>
</div>    <div className="container">

      <form onSubmit={handleSubmit} className="form">
        {/* Name */}
        <input
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
          required
        />

        {/* Age */}
        <input
          name="age"
          type="number"
          placeholder="Age"
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

        {/* Phone */}
        <input
          name="phone"
          placeholder="Phone Number"
          onChange={handleChange}
          required
        />

        {/* 📍 Map */}
        <Map setForm={setForm} userLocation={userLocation} />

        {form.location && (
          <p>
            📍 Location: {form.location.lat.toFixed(4)},{" "}
            {form.location.lng.toFixed(4)}
          </p>
        )}

        {/* 🖼️ Image Upload */}
        <ImageUpload
          onUpload={(url) =>
            setForm((prev) => ({
              ...prev,
              image: url
            }))
          }
        />

        {/* Preview Uploaded Image */}
        {form.image && (
          <img
            src={form.image}
            alt="Uploaded"
            style={{ width: "100px", borderRadius: "10px" }}
          />
        )}

        {/* Hidden field */}
        <input type="hidden" value={form.image} />

        <button type="submit">Register</button>
      </form>
    </div>
    </div>  
  );
}

export default Donor;