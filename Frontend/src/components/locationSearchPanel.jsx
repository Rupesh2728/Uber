import React from "react";

const LocationSearchPanel = ({setPanelOpen,setVechiclePanel} ) => {
  const locations = [
    "74-31/1-13, Raghu Gardens Road, Vijayawada",
    "12-45, MG Road, Hyderabad",
    "56-78, Park Street, Kolkata",
    "90-12, Brigade Road, Bangalore",
    "34-56, Marine Drive, Mumbai",
    "78-90, Sector 18, Noida",
    "23-45, Connaught Place, Delhi",
    "67-89, Banjara Hills, Hyderabad",
    "45-67, Indiranagar, Bangalore",
    "89-01, Juhu Beach, Mumbai",
    "11-22, Sector 5, Chandigarh",
    "33-44, Salt Lake, Kolkata",
    "55-66, Koramangala, Bangalore",
  ];

  return (
    <div className="h-screen flex flex-col">
      {/* Header / Top Section */}
      <div className="flex items-center justify-start p-4 border-b shrink-0">
        <h2 className="rounded-full flex items-center justify-center p-3 text-2xl">
          <i className="ri-user-location-fill"></i>
        </h2>
        <h4 className="pl-4 text-lg font-medium">Use current location</h4>
      </div>

      {/* Scrollable Section */}
      <div className="flex-1 overflow-y-auto px-4 pb-6">
        {locations.map((location, index) => (
          <div
            key={index}
            className="flex border-2 rounded-lg border-white active:border-black justify-start p-3 mt-2"
            onClick={()=>{ setVechiclePanel(true);setPanelOpen(false)}}
          >
            <h2 className="bg-[#eee] rounded-full flex items-center justify-center p-2 text-lg">
              <i className="ri-map-pin-fill"></i>
            </h2>
            <h4 className="pl-4 text-md font-medium flex items-center">
              {location}
            </h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocationSearchPanel;
