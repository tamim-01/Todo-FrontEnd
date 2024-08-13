import React from "react";

const Header = () => {
  return (
    <header className="flex justify-between items-center pt-4 pb-4 px-12 text-lg border-b-2">
      <div className="flex flex-row items-center">
        <img src="/logo.png" alt="Logo" className="h-12" />
        <p className="font-bold text-xl ml-2">Task Manager</p>
      </div>
      <img src="/logo.png" alt="React Logo" className="h-12" />
    </header>
  );
};

export default Header;
