import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import RidePopUp from '../components/RidePopUp'
import CaptainDetails from '../components/CaptainDetails'
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ConfirmRidePopUp from '../components/ConfirmRidePopUp';

const CaptainHome = () => {
  
  const [ridePopupPanel,setridePopupPanel] = useState(true);
  const [confirmridePopupPanel,setconfirmridePopupPanel] = useState(false);
  const ridePopupPanelRef = React.useRef(null);
  const confirmridePopupPanelRef = React.useRef(null);

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
  
  return (
      <div className='h-screen'>
    
    <div className='fixed p-6 top-0 flex justify-between items-center w-screen'>
      <img className='w-16' src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png" alt="" />
      <Link to='/captain-home' className='h-10 w-10 bg-white flex items-center justify-center rounded-full'>
        <i className="text-lg font-medium ri-logout-box-r-line"></i>
    </Link>
    </div>
    
    <div className='h-3/5'>
         <img
          alt="maps image"
          className="h-full w-full object-cover"
          src="https://i.pinimg.com/736x/d2/1b/e0/d21be0368da4fcfa395092c0ad839fbc.jpg"
        />
    </div>

    <div className='h-2/5 p-6'>
       <CaptainDetails/>
    </div>

     <div ref={ridePopupPanelRef}
        className="fixed z-10 bottom-0 translate-y-full bg-white p-3 w-full"
      >
        <RidePopUp setconfirmridePopupPanel={setconfirmridePopupPanel} setridePopupPanel={setridePopupPanel}/>
      </div>

       <div ref={confirmridePopupPanelRef}
        className="fixed z-10 bottom-0 translate-y-full bg-white p-3 w-full h-screen"
      >
        <ConfirmRidePopUp setconfirmridePopupPanel={setconfirmridePopupPanel} setridePopupPanel={setridePopupPanel}/>
      </div>
   </div>
  )
}

export default CaptainHome  