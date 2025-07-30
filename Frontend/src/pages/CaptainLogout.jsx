import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CaptainLogout = () => {
    
    const navigate = useNavigate();

    const token = localStorage.getItem('token');
    axios.get(`${import.meta.env.VITE_BASE_URL}/captains/logout`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then((response) => {
        if (response.status === 200) {
            console.log("Captain logged out successfully");
            localStorage.removeItem('token');
            navigate('/captain-login');
        } else {
            console.error("Logout failed");
        }
    }).catch((error) => {
        console.error("Error during logout:", error);   
        localStorage.removeItem('token');
        navigate('/captain-login');
    });
  
    return (
    <div>CaptainLogout</div>
  )
}

export default CaptainLogout