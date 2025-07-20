import React, { useState } from "react";
import { Link } from "react-router-dom";

const UserLogin = () => {
  const [email,setemail] = useState('');
  const [password,setpassword] = useState('');
  const [userData, setUserData] = useState({});


  const submitHandler = (e) => {
    e.preventDefault();
    setUserData({
      email: email,
      password: password
    });
    setemail('');
    setpassword('');
  }
  
  return (
    <div className="p-7 h-screen flex flex-col justify-between">
    <div>
        <img className='w-16 mb-10' src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png" alt='Uber logo'/>
      <form onSubmit={(e)=>{submitHandler(e)}} className="flex flex-col">
        <h3 className="text-lg font-medium mb-2">What's your email</h3>
        <input
          required
          value={email}
          onChange={(e) => setemail(e.target.value)}
          type="email"
          placeholder="test@example.com"
          className="bg-[#eeeeee] mb-7 rounded px-4 py-2 w-full border text-lg placeholder:text-base"
        />
        <h3 className="text-lg font-medium mb-2">Enter Password</h3>
        <input  required
          type="password"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
          placeholder="test@example.com"
         className="bg-[#eeeeee] mb-7 rounded px-4 py-2 w-full border text-lg placeholder:text-base" />
        <button className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base">
          Login
        </button>
         <p className="text-center">New here?
         <Link to='/user-signup' className="text-blue-600">Create new Account</Link>
          </p>      
      </form>
    </div>

    <div>
       <Link to='/captain-login' className="flex items-center justify-center bg-[#10b461] text-white font-semibold mb-7 rounded px-4 py-2 w-full text-lg placeholder:text-base">Sign in as Captain</Link>
    </div>
    </div>
  );
};

export default UserLogin;
