import React, { useState, useEffect } from "react";
import axios from "axios";

const LocationSearchPanel = ({
  inputType,
  setPickup,
  setDestination,
  searchInput
}) => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [locationError, setLocationError] = useState(null);

  const getNearbyLocations = async (latitude, longitude) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/getnearbylocsuggestions`,
        {
          params: {
            lat: latitude,
            lng: longitude,
            radius: 2,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuggestions(response.data.suggestions || []);
      console.log(suggestions);
    } catch (error) {
      console.error("Error fetching nearby locations:", error);
      setSuggestions([]);
    }
    setLoading(false);
  };

  const handleCurrentLocation = () => {
    setLoading(true);
    setLocationError(null);

    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        getNearbyLocations(position.coords.latitude, position.coords.longitude);
      },
      (error) => {
        console.error("Error getting location:", error);
        setLocationError("Unable to retrieve your location");
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  };

  const fetchSearchSuggestions = async (input) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
        {
          params: {
            input: input,
            type: inputType,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSuggestions(response.data.suggestions || []);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (searchInput && searchInput.length >= 3) {
      fetchSearchSuggestions(searchInput);
      return;
    }

    if (!searchInput) {
      handleCurrentLocation();
      return;
    }
    const timeoutId = setTimeout(() => {
      fetchSuggestions();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchInput]);

  const handleLocationSelect = (location) => {
    const description = location.description || location;
    if (inputType === "pickup") {
      setPickup(description);
    } else {
      setDestination(description);
    }
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Header / Top Section */}
      <div
        className="flex items-center justify-start p-4 border-b shrink-0 cursor-pointer hover:bg-gray-50"
        onClick={handleCurrentLocation}
      >
        <h2 className="rounded-full flex items-center justify-center p-3 text-2xl">
          <i className="ri-user-location-fill"></i>
        </h2>
        <div className="pl-4">
          <h4 className="text-lg font-medium">Use current location</h4>
          {locationError && (
            <p className="text-red-500 text-sm">{locationError}</p>
          )}
        </div>
      </div>

      {/* Scrollable Section */}
      <div className="flex-1 overflow-y-auto px-4 pb-6">
        {loading ? (
          <div className="flex justify-center items-center py-4">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-black"></div>
          </div>
        ) : locationError ? (
          <div className="text-red-500 text-center py-4">{locationError}</div>
        ) : suggestions.length === 0 ? (
          <div className="text-gray-500 text-center py-4">
            {searchInput ? "No locations found" : "Getting nearby locations..."}
          </div>
        ) : (
          suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="flex border-2 rounded-lg border-white active:border-black justify-start p-3 mt-2 cursor-pointer hover:bg-gray-50"
              onClick={() => handleLocationSelect(suggestion)}
            >
              <h2 className="bg-[#eee] rounded-full flex items-center justify-center p-2 text-lg">
                <i className="ri-map-pin-fill"></i>
              </h2>
              <h4 className="pl-4 text-md font-medium flex items-center">
                {suggestion.description || suggestion}
              </h4>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default LocationSearchPanel;
