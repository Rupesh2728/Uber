import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserLogout = () => {
   
         const navigate = useNavigate();
   
        const token = localStorage.getItem('token');
        const response =axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`,{
            headers: {
                authorization: `Bearer ${token}`
            }
}).then((response) => {
    if(response.status === 200) {
        console.log("User logged out successfully");
        localStorage.removeItem('token');
        navigate('/user-login');
    } else {
        console.error("Logout failed");
    }
})
  
 
    return (
    <div>Logout</div>
  )
}

export default UserLogout