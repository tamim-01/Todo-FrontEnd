export default function Header() {
  return (
    <header className="flex justify-between items-center pt-4 pb-4 px-12 text-lg  mb-32 border-b-2">
      <div className="flex flex-row items-center">
        <img src="./logo.png" className="h-12" />
        <p className="font-bold text-xl ml-2">Task Manager</p>
      </div>
      <button className="bg-red-500 text-white text-base p-2 px-5 rounded-lg">
        Cancel
      </button>
    </header>
  );
}
