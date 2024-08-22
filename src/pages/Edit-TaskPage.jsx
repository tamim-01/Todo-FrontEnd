import React, { useState, useEffect } from "react"; // Import React and necessary hooks
import Header from "../components/header"; // Import the Header component
import { DayPicker, getDefaultClassNames } from "react-day-picker"; // Import DayPicker for date selection
import { useLocation } from "react-router-dom"; // Import useLocation to access route state
import { useNavigate } from "react-router-dom";

import "react-day-picker/style.css"; // Import DayPicker styles

const Edittask = () => {
  const location = useLocation(); // Get the location object from the router
  const { task } = location.state || {}; // Retrieve the task data from the state, default to an empty object
  const navigate = useNavigate();

  // State to manage the selected date, title, and description
  const [selected, setSelected] = useState(
    task ? new Date(task.taskdate) : new Date() // Set selected date from task or default to today
  );
  const [title, setTitle] = useState(task ? task.title : ""); // Set title from task or default to empty
  const [description, setDescription] = useState(task ? task.description : ""); // Set description from task or default to empty

  const defaultClassNames = getDefaultClassNames(); // Get default class names for DayPicker

  // Function to format date to YYYY-MM-DD
  const formatDate = (date) => {
    const year = date.getFullYear(); // Get the full year
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Get month (zero-based) and pad with zero
    const day = String(date.getDate()).padStart(2, "0"); // Get day and pad with zero
    return `${year}-${month}-${day}`; // Return formatted date string
  };

  // Function to handle form submission
  const handleSubmit = async () => {
    const token = localStorage.getItem("token"); // Get the token from local storage
    const taskdate = formatDate(selected); // Format the selected date

    try {
      // Send a PUT request to update the task
      const response = await fetch(
        `http://localhost:3000/api/tasks/${task.id}`,
        {
          method: "PUT", // Use PUT method to update the task
          headers: {
            "Content-Type": "application/json", // Set content type to JSON
            Authorization: `Bearer ${token}`, // Include token in the request header
          },
          body: JSON.stringify({ title, description, taskdate }), // Send updated task data
        }
      );

      // Check if the response is OK
      if (response.ok) {
        console.log("Task updated successfully"); // Log success message
        // Clear the form fields or redirect as needed (not implemented here)
        navigate("/taskmanager");
      } else {
        console.error("Error updating task:", response.statusText); // Log error message
      }
    } catch (error) {
      console.error("Network error:", error); // Log network errors
    }
  };

  return (
    <div className="min-w-[320px]">
      <Header />
      <div className="max-w-7xl mx-auto mb-28 px-4 sm:px-6 md:px-8 lg:px-16">
        <div className="bg-white shadow-[0_2px_25px_5px_rgb(88,88,88,0.1)] rounded-2xl p-6 sm:p-8 md:p-12 lg:p-16">
          <div className="flex flex-col lg:flex-row gap-8 xl:gap-10">
            <div className="flex-1">
              <h2 className="text-2xl sm:text-3xl font-semibold mb-6 sm:mb-8 text-center">
                Edit a task
              </h2>
              <div className="mb-4">
                <label className="block mb-2 sm:mb-3 text-xl sm:text-2xl font-medium">
                  Title
                </label>
                <input
                  type="text"
                  placeholder="Write a title" // Placeholder text for the input
                  className="w-full p-3 border rounded bg-gray-100 text-lg sm:text-xl font-medium"
                  value={title} // Bind input value to title state
                  onChange={(e) => setTitle(e.target.value)} // Update title state on change
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 sm:mb-3 text-xl sm:text-2xl font-medium">
                  Description {/* Label for the description textarea */}
                </label>
                <textarea
                  placeholder="Add Description" // Placeholder text for the textarea
                  className="w-full p-3 border rounded bg-gray-100 h-24 sm:h-32 text-lg sm:text-xl font-medium"
                  value={description} // Bind textarea value to description state
                  onChange={(e) => setDescription(e.target.value)} // Update description state on change
                ></textarea>
              </div>
            </div>
            <div className="flex-1 flex justify-center items-center">
              <DayPicker
                mode="single" // Single date selection mode
                selected={selected} // Bind selected date to state
                onSelect={setSelected} // Update selected state on date selection
                classNames={{
                  today: `border-amber-500`, // Custom class for today's date
                  selected: `bg-blue-500 border-amber-500 text-white rounded-xl`, // Custom class for selected date
                  root: `${defaultClassNames.root} shadow-[0_2px_14px_-1px_rgb(3,3,3,0.1)] p-4 sm:p-7 rounded-2xl`, // Custom root class
                  chevron: `${defaultClassNames.chevron} fill-amber-500`, // Custom chevron class
                  day: `${defaultClassNames.day} text-sm sm:text-base`, // Custom class for day cells
                }}
              />
            </div>
          </div>
          <div className="mt-8 sm:mt-10 flex justify-center">
            <button
              onClick={handleSubmit} // Call handleSubmit when the button is clicked
              className="bg-blue-500 text-white px-4 py-3 rounded-lg w-full sm:w-2/3 text-lg"
            >
              Confirm {/* Button text */}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edittask;
