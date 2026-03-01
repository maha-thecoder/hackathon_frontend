import { useEffect, useState } from "react";
import axios from "axios";
import Map from "./Map";
import "./DonorProfile.css";

function DonorProfile() {
  const [donor, setDonor] = useState(null);

  const API_URL =
    window.location.hostname === "localhost"
      ? "http://localhost:4000"
      : "https://your-backend.onrender.com";

  useEffect(() => {
    const phone = localStorage.getItem("phone");

    const fetchDonor = async () => {
      try {
        const res = await axios.post(
          `${API_URL}/api/v1/hackathon/get-donor`,
          { phone }
        );

        setDonor(res.data.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchDonor();
  }, []);

  if (!donor) return <p className="loading">Loading...</p>;

  // ✅ Safe image handling
  const profileImage =
    donor.image && donor.image.trim() !== ""
      ? donor.image
      : "https://via.placeholder.com/150?text=No+Image";

  return (
    <div className="profile-wrapper">
      <div className="profile-card">

        {/* IMAGE (OPTIONAL) */}
        <img
          src={profileImage}
          alt="donor"
          className="profile-img"
        />

        {/* NAME */}
        <h2>{donor.name}</h2>

        {/* BLOOD */}
        <div className="badge">🩸 {donor.bloodGroup}</div>

        {/* PHONE */}
        <p className="info">📞 {donor.phone}</p>

        {/* MAP */}
        <div className="map-box">
          <Map
            userLocation={{
              lat: donor.location.coordinates[1],
              lng: donor.location.coordinates[0],
            }}
          />
        </div>

      </div>
    </div>
  );
}

export default DonorProfile;