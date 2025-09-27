import React, { useEffect, useState } from "react";
import { LoadScript, GoogleMap, Marker } from "@react-google-maps/api";

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
const mapContainerStyle = {
  width: "100%",
  height: "100%",
  minHeight: "300px",
  border: "none",
  boxShadow: "none",
};

const LiveTracking = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [error, setError] = useState(null);
  const [mapType, setMapType] = useState("roadmap");

  useEffect(() => {
    let intervalId;
    const fetchLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setUserLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          (err) => {
            setError("Unable to retrieve your location");
          },
          { enableHighAccuracy: true }
        );
      } else {
        setError("Geolocation is not supported by your browser");
      }
    };
    fetchLocation();
    intervalId = setInterval(fetchLocation, 5000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      {error && (
        <p className="text-red-500 absolute top-4 left-4 z-10 bg-white p-2 rounded shadow">
          {error}
        </p>
      )}
      <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
        {userLocation ? (
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={userLocation}
            zoom={16}
            options={{
              disableDefaultUI: false,
              zoomControl: true,
              fullscreenControl: true,
              mapTypeControl: false,
              streetViewControl: false,
            }}
          >
            <Marker position={userLocation} label="" />
          </GoogleMap>
        ) : (
          <div className="flex items-center justify-center h-full w-full">
            <p className="text-lg text-gray-700">Loading your location...</p>
          </div>
        )}
      </LoadScript>
    </div>
  );
};

export default LiveTracking;
