import React, { useState, useEffect } from "react";
import Header from "../components/header";
import { DayPicker, getDefaultClassNames } from "react-day-picker";
import { useLocation } from "react-router-dom"; // Import useLocation

import "react-day-picker/style.css";

const Edittask = () => {
  const location = useLocation(); // Get the location object
  const { task } = location.state || {}; // Retrieve the task data from state

  const [selected, setSelected] = useState(
    task ? new Date(task.taskdate) : new Date()
  );
  const [title, setTitle] = useState(task ? task.title : "");
  const [description, setDescription] = useState(task ? task.description : "");

  const defaultClassNames = getDefaultClassNames();

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    const taskdate = formatDate(selected); // Use the correct key here

    try {
      const response = await fetch(
        `http://localhost:3000/api/tasks/${task.id}`,
        {
          method: "PUT", // Use PUT to update the task
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ title, description, taskdate }), // Ensure key is 'taskdate'
        }
      );

      if (response.ok) {
        console.log("Task updated successfully");
        // Clear the form fields or redirect as needed
      } else {
        console.error("Error updating task:", response.statusText);
      }
    } catch (error) {
      console.error("Network error:", error);
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
                  placeholder="Write a title"
                  className="w-full p-3 border rounded bg-gray-100 text-lg sm:text-xl font-medium"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 sm:mb-3 text-xl sm:text-2xl font-medium">
                  Description
                </label>
                <textarea
                  placeholder="Add Description"
                  className="w-full p-3 border rounded bg-gray-100 h-24 sm:h-32 text-lg sm:text-xl font-medium"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
            </div>
            <div className="flex-1 flex justify-center items-center">
              <DayPicker
                mode="single"
                selected={selected}
                onSelect={setSelected}
                classNames={{
                  today: `border-amber-500`,
                  selected: `bg-blue-500 border-amber-500 text-white rounded-xl`,
                  root: `${defaultClassNames.root} shadow-[0_2px_14px_-1px_rgb(3,3,3,0.1)] p-4 sm:p-7 rounded-2xl`,
                  chevron: `${defaultClassNames.chevron} fill-amber-500`,
                  day: `${defaultClassNames.day} text-sm sm:text-base `,
                }}
              />
            </div>
          </div>
          <div className="mt-8 sm:mt-10 flex justify-center">
            <button
              onClick={handleSubmit}
              className="bg-blue-500 text-white px-4 py-3 rounded-lg w-full sm:w-2/3 text-lg"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edittask;
