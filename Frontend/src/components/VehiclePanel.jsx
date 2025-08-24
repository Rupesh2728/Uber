import React from 'react'

const VehiclePanel = ({setPanelOpen,setconfrimRidePanel,setVechiclePanel}) => {
  return (
    <>
       <div className="flex justify-between">
         <h3 className="text-2xl font-semibold mb-5">Choose a Vehicle</h3>

        <h4 onClick={()=>{
        setVechiclePanel(false);
      }}> <i className="ri-arrow-down-line text-[1.5rem]"></i></h4>
       </div>
        <div onClick={()=>{setconfrimRidePanel(true);setVechiclePanel(false)}} className="flex justify-between py-2 px-2 mt-2 active:border-black mb-2 border-2 rounded-xl w-full items-center ">
          <div className="flex">
            <img
            className="w-[6rem] h-[4rem]"
            src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1712027307/assets/42/eb85c3-e2dc-4e95-a70d-22ee4f08015f/original/Screenshot-2024-04-01-at-9.08.07p.m..png"
          />

          <div>
            <h4>
              <span className="text-xl font-medium">UberGo</span>
              <span className="px-1">
                <i className="ri-user-fill"></i>
              </span>
              4
            </h4>
            <h5 className="text-sm">
              <span className="text-sm font-medium">2 min away</span>
              <span>
                <i className="ri-stop-mini-fill"></i>
              </span>
              15:24
            </h5>
            <p className="text-gray-600 text-sm font-normal">
              Affordable, compact rides
            </p>
          </div>
          </div>

          <h2 className="text-xl font-semibold">$8.70</h2>
        </div>

          <div onClick={()=>{setconfrimRidePanel(true);setVechiclePanel(false)}} className="flex justify-between py-2 px-2 mt-3 active:border-black mb-2 border-2 rounded-xl w-full items-center ">
         <div className="flex">
           <img
            className="w-[6rem] h-[3.5rem]"
            src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png"
          />

          <div>
            <h4>
              <span className="text-xl font-medium">Moto</span>
              <span className="px-1">
                <i className="ri-user-fill"></i>
              </span>
              4
            </h4>
            <h5 className="text-sm">
              <span className="text-sm font-medium">2 min away</span>
              <span>
                <i className="ri-stop-mini-fill"></i>
              </span>
              15:24
            </h5>
            <p className="text-gray-600 text-sm font-normal">
              Affordable, compact rides
            </p>
          </div>
         </div>

          <h2 className="text-xl font-semibold">$8.70</h2>
        </div>
      </>
  )
}

export default VehiclePanel