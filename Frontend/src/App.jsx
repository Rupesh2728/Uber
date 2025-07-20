import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import UserLogin from './pages/UserLogin';
import CaptainLogin from './pages/CaptainLogin';
import UserSignUp from './pages/UserSignUp';
import CaptainSignUp from './pages/CaptainSignUp';

const App = () => {
  return (
    <div>
       <Routes>
           <Route path='/' element={<Home/>} />
           <Route path='/user-login' element={<UserLogin/>} />
           <Route path='/user-signup' element={<UserSignUp/>} />
           <Route path='/captain-login' element={<CaptainLogin/>} />
           <Route path='/captain-signup' element={<CaptainSignUp/>} />
       </Routes>
    </div>
  )
}

export default App