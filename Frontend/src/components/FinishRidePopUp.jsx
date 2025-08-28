import React from "react";
import { Link } from "react-router-dom";
const FinishRidePopUp = ({ setfinishRidePanel }) => {
  return (
    <div className="h-screen">
      <div className="mt-2 flex justify-between">
        <h3 className=" mt-5 text-[1.3rem] font-semibold mb-5 items-center">
          Finish this Ride
        </h3>
        <h4
          onClick={() => {
            setfinishRidePanel(false);
          }}
          className="mt-5 cursor-pointer"
        >
          {" "}
          <i className="ri-arrow-down-line text-[1.5rem]"></i>
        </h4>
      </div>

      <div className="mt-2 flex items-center justify-between p-3 bg-yellow-300 rounded-lg">
        <div className="flex items-center justify-start gap-3">
          <img
            className="h-10 w-10 rounded-full object-cover"
            src="https://media.istockphoto.com/id/2006436002/video/happy-confident-and-portrait-of-indian-man-in-office-with-creative-professional-at-tech.jpg?s=640x640&k=20&c=vcKAWd0sGJpV3xR0AK1RCM7zTEpFUcBhQEXbNvN1M78="
            alt=""
          />
          <h2 className="text-lg font-medium">Mani Kumar</h2>
        </div>
        <h5 className="text-lg font-semibold">1.2 Miles</h5>
      </div>

      <div className="flex gap-5 flex-col justify-between items-center">
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
              <p className="text-sm text-gray-600 ">Cash</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <Link
          to="/captain-home"
          className="w-full flex justify-center mt-5 bg-green-600 text-lg text-white font-semibold p-3 rounded-lg"
        >
          Finish Ride
        </Link>

        <p className=" mt-10 txt-xs">Click on finish ride button if you have completed payment.</p>

      </div>
    </div>
  );
};

export default FinishRidePopUp;
