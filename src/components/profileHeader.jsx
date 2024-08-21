import { useNavigate } from "react-router-dom";

export default function ProfileHeader() {
  const navigate = useNavigate();
  return (
    <header className="flex justify-between items-center pt-4 pb-4 px-12 text-lg  mb-32 border-b-2">
      <div className="flex flex-row items-center">
        <img src="./logo.png" className="h-12" />
        <p className="font-bold text-xl ml-2">Task Manager</p>
      </div>
      
      <button
        className="bg-red-500 text-white text-base h-8 px-5 rounded-lg"
        onClick={() => {
          navigate("/");
          localStorage.clear();
         
        }}
      >
       Log Out
      </button>
    </header>
  );
}
