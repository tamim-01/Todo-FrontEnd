import ProfileNav from "./ProfileNav";
import { useEffect ,useState } from "react";
import { jwtDecode } from "jwt-decode";
export default function Header() {
  const [avatar , setAvatar] = useState('');

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        // Decode the JWT to get the payload
        const decodedToken = jwtDecode(token);
        console.log(decodedToken);
        setAvatar(decodedToken.avatar)
        

   
      } catch (error) {
        console.error("Invalid token:", error);
      }
    } else {
      console.log("No token found");
    }
  }, []);
  return (
    <header className="flex justify-between items-center pt-4 pb-4 px-12 text-lg  mb-32 border-b-2">
      <div className="flex flex-row items-center">
        <img src="./logo.png" className="h-12" />
        <p className="font-bold text-xl ml-2">Task Manager</p>
      </div>
      <ProfileNav editeProfile={true} profileImage={avatar} />
      
    </header>
  );
}
