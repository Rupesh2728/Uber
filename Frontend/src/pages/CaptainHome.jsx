import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RidePopUp from "../components/RidePopUp";
import CaptainDetails from "../components/CaptainDetails";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ConfirmRidePopUp from "../components/ConfirmRidePopUp";
import { SocketContext } from "../context/SocketContext";
import axios from "axios";
import LiveTracking from "../components/LiveTracking";

const CaptainHome = () => {
  const { sendLocationUpdate, sendMessage, receiveMessage, socket } =
    useContext(SocketContext);
  const [ridePopupPanel, setridePopupPanel] = useState(false);
  const [confirmridePopupPanel, setconfirmridePopupPanel] = useState(false);
  const ridePopupPanelRef = React.useRef(null);
  const confirmridePopupPanelRef = React.useRef(null);
  const [ride, setride] = useState(null);

  const captain = JSON.parse(localStorage.getItem("captain"));

  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          setLocation({
            ltd: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (err) => {
          setError(err.message);
        },
        {
          enableHighAccuracy: true, // Use GPS if available
          maximumAge: 1000, // Cache location for 1s
          timeout: 5000, // Wait up to 5s
        }
      );

      return () => navigator.geolocation.clearWatch(watchId);
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    sendMessage("join", {
      userType: "captain",
      userId: captain._id,
    });
  });

  useEffect(() => {
    console.log(location);
    sendLocationUpdate(captain._id, location);
  }, [location]);

  useEffect(() => {
    receiveMessage("new-ride", (data) => {
      console.log("New ride request received:", data);
      setride(data);
      setridePopupPanel(true);
    });
  }, []);

  useGSAP(() => {
    gsap.to(ridePopupPanelRef.current, {
      transform: ridePopupPanel ? "translateY(0%)" : "translateY(100%)",
    });
  }, [ridePopupPanel]);

  useGSAP(() => {
    gsap.to(confirmridePopupPanelRef.current, {
      transform: confirmridePopupPanel ? "translateY(0%)" : "translateY(100%)",
    });
  }, [confirmridePopupPanel]);

  const confrimRidefunc = async () => {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/rides/confirm`,
      {
        rideId: ride._id,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    setridePopupPanel(false);
    setconfirmridePopupPanel(true);
  };

  return (
    <div className="h-screen">
      <div className="fixed p-6 top-0 flex justify-between items-center w-screen">
        <img
        className="w-20 fixed left-5 top-5  drop-shadow-lg rounded-xl p-2 z-10"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png"
        alt="Uber logo"
      />
        <Link
          to="/captain-home"
          className="h-10 w-10 bg-white flex items-center justify-center rounded-full"
        >
          <i className="text-lg font-medium ri-logout-box-r-line"></i>
        </Link>
      </div>

      <div className="h-3/5">
        <LiveTracking />
      </div>

      <div className="h-2/5 p-6 pb-0">
        <CaptainDetails />
      </div>

      <div
        ref={ridePopupPanelRef}
        className="fixed z-10 bottom-0 translate-y-full bg-white p-3 w-full"
      >
        <RidePopUp
          ride={ride}
          setridePopupPanel={setridePopupPanel}
          confrimRidefunc={confrimRidefunc}
        />
      </div>

      <div
        ref={confirmridePopupPanelRef}
        className="fixed z-10 bottom-0 translate-y-full bg-white p-3 w-full h-screen"
      >
        <ConfirmRidePopUp
          ride={ride}
          setconfirmridePopupPanel={setconfirmridePopupPanel}
          setridePopupPanel={setridePopupPanel}
        />
      </div>
    </div>
  );
};

export default CaptainHome;
