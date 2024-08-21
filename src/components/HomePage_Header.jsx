import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="flex justify-between items-center pt-4 pb-4 px-12 text-lg border-b-2">
      <div className="flex flex-row items-center">
        <img src="/logo.png" alt="Logo" className="h-12" />
        <p className="font-bold text-xl ml-2">Task Manager</p>
      </div>
      <button
        className="bg-red-500 text-white text-base p-2 px-5 rounded-lg"
        onClick={() => {
          navigate("/EditProfile");
         
        }}
      >
        edit profile
      </button>
      
    </header>
  );
};

export default Header;
