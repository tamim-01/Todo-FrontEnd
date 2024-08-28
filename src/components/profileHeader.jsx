import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import ProfileNav from "./ProfileNav";
export default function ProfileHeader() {
  const navigate = useNavigate();
  const [userdata , setUserdata] = useState([]);


  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        // Decode the JWT to get the payload
        const decodedToken = jwtDecode(token);
     
        setUserdata(decodedToken)
        //  const usernameJwt = decodedToken.username
        //  return usernameJwt ;
       
        
   
      } catch (error) {
        console.error("Invalid token:", error);
      }
    } else {
      console.log("No token found");
    }
  }, []);
  return (
    <header className="flex justify-between items-center pt-4 pb-4 px-12 text-lg  mb-32 border-b-2">
      <div onClick={()=>{
        navigate("/")
      }} className="flex flex-row items-center">
        <img src="./logo.png" className="h-12" />
        <p className="font-bold text-xl ml-2">Task Manager</p>
      </div>
      
      <ProfileNav profileImage={userdata.avatar}  username={userdata.username} />
    </header>
  );
}
