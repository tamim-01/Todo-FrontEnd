import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProfileNav = ({ profileImage, editeProfile, logout }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`relative ${isMobile ? 'flex flex-col items-end' : 'flex items-center'}`}>
      <div
        className="w-12 h-12 rounded-full overflow-hidden cursor-pointer z-10"
        onClick={toggleNav}
      >
        <img
          src={profileImage}
          alt="Profile"
          className="w-full h-full object-cover"
        />
      </div>
      <nav
        className={`
          ${isMobile ? 'absolute top-full mt-2 right-0' : 'absolute right-0 mr-2'}
          bg-white shadow-md transition-all duration-300 ease-in-out
          ${isMobile ? 'flex flex-col rounded-md' : 'flex items-center rounded-l-full'}
          ${isOpen 
            ? isMobile 
              ? 'max-h-40 opacity-100 p-3' 
              : `${editeProfile ? 'w-64' : 'w-32'} opacity-100 pl-3`
            : isMobile 
              ? 'max-h-0 opacity-0 p-0' 
              : 'w-0 opacity-0 pl-0'
          }
        `}
      >
        <ul className={`
          ${isMobile ? 'flex flex-col space-y-2' : 'flex space-x-4'}
          whitespace-nowrap overflow-hidden
        `}>
          
          <li
            onClick={() => {
              navigate("/SigninPage");
              localStorage.clear();
              setIsOpen(false);
            }}
            className="cursor-pointer py-1 text-red-500 hover:text-blue-500"
          >
            Log Out
          </li>
          {editeProfile && (
            <li
              onClick={() => {
                navigate("/EditProfile");
                setIsOpen(false);
              }}
              className="cursor-pointer  py-1 hover:text-blue-500"
            >
              Edit Profile
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default ProfileNav;