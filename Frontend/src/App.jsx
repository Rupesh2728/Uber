import { Route, Routes } from 'react-router-dom';
import UserLogin from './pages/UserLogin';
import CaptainLogin from './pages/CaptainLogin';
import UserSignUp from './pages/UserSignUp';
import CaptainSignUp from './pages/CaptainSignUp';
import LandingPage from './pages/LandingPage';
import Home from './pages/Home';
import UserProtectWrapper from './pages/UserProtectWrapper';

const App = () => {
  return (
    <div>
       <Routes>
           <Route path='/' element={<LandingPage/>} />
           <Route path='/user-login' element={<UserLogin/>} />
           <Route path='/user-signup' element={<UserSignUp/>} />
           <Route path='/captain-login' element={<CaptainLogin/>} />
           <Route path='/captain-signup' element={<CaptainSignUp/>} />
           <Route path='/home' element={<UserProtectWrapper><Home/></UserProtectWrapper>} />
       </Routes>
    </div>
  )
}

export default App