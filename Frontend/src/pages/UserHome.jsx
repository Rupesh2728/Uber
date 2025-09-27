import React, { useContext, useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import LocationSearchPanel from "../components/locationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmRide from "../components/ConfirmRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingforDriver from "../components/WaitingforDriver";
import axios from "axios";
import { SocketContext } from "../context/SocketContext";
import { UserDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import UserRiding from "./UserRiding";
import LiveTracking from "../components/LiveTracking";

const UserHome = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const [inputType, setInputType] = useState("");
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const VehiclePanelRef = useRef(null);
  const [confrimRidePanel, setconfrimRidePanel] = useState(false);
  const confrimRidePanelRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const waitingforDriverRef = useRef(null);
  const RidingRef = useRef(null);

  const [fare, setFare] = useState({});
  const [vehicleType, setVehicleType] = useState(null);
  const [rideDetails, setRideDetails] = useState(null);
  const [Riding, setRiding] = useState(false);

  const { sendMessage, receiveMessage, socket } = useContext(SocketContext);
  const { user } = useContext(UserDataContext);

  const navigate = useNavigate();

  useEffect(() => {
    sendMessage("join", {
      userType: "user",
      userId: user._id,
    });
  });
  const [vehicleFound, setVehicleFound] = useState(false);
  const [Waitingfordriver, setWaitingfordriver] = useState(false);

  const panelRef = useRef(null);

  const findTrip = async () => {
    setPanelOpen(false);
    setVehiclePanel(true);

    const token = localStorage.getItem("token");
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/rides/get-fare`,
      {
        params: {
          pickup,
          destination,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setFare(response.data);
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    await findTrip();
  };

  const createRide = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/rides/create`,
      {
        pickup,
        destination,
        vehicleType,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(response.data);
  };

  useGSAP(() => {
    gsap.to(panelRef.current, {
      height: panelOpen ? "70%" : "0%",
      duration: 0.5,
      ease: "power3.out",
    });
  }, [panelOpen]);

  useGSAP(() => {
    gsap.to(VehiclePanelRef.current, {
      transform: vehiclePanel ? "translateY(0%)" : "translateY(100%)",
    });
  }, [vehiclePanel]);

  useGSAP(() => {
    gsap.to(confrimRidePanelRef.current, {
      y: confrimRidePanel ? 0 : "100%",
      duration: 0.5,
      ease: "power3.out",
    });
  }, [confrimRidePanel]);

  useGSAP(() => {
    gsap.to(vehicleFoundRef.current, {
      y: vehicleFound ? 0 : "100%",
      duration: 0.5,
      ease: "power3.out",
    });
  }, [vehicleFound]);

  useGSAP(() => {
    gsap.to(waitingforDriverRef.current, {
      transform: Waitingfordriver ? "translateY(0%)" : "translateY(100%)",
    });
  }, [Waitingfordriver]);

  useGSAP(() => {
    gsap.to(RidingRef.current, {
      transform: Riding ? "translateY(0%)" : "translateY(100%)",
    });
  }, [Riding]);

  useEffect(() => {
    receiveMessage("confirm-ride", (data) => {
      console.log("Ride Confirmed by the Captain, Details are : ", data);
      setRideDetails(data);
      setWaitingfordriver(true);
      setVehicleFound(false);
    });
  }, []);

  useEffect(() => {
    receiveMessage("ride-started", (data) => {
      console.log("Ride started by the Captain, Details are : ", data);
      setRiding(true);
      setWaitingfordriver(false);
    });
  }, []);

  return (
    <div className="h-screen relative overflow-hidden">
      <img
        className="w-20 fixed left-5 top-5  drop-shadow-lg rounded-xl p-2 z-1"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png"
        alt="Uber logo"
      />
      <div className="w-screen h-screen">
        <LiveTracking />
      </div>

      {!vehiclePanel && !confrimRidePanel && (
        <div className=" absolute top-0 h-screen flex flex-col justify-end w-full">
          <div className="h-[30%] bg-white p-5 pb-0 border-none outline-none ">
            <h4 className="text-2xl font-semibold">Find a Trip</h4>
            {panelOpen && (
              <h5
                className="absolute right-5 top-5 text-[1.5rem]"
                onClick={() => setPanelOpen(false)}
              >
                <i className="ri-arrow-down-line"></i>
              </h5>
            )}
            <form className="relative">
              <div className="line absolute h-12 w-1 top-[33%] left-[1.2rem] bg-gray-900 rounded-full"></div>
              <div className="flex flex-row bg-[#eee] rounded-lg text-base w-full items-center mt-5">
                <i className="ri-circle-line ml-3"></i>
                <input
                  required
                  type="text"
                  onClick={() => {
                    setPanelOpen(true);
                    setInputType("pickup");
                  }}
                  onChange={(e) => {
                    setPickup(e.target.value);
                    setSearchInput(e.target.value);
                  }}
                  value={pickup}
                  placeholder="Add your pickup location"
                  className="border-0 outline-none px-3 py-4 bg-[#eee] rounded-lg text-base w-full placeholder:text-md"
                />
              </div>
              <div className="flex flex-row bg-[#eee] rounded-lg text-base w-full items-center mt-5 ">
                <i className="ri-square-fill ml-3"></i>
                <input
                  required
                  type="text"
                  onClick={() => {
                    setPanelOpen(true);
                    setInputType("destination");
                  }}
                  onChange={(e) => {
                    setDestination(e.target.value);
                    setSearchInput(e.target.value);
                  }}
                  value={destination}
                  placeholder="Enter your destination"
                  className="border-0 outline-none px-3 py-4 bg-[#eee] rounded-lg text-base w-full placeholder:text-md"
                />
              </div>
            </form>

            {panelOpen &&
              (pickup && destination ? (
                <button
                  onClick={submitHandler}
                  className="flex items-center justify-center w-full bg-black text-white py-3 rounded mt-5"
                >
                  Find Trip
                </button>
              ) : (
                <button
                  disabled
                  className="flex items-center justify-center w-full bg-black text-white py-3 rounded mt-5"
                >
                  Find Trip
                </button>
              ))}
          </div>

          <div ref={panelRef} className="h-0 bg-white border-none outline-none">
            <LocationSearchPanel
              inputType={inputType}
              setPickup={setPickup}
              setDestination={setDestination}
              searchInput={searchInput}
            />
          </div>
        </div>
      )}
      <div
        ref={VehiclePanelRef}
        className="fixed z-10 bottom-0 translate-y-full bg-white p-3 w-full"
      >
        <VehiclePanel
          selectVehicle={setVehicleType}
          fare={fare}
          setconfrimRidePanel={setconfrimRidePanel}
          setVehiclePanel={setVehiclePanel}
        />
      </div>

      <div
        ref={confrimRidePanelRef}
        style={{ transform: "translateY(100%)" }}
        className="fixed z-10 bottom-0 bg-white p-3 w-full"
      >
        <ConfirmRide
          pickup={pickup}
          destination={destination}
          createRide={createRide}
          fare={fare}
          vehicleType={vehicleType}
          setconfrimRidePanel={setconfrimRidePanel}
          setVehicleFound={setVehicleFound}
        />
      </div>

      <div
        ref={vehicleFoundRef}
        style={{ transform: "translateY(100%)" }}
        className="fixed z-10 bottom-0 bg-white p-3 w-full"
      >
        <LookingForDriver
          setVehicleFound={setVehicleFound}
          pickup={pickup}
          destination={destination}
          fare={fare}
          vehicleType={vehicleType}
        />
      </div>

      <div
        ref={waitingforDriverRef}
        className="fixed z-10 bottom-0 bg-white p-3 w-full"
      >
        <WaitingforDriver rideDetails={rideDetails} />
      </div>

      <div ref={RidingRef} className="fixed z-10 bottom-0 bg-white w-full">
        {Riding && <UserRiding rideDetails={rideDetails} />}
      </div>
    </div>
  );
};

export default UserHome;
