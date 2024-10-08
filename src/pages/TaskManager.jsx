import React, { useState, useEffect, useRef } from "react"; // Import necessary React hooks
import Header from "../components/HomePage_Header"; // Import the header component
import TaskList from "../components/TaskList"; // Import the task list component
import TaskModal from "../components/Taskmodal"; // Import the task modal component
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import config from "../config/index.js";
import { ArrowUp } from "lucide-react";
const TaskManager = () => {
  // State to hold the list of tasks
  const [tasks, setTasks] = useState([]);

  // Refs to scroll to upcoming and completed tasks sections
  const tasksDueRef = useRef(null);
  const pastDueTasksRef = useRef(null);
  const completedTasksRef = useRef(null);

  // State to hold the selected task for the modal
  const [selectedTask, setSelectedTask] = useState(null);

  // State to control the visibility of the modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // State to track the active button
  const [activeButton, setActiveButton] = useState(null);

  // Effect to fetch tasks from the API on component mount
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("token"); // Get the token from local storage

        // Fetch tasks from the API
        const response = await fetch(`${config.apiBaseUrl}/api/tasks`, {
          method: "GET", // Use GET method
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include token in the request header
          },
        });

        // Check if the response is OK (status code 200-299)
        if (response.ok) {
          const data = await response.json(); // Parse the JSON response
          console.log(data); // Log the fetched data
          setTasks(data); // Update the tasks state with the fetched data
        } else {
          const errorData = await response.json(); // Parse error response
          console.error("Error fetching tasks:", errorData.message); // Log the error message
        }
      } catch (error) {
        console.error("Error fetching tasks:", error); // Log any fetch errors
      }
    };

    fetchTasks(); // Call the fetch function
  }, []); // Empty dependency array means this effect runs once when the component mounts

  // Filter tasks into incomplete and completed categories
  const incompleteTasks = tasks.filter((task) => !task.is_completed);
  const completedTasks = tasks.filter((task) => task.is_completed);

  const navigate = useNavigate(); // Initialize the navigate function for navigation

  // Function to navigate to the Add Task page
  const addTask = () => {
    console.log("Add task clicked");
    navigate("/Addtaskpage"); // Navigate to the Add Task page
  };

  // Function to delete a task by ID
  const deleteTask = async (id) => {
    try {
      const token = localStorage.getItem("token"); // Get the token from local storage
      const response = await fetch(`${config.apiBaseUrl}/api/tasks/${id}`, {
        method: "DELETE", // Use DELETE method
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include token in the request header
        },
      });

      // Check if the response is OK
      if (response.ok) {
        const data = await response.json(); // Parse the JSON response
        console.log(data); // Log the response data
        setTasks(tasks.filter((task) => task.id !== id)); // Update tasks state to remove the deleted task
      } else {
        const errorData = await response.json(); // Parse error response
        console.error("Error deleting task:", errorData.message); // Log the error message
      }
    } catch (error) {
      console.error("Error fetching tasks:", error); // Log any fetch errors
    }
  };

  // Function to navigate to the Edit Task page
  const editTask = (id) => {
    const taskToEdit = tasks.find((task) => task.id === id); // Find the task to edit
    navigate("/Edittask", { state: { task: taskToEdit } }); // Navigate to the Edit Task page with the task data
    console.log("Edit task clicked for id:", id); // Log the edit action
  };

  // Function to toggle the completion status of a task
  const toggleTaskCompletion = async (id) => {
    try {
      const token = localStorage.getItem("token"); // Get the token from local storage
      const response = await fetch(`${config.apiBaseUrl}/api/tasks/${id}`, {
        method: "PUT", // Use PUT method to update the task
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include token in the request header
        },
        body: JSON.stringify({
          is_completed: !tasks.find((task) => task.id === id).is_completed, // Toggle the completion status
        }),
      });

      // Check if the response is OK
      if (response.ok) {
        const data = await response.json(); // Parse the JSON response
        console.log(data); // Log the response data
        setTasks(
          tasks.map(
            (task) =>
              task.id === id
                ? { ...task, is_completed: !task.is_completed } // Update the task with the toggled status
                : task // Return the unchanged task
          )
        );
      } else {
        const errorData = await response.json(); // Parse error response
        console.error("Error checking the task completed:", errorData.message); // Log the error message
      }
    } catch (error) {
      console.error("Error fetching tasks:", error); // Log any fetch errors
    }

    console.log("Toggle task completion for id:", id); // Log the toggle action
  };

  // Function to scroll to a specific section
  const scrollToSection = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" }); // Smoothly scroll to the upcoming tasks section
    } else {
      console.warn("Section does not exist."); // Log a warning if the section does not exist
    }
  };

  // Function to open the modal with the selected task
  const openModal = (task) => {
    setSelectedTask(task); // Set the selected task
    setIsModalOpen(true); // Open the modal
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
    setSelectedTask(null); // Reset the selected task
  };

  // Function to handle button clicks
  const handleButtonClick = (buttonId) => {
    setActiveButton(buttonId); // Set the active button
  };

  return (
    <div className="flex flex-col  ">
    
     
      <Header />
      <div className="flex p-6 flex-col lg:flex-row ">
       
            <div className="flex flex-row justify-center fixed bottom-2 right-2"> <button
             onClick={() => {
              handleButtonClick("tasksDue"); // Set active button
              scrollToSection(tasksDueRef); // Scroll to Tasks Due
            }} 
              className=" bg-blue-500 mx-2  text-white p-1 rounded-xl hover:bg-blue-600 transition-colors mb-4 text-lg"
            >
              <ArrowUp size={"20px"}/>
            </button>
            <button
              onClick={addTask} // Call addTask when clicked
              className=" w-40 bg-blue-500 text-white py-2 rounded-xl hover:bg-blue-600 transition-colors mb-4 text-lg"
            >
              Add Task
            </button>
           
            </div>
            
        <div className="w-full flex flex-col  gap-4 border-2xl border-gray-200 lg:w-1/4 lg:p-0 lg:m-6">
          <div className="flex flex-row lg:flex-col">
            
            <button
              onClick={() => {
                handleButtonClick("tasksDue"); // Set active button
                scrollToSection(tasksDueRef); // Scroll to Tasks Due
              }}
              className={`w-full py-2 rounded-xl   hover:bg-gray-300 transition-colors text-left text-center text-sm mb-2 border-2${
                activeButton === "tasksDue" ? " bg-gray-300" : ""
              }`}
            >
             Upcoming
            </button>
            <button
              onClick={() => {
                handleButtonClick("pastDue"); // Set active button
                scrollToSection(pastDueTasksRef); // Scroll to Past Due
              }}
              className={`w-full py-2 rounded-xl   hover:bg-gray-300 transition-colors text-left text-center text-sm mb-2 border-2${
                activeButton === "pastDue" ? " bg-gray-300" : ""
              }`}
            >
              Past Due
            </button>
            <button
              onClick={() => {
                handleButtonClick("completedTasks"); // Set active button
                scrollToSection(completedTasksRef); // Scroll to Completed Tasks
              }}
              className={`w-full py-2 rounded-xl   hover:bg-gray-300 transition-colors text-left text-center text-sm mb-2 border-2${
                activeButton === "completedTasks" ? " bg-gray-300" : ""
              }`}
            >
              Completed
            </button>
          </div>
        </div>
        <TaskList
          incompleteTasks={incompleteTasks} // Pass incomplete tasks to TaskList
          completedTasks={completedTasks} // Pass completed tasks to TaskList
          onDeleteTask={deleteTask} // Pass deleteTask function to TaskList
          onEditTask={editTask} // Pass editTask function to TaskList
          onToggleTaskCompletion={toggleTaskCompletion} // Pass toggleTaskCompletion function to TaskList
          onOpenModal={openModal} // Pass openModal function to TaskList
          tasksDueRef={tasksDueRef}
          pastDueTasksRef={pastDueTasksRef}
          completedTasksRef={completedTasksRef}
        />
      </div>
      <TaskModal
        isOpen={isModalOpen} // Pass modal open state
        onClose={closeModal} // Pass closeModal function
        task={selectedTask} // Pass selected task to the modal
      />{" "}
      {/* Render the modal */}
    </div>
  );
};

export default TaskManager; // Export the TaskManager component
