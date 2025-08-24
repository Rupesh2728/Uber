import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import LocationSearchPanel from "../components/locationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmRide from "../components/ConfirmRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingforDriver from "../components/WaitingforDriver";

const UserHome = () => {
  const [pickup, setPickup] = useState();
  const [destination, setDestination] = useState();
  const [panelOpen, setPanelOpen] = useState(false);
  const [vechiclePanel, setVechiclePanel] = useState(false);
  const VehiclePanelRef = useRef(null);
  const [confrimRidePanel, setconfrimRidePanel] = useState(false);
  const confrimRidePanelRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const waitingforDriverRef = useRef(null);

  const [vehicleFound, setVehicleFound] = useState(false);
  const [Waitingfordriver,setWaitingfordriver] = useState(false);

  const panelRef = useRef(null);
  const submitHandler = (e) => {
    e.preventDefault();
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
      transform: vechiclePanel ? "translateY(0%)" : "translateY(100%)",
    });
  }, [vechiclePanel]);

  useGSAP(() => {
    gsap.to(confrimRidePanelRef.current, {
      transform: confrimRidePanel ? "translateY(0%)" : "translateY(100%)",
    });
  }, [confrimRidePanel]);

  useGSAP(() => {
    gsap.to(vehicleFoundRef.current, {
      transform: vehicleFound ? "translateY(0%)" : "translateY(100%)",
    });
  }, [vehicleFound]);

  useGSAP(() => {
    gsap.to(waitingforDriverRef.current, {
      transform: Waitingfordriver ? "translateY(0%)" : "translateY(100%)",
    });
  }, [Waitingfordriver]);


  return (
    <div className="h-screen relative overflow-hidden">
      <img
        className="w-16 absolute left-5 top-5"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png"
        alt="Uber logo"
      />
      <div className="w-screen h-screen">
        <img
          alt="maps image"
          className="h-full w-full object-cover"
          src="https://i.pinimg.com/736x/d2/1b/e0/d21be0368da4fcfa395092c0ad839fbc.jpg"
        />
      </div>

      {!vechiclePanel && !confrimRidePanel && (
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
            <form onSubmit={(e) => submitHandler(e)} className="relative">
              <div className="line absolute h-12 w-1 top-[33%] left-[1.2rem] bg-gray-900 rounded-full"></div>
              <div className="flex flex-row bg-[#eee] rounded-lg text-base w-full items-center mt-5">
                <i className="ri-circle-line ml-3"></i>
                <input
                  type="text"
                  onClick={() => setPanelOpen(true)}
                  onChange={(e) => setPickup(e.target.value)}
                  value={pickup}
                  placeholder="Add your pickup location"
                  className="border-0 outline-none px-3 py-4 bg-[#eee] rounded-lg text-base w-full placeholder:text-md"
                />
              </div>
              <div className="flex flex-row bg-[#eee] rounded-lg text-base w-full items-center mt-5 ">
                <i className="ri-square-fill ml-3"></i>
                <input
                  type="text"
                  onClick={() => setPanelOpen(true)}
                  onChange={(e) => setDestination(e.target.value)}
                  value={destination}
                  placeholder="Enter your destination"
                  className="border-0 outline-none px-3 py-4 bg-[#eee] rounded-lg text-base w-full placeholder:text-md"
                />
              </div>
            </form>
          </div>

          <div ref={panelRef} className="h-0 bg-white border-none outline-none">
            <LocationSearchPanel
              setPanelOpen={setPanelOpen}
              setVechiclePanel={setVechiclePanel}
            />
          </div>
        </div>
      )}
      <div
        ref={VehiclePanelRef}
        className="fixed z-10 bottom-0 translate-y-full bg-white p-3 w-full"
      >
        <VehiclePanel setPanelOpen={setPanelOpen} setconfrimRidePanel={setconfrimRidePanel} setVechiclePanel={setVechiclePanel} />
      </div>

      <div
        ref={confrimRidePanelRef}
        className="fixed z-10 bottom-0 translate-y-full bg-white p-3 w-full"
      >
        <ConfirmRide setconfrimRidePanel={setconfrimRidePanel} setVehicleFound={setVehicleFound} />
      </div>


       <div ref={vehicleFoundRef}
        className="fixed z-10 bottom-0 translate-y-full bg-white p-3 w-full"
      >
        <LookingForDriver setVehicleFound={setVehicleFound}/>
      </div>

       <div ref={waitingforDriverRef}
        className="fixed z-10 bottom-0 bg-white p-3 w-full"
      >
         <WaitingforDriver/>
      </div>
    </div>
  );
};

export default UserHome;
