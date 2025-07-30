import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";

const CaptainSignUp = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [vehicleColor, setVehicleColor] = useState("");
  const [vehiclePlate, setVehiclePlate] = useState("");
  const [vehicleCapacity, setVehicleCapacity] = useState("");
  const [vehicleType, setVehicleType] = useState("");

  const { captain, setCaptain } = useContext(CaptainDataContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    const newCaptain = {
      email: email,
      password: password,
      fullname: {
        firstname: firstName,
        lastname: lastName,
      },
      vehicle:{
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType: vehicleType,
      }
    };

    console.log(newCaptain);
    

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/captains/register`,
      newCaptain
    );
    if (response.status === 201) {
      setCaptain(response.data.captain);
      localStorage.setItem("token", response.data.token);
      console.log("Captain registered successfully");
      navigate("/captain-home");
    }

    setemail("");
    setpassword("");
    setFirstName("");
    setLastName("");
    setVehicleColor("");
    setVehiclePlate("");  
    setVehicleCapacity("");
    setVehicleType("");
  };

  return (
    <div className="h-screen w-full flex flex-col items-center bg-white">
      <div className="flex-1 w-full max-w-md flex flex-col items-center bg-white shadow-lg rounded-lg px-7 py-3 overflow-y-auto">
        <img
          className="w-16 mb-10"
          src="https://pngimg.com/d/uber_PNG24.png"
          alt="Uber logo"
        />
        <form
          onSubmit={(e) => {
            submitHandler(e);
          }}
          className="flex flex-col w-full"
        >
          <h3 className="text-lg font-medium mb-2">
            What's our Captain's name
          </h3>
          <div className="flex gap-4 mb-6">
            <input
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              type="text"
              placeholder="First Name"
              className="w-1/2 bg-[#eeeeee] rounded px-4 py-2 border text-lg placeholder:text-base"
            />

            <input
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              type="text"
              placeholder="Last Name"
              className="w-1/2 bg-[#eeeeee] rounded px-4 py-2 border text-lg placeholder:text-base"
            />
          </div>
          <h3 className="text-lg font-medium mb-2">What's your email</h3>
          <input
            required
            value={email}
            onChange={(e) => setemail(e.target.value)}
            type="email"
            placeholder="test@example.com"
            className="bg-[#eeeeee] mb-6 rounded px-4 py-2 w-full border text-lg placeholder:text-base"
          />
          <h3 className="text-lg font-medium mb-2">Enter Password</h3>
          <input
            required
            type="password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            placeholder="test@example.com"
            className="bg-[#eeeeee] mb-6 rounded px-4 py-2 w-full border text-lg placeholder:text-base"
          />
          <div className="flex gap-4 mb-6">
            <div className="w-1/2">
              <h3 className="text-lg font-medium mb-2">Vehicle Color</h3>
              <input
                required
                value={vehicleColor}
                onChange={(e) => setVehicleColor(e.target.value)}
                type="text"
                placeholder="e.g. White"
                className="bg-[#eeeeee] rounded px-4 py-2 w-full border text-lg placeholder:text-base"
              />
            </div>
            <div className="w-1/2">
              <h3 className="text-lg font-medium mb-2">Vehicle Plate</h3>
              <input
                required
                value={vehiclePlate}
                onChange={(e) => setVehiclePlate(e.target.value)}
                type="text"
                placeholder="e.g. MH12AB1234"
                className="bg-[#eeeeee] rounded px-4 py-2 w-full border text-lg placeholder:text-base"
              />
            </div>
          </div>
          <div className="flex gap-4 mb-6">
            <div className="w-1/2">
              <h3 className="text-lg font-medium mb-2">Vehicle Capacity</h3>
              <input
                required
                value={vehicleCapacity}
                onChange={(e) => setVehicleCapacity(e.target.value)}
                type="number"
                min="1"
                placeholder="e.g. 4"
                className="bg-[#eeeeee] rounded px-4 py-2 w-full border text-lg placeholder:text-base"
              />
            </div>
            <div className="w-1/2">
              <h3 className="text-lg font-medium mb-2">Vehicle Type</h3>
              <select
                required
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value)}
                className="bg-[#eeeeee] rounded px-4 py-2 w-full border text-lg placeholder:text-base appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{
                  WebkitAppearance: "none",
                  MozAppearance: "none",
                  appearance: "none",
                }}
              >
                <option value="" disabled>
                  Select vehicle type
                </option>
                <option value="car">Car</option>
                <option value="motorcycle">Motorcycle</option>
                <option value="auto">Auto</option>
              </select>
            </div>
          </div>
          <button className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base">
            Sign up
          </button>
          <p className="text-center">
            Already have an account?
            <Link to="/captain-login" className="text-blue-600 ml-1">
              Login
            </Link>
          </p>
        </form>

        <div className="w-full max-w-md mt-6 mb-2">
          <p className="text-sm text-center">
            By proceeding, you consent to get mails from Uber and agree to our
            <span className="text-blue-600"> Terms of Service</span>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CaptainSignUp;
