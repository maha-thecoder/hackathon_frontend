import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useState, useEffect } from "react";

const containerStyle = {
  width: "100%",
  height: "300px"
};

function Map({ setForm, userLocation }) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script", // 👈 prevents duplicate loading
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY
  });

  const [position, setPosition] = useState({
    lat: 16.5062,
    lng: 80.6480
  });

  // 📍 Update when user location comes
  useEffect(() => {
    if (userLocation) {
      setPosition(userLocation);
    }
  }, [userLocation]);

  const handleClick = (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();

    const newPos = { lat, lng };

    setPosition(newPos);

    setForm((prev) => ({
      ...prev,
      location: newPos
    }));
  };

  if (!isLoaded) return <p>Loading Map...</p>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={position}
      zoom={12}
      onClick={handleClick}
    >
      <Marker position={position} />
    </GoogleMap>
  );
}

export default Map;