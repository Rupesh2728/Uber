import axios from 'axios';
import { useContext, useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { CaptainDataContext } from '../context/CaptainContext';
const CaptainProtectWrapper = ({children}) => {
   const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [isLoading, setIsLoading] = useState(true);
    const { captain, setCaptain } = useContext(CaptainDataContext);
    
    useEffect(()=>{
       if(!token) {
        navigate('/captain-login');
    }
    },[token,navigate]);

    axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`,{
        headers:{
            Authorization : `Bearer ${token}`
        }
    }).then((response) => {
        if(response.status === 200){
           setCaptain(response.data.captain);
           setIsLoading(false);
           navigate('/captain-home');
        }
       
    }).catch((error) => {
        console.log("Error fetching Captain profile for token verification:", error);
        localStorage.removeItem('token');
        setCaptain(null);
        navigate('/captain-login');
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

export default CaptainProtectWrapper