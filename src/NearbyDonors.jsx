import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Map from "./Map";
import "./NearbyDonors.css";

function NearbyDonors() {
  const { state } = useLocation();

  const [donors, setDonors] = useState([]);
  const [selectedDonor, setSelectedDonor] = useState(null);

  const API_URL =
    window.location.hostname === "localhost"
      ? "http://localhost:4000"
      : "https://your-backend.onrender.com";

  // 🔥 WhatsApp function
  const sendWhatsApp = (donor) => {
    const patientName = state?.patientName || "Emergency Patient";
    const bloodGroup = state?.bloodGroup || donor.bloodGroup;

    const lat = state.lat;
    const lng = state.lng;

    const mapLink = `https://www.google.com/maps?q=${lat},${lng}`;

    const message = `
Hi ${donor.name},

My name is ${patientName}. I urgently need ${bloodGroup} blood.

Your blood group matches our requirement 🙏

📍 Location: ${mapLink}

Please help if possible.
Thank you ❤️
`;

    const encodedMessage = encodeURIComponent(message);

    const whatsappUrl = `https://wa.me/91${donor.phone}?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");
  };

  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const res = await axios.get(
          `${API_URL}/api/v1/hackathon/nearby-donors`,
          {
            params: {
              lat: state.lat,
              lng: state.lng,
              bloodGroup: state.bloodGroup
            }
          }
        );

        setDonors(res.data.data);

      } catch (error) {
        console.error(error);
      }
    };

    fetchDonors();
  }, [state]);

  return (
    <div className="nearby-container">

      {/* Header */}
      <div className="page-header">
        <h2>🩸 Nearby Donors</h2>
        <p>Available donors within 10 km radius</p>
      </div>

      {/* Map */}
      <div className="map-section">
        <Map
          markers={donors}
          userLocation={{ lat: state.lat, lng: state.lng }}
        />
      </div>

      {/* Donor List */}
      <div className="donor-list">
        {donors.length === 0 ? (
          <p className="no-data">No donors found</p>
        ) : (
          donors.map((donor, index) => (
            <div className="donor-card" key={donor._id}>

              {/* Image */}
              <div className="donor-image">
                <img
                  src={donor.image || "https://via.placeholder.com/80"}
                  alt="donor"
                />
              </div>

              <div className="donor-content">

                {/* Name + Blood */}
                <div className="donor-top">
                  <h3>{donor.name}</h3>
                  <span className="blood-badge">{donor.bloodGroup}</span>
                </div>

                {/* Nearest */}
                {index === 0 && <span className="nearest">Nearest</span>}

                {/* Details */}
                <div className="donor-details">

                  <p><span className="label">Name:</span> {donor.name}</p>
                  <p><span className="label">Blood Group:</span> {donor.bloodGroup}</p>
                  <p><span className="label">Phone:</span> {donor.phone}</p>

                  {donor.distance && (
                    <p>
                      <span className="label">Distance:</span>{" "}
                      {(donor.distance / 1000).toFixed(2)} km
                    </p>
                  )}

                </div>

                {/* Buttons */}
                <div className="btn-group">

                  <button
                    className="view-btn"
                    onClick={() => setSelectedDonor(donor)}
                  >
                    View Location
                  </button>

                  <a href={`tel:${donor.phone}`} className="call-btn">
                    Call
                  </a>

                  {/* 🔥 WhatsApp Button */}
                  <button
                    className="whatsapp-btn"
                    onClick={() => sendWhatsApp(donor)}
                  >
                    send location through WhatsApp
                  </button>

                </div>

              </div>
            </div>
          ))
        )}
      </div>

      {/* Popup Map */}
      {selectedDonor && (
        <div className="map-popup">
          <div className="popup-content">
            <h3>Donor Location</h3>

            <Map
              userLocation={{
                lat: selectedDonor.location.coordinates[1],
                lng: selectedDonor.location.coordinates[0]
              }}
            />

            <button
              className="close-btn"
              onClick={() => setSelectedDonor(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

export default NearbyDonors;