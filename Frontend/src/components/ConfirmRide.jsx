import React from "react";

const ConfirmRide = ({setconfrimRidePanel,setVehicleFound}) => {
  return (
    <div>
      <div className="flex justify-between">
        <h3 className="text-[1.5rem] font-semibold mb-5 items-center">
          Confirm your Ride
        </h3>
        <h4
          onClick={() => {
            setconfrimRidePanel(false);
          }}
        >
          {" "}
          <i className="ri-arrow-down-line text-[1.5rem]"></i>
        </h4>
      </div>

      <div className="flex gap-5 flex-col justify-between items-center">
        <img
          alt="img"
          className="h-[7rem]"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1712027307/assets/42/eb85c3-e2dc-4e95-a70d-22ee4f08015f/original/Screenshot-2024-04-01-at-9.08.07p.m..png"
        />
        <div className="w-full mt-2">

          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="text-xl ri-map-pin-range-fill"></i>
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm text-gray-600 ">
                Raghu gardens Road, Vijayawada
              </p>
            </div>
          </div>

           <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="text-lg ri-square-fill"></i>
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm text-gray-600 ">
                Raghu gardens Road, Vijayawada
              </p>
            </div>
          </div>

          <div className="flex items-center gap-5 p-3 ">
            <i className="text-xl ri-currency-line"></i>
            <div>
              <h3 className="text-lg font-medium">$8.70</h3>
              <p className="text-sm text-gray-600 ">
                Cash
              </p>
            </div>
          </div>

        </div>
      </div>
      <button onClick={()=>{setVehicleFound(true);setconfrimRidePanel(false)}} className="w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg">
        Confirm
      </button>
    </div>
  );
};

export default ConfirmRide;
