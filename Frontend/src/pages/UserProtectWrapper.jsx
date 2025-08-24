
import axios from 'axios';
import { useContext, useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { UserDataContext } from '../context/UserContext';
const UserProtectWrapper = ({children}) => {
  
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [isLoading, setIsLoading] = useState(true);
    const {user, setUser} = useContext(UserDataContext);
    
    useEffect(()=>{
       if(!token) {
        navigate('/user-login');
    }
    },[token,navigate]);

     axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`,{
        headers:{
            Authorization : `Bearer ${token}`
        }
    }).then((response) => {
        if(response.status === 200){
           setUser(response.data.user);
           setIsLoading(false);
           navigate('/user-home');
        }
        
    }).catch((error) => {
        console.log("Error fetching user profile for token verification:", error);
        localStorage.removeItem('token');
        setUser(null);
        navigate('/user-login');
    })

    if(isLoading) {
        return <div>Loading...</div>; 
    }

    return (
    <>
    {children}
    </>
  )
}

export default UserProtectWrapper