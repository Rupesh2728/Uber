import React, { useState } from 'react'
import { Link } from 'react-router-dom';


const CaptainLogin = () => {
   const [email,setemail] = useState('');
  const [password,setpassword] = useState('');
  const [captainData, setcaptainData] = useState({});


  const submitHandler = (e) => {
    e.preventDefault();
    setcaptainData({
      email: email,
      password: password
    });
    setemail('');
    setpassword('');
  }
  
  return (
    <div className="p-7 h-screen flex flex-col justify-between">
    <div>
        <img className='w-16 mb-3' src="https://pngimg.com/d/uber_PNG24.png" alt='Uber logo'/>
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
         <p className="text-center">Join a fleet?
         <Link to='/captain-signup' className="text-blue-600 ml-1">Register as a Captain</Link>
          </p>      
      </form>
    </div>

    <div>
       <Link to='/user-login' className="flex items-center justify-center bg-[#d5622d] text-white font-semibold mb-7 rounded px-4 py-2 w-full text-lg placeholder:text-base">Sign in as User</Link>
    </div>
    </div>
  );
}

export default CaptainLogin