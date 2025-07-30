import { Route, Routes } from 'react-router-dom';
import UserLogin from './pages/UserLogin';
import CaptainLogin from './pages/CaptainLogin';
import UserSignUp from './pages/UserSignUp';
import CaptainSignUp from './pages/CaptainSignUp';
import LandingPage from './pages/LandingPage';
import UserHome from './pages/UserHome';
import UserProtectWrapper from './pages/UserProtectWrapper';
import UserLogout from './pages/UserLogout';
import CaptainHome from './pages/CaptainHome';
import CaptainProtectWrapper from './pages/CaptainProtectWrapper';
import CaptainLogout from './pages/CaptainLogout';

const App = () => {
  return (
    <div>
       <Routes>
           <Route path='/' element={<LandingPage/>} />
           <Route path='/user-login' element={<UserLogin/>} />
           <Route path='/user-signup' element={<UserSignUp/>} />
           <Route path='/captain-login' element={<CaptainLogin/>} />
           <Route path='/captain-signup' element={<CaptainSignUp/>} />
           <Route path='/user-home' element={<UserProtectWrapper><UserHome/></UserProtectWrapper>} />
           <Route path='/user-logout' element={<UserLogout/>} />
           <Route path='/captain-home' element={<CaptainProtectWrapper><CaptainHome/></CaptainProtectWrapper>} />
             <Route path='/captain-logout' element={<CaptainLogout/>} />
       </Routes>
    </div>
  )
}

export default App