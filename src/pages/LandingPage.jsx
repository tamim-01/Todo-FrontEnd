import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';

const LandingPage = () => {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <header className="bg-white shadow-md p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="flex flex-row items-center">
                        <img src="./logo.png" alt="Task Manager Logo" className="h-12" />
                        <p className="font-bold text-xl ml-2">Task Manager</p>
                    </div>
                    <nav className="hidden md:flex flex-row space-x-4">
                        <button onClick={() => navigate("/SignupPage")} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full hover:bg-indigo-700 transition duration-300">
                            Sign Up
                        </button>
                        <button onClick={() => navigate("/SigninPage")} className="bg-white text-indigo-600 px-6 py-2 rounded-full border border-indigo-600 hover:bg-indigo-50 transition duration-300">
                            Sign In
                        </button>
                    </nav>
                    <div className="md:hidden">
                        <button onClick={toggleMenu} className="text-indigo-600 focus:outline-none">
                            <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                <path d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
                            </svg>
                        </button>
                    </div>
                </div>
                {isMenuOpen && (
                    <div className="md:hidden mt-4 space-y-2">
                        <button onClick={() => {
                            navigate("/SignupPage");
                            toggleMenu();
                        }} className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition duration-300">
                            Sign Up
                        </button>
                        <button onClick={() => {
                            navigate("/SigninPage");
                            toggleMenu();
                        }} className="block w-full text-center bg-white text-indigo-600 px-4 py-2 rounded-full border border-indigo-600 hover:bg-indigo-50 transition duration-300">
                            Sign In
                        </button>
                    </div>
                )}
            </header>

            <main className="flex-grow container mx-auto px-4 py-16 text-center">
                <h1 className="text-5xl font-extrabold text-indigo-900 mb-6">Welcome to TaskManager</h1>
                <p className="text-xl text-indigo-700 mb-8 max-w-2xl mx-auto">
                    Boost your productivity and organize your life with ease.
                </p>
                <div className="mb-8  text-left max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
                <div className="inline-block mt-3 ml-2 w-6 h-6 border-2 border-indigo-600 rounded-md transition-all duration-200 ease-in-out transform hover:scale-110 hover:bg-indigo-600 hover:border-transparent"></div>
                <div className='inline-block m-2'> <TypeAnimation

                        sequence={[
                            'Buy groceries',
                            1000,
                            'Call mom',
                            1000,
                            'Finish project',
                            1000,
                            'Go to gym',
                            1000,
                           'Walk the dog',
                            1000,
                            "Prepare presentation",
                            500,
                            "Schedule dentist appointment",
                            500
                        ]}
                        wrapper="div"
                        cursor={true}
                        repeat={Infinity}
                        style={{ fontSize: '1.5em', display: 'inline-block' }}
                    /></div>
                   
                    
                </div>
                <button onClick={() => navigate("/SignupPage")} className="bg-green-500 text-white px-8 py-3 rounded-full text-xl font-semibold my-4 hover:bg-green-600 transition duration-300 shadow-lg">
                    Get Started
                </button>
                <div className="mt-12 grid md:grid-cols-3 gap-8 text-left">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold text-indigo-700 mb-2">Organize Tasks</h3>
                        <p className="text-gray-600">Efficiently manage and prioritize your daily tasks.</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold text-indigo-700 mb-2">Track Progress</h3>
                        <p className="text-gray-600">Monitor your progress and celebrate your achievements.</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold text-indigo-700 mb-2">Collaborate</h3>
                        <p className="text-gray-600">Share tasks and work together with your team.</p>
                    </div>
                </div>
            </main>

            <footer className="bg-blue-600 hover:bg-blue-700 text-white py-8">
                <div className="container mx-auto text-center">
                    <p>© 2024 TaskManager. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;