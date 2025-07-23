
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { UserDataContext } from "../context/UserContext";
import axios from "axios";


const UserSignUp = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const navigate = useNavigate();

  const ans = useContext(UserDataContext);
  const {user,setUser} = useContext(UserDataContext);

  const CreateAccountHandler = async (e) => {
    e.preventDefault();
    
    const newUser = {
      email: email,
      password: password,
      fullname: {
        firstname: firstName,
        lastname: lastName,
      },
    };

    console.log(newUser);


    const response = await  axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser);

    if(response.status===201)
    { 
      setUser(response.data.user);
      localStorage.setItem('token', response.data.token);
      console.log("User registered successfully");
      navigate('/home');
    }

    setemail("");
    setpassword("");
    setFirstName("");
    setLastName("");


  };

  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img
          className="w-16 mb-10"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png"
          alt="Uber logo"
        />
        <form
          onSubmit={(e) => {
            submitHandler(e);
          }}
          className="flex flex-col"
        >
          <h3 className="text-lg font-medium mb-2">What's your name</h3>
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
          <button onClick={CreateAccountHandler} className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base">
           Create account
          </button>
          <p className="text-center">
            Already have an account?
            <Link to="/user-login" className="text-blue-600 ml-1">
             Login
            </Link>
          </p>
        </form>
      </div>

      <div>
        <p className="text-sm">
          By proceeding, you consent to get mails from Uber and agree to our
          <span className="text-blue-600"> Terms of Service</span>{" "}
        </p>
      </div>
    </div>
  );
};

export default UserSignUp;
