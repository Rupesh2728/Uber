import React,{useState,useRef} from "react";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import FinishRidePopUp from "../components/FinishRidePopUp";

const CaptainRiding = () => {

  const [finishRidePanel,setfinishRidePanel] = useState(false);
  const finishRidePanelRef = useRef(null);

    useGSAP(() => {
    gsap.to(finishRidePanelRef.current, {
      transform: finishRidePanel ? "translateY(0%)" : "translateY(100%)",
    });
  }, [finishRidePanel]);
  
  return (
    <div className="h-screen">

      <div className="fixed p-6 top-0 flex justify-between items-center w-screen">
        <img
          className="w-16"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png"
          alt=""
        />
        <Link
          to="/captain-home"
          className="h-10 w-10 bg-white flex items-center justify-center rounded-full"
        >
          <i className="text-lg font-medium ri-logout-box-r-line"></i>
        </Link>
      </div>

      <div className="h-5/6">
        <img
          alt="maps image"
          className="h-full w-full object-cover"
          src="https://i.pinimg.com/736x/d2/1b/e0/d21be0368da4fcfa395092c0ad839fbc.jpg"
        />
      </div>

      <div onClick={()=>{
        setfinishRidePanel(true);
      }} className="h-1/6 p-1 bg-yellow-400">
       <div className="flex justify-center">
         <h4 className="cursor-pointer">
        {" "}
        <i className="ri-arrow-up-wide-line text-[1.5rem]"></i>
      </h4>
       </div>
        <div className="flex items-center justify-between p-2">
            <h4 className="text-xl font-semibold">2 Miles away</h4>
        <button className="bg-green-600 text-white font-semibold p-2 px-4 rounded-lg">
          Complete Ride
        </button>
        </div>
      </div>

      <div ref={finishRidePanelRef}
        className="fixed z-10 bottom-0 translate-y-full bg-white p-3 w-full"
      >
        <FinishRidePopUp setfinishRidePanel={setfinishRidePanel}/>
      </div>

    </div>
  );
};

export default CaptainRiding;
