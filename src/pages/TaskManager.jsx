import React, { useState, useEffect, useRef } from "react";
import Header from "../components/HomePage_Header";
import TaskList from "../components/TaskList";
import { json, useNavigate } from "react-router-dom"; // Import useNavigate

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const upcomingTasksRef = useRef(null); // Ref for upcoming tasks section
  const completedTasksRef = useRef(null); // Ref for completed tasks section

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("token");
        const username = "user18"; // Username to be passed as a query parameter
        const response = await fetch(
          `http://localhost:3000/api/tasks?username=${username}`,
          {
            method: "GET", // Use GET method
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setTasks(data);
        } else {
          const errorData = await response.json();
          console.error("Error fetching tasks:", errorData.message); // Log the error message from the server
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  const incompleteTasks = tasks.filter((task) => !task.is_completed);
  const completedTasks = tasks.filter((task) => task.is_completed);

  const navigate = useNavigate();

  const addTask = () => {
    console.log("Add task clicked");
    navigate("/Addtaskpage");
  };

  const deleteTask = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:3000/api/tasks/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setTasks(tasks.filter((task) => task.id !== id));
      } else {
        const errorData = await response.json();
        console.error("Error deleting task:", errorData.message); // Log the error message from the server
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const editTask = (id) => {
    const taskToEdit = tasks.find((task) => task.id === id);
    navigate("/Edittask", { state: { task: taskToEdit } });
    console.log("Edit task clicked for id:", id);
  };

  const toggleTaskCompletion = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:3000/api/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          is_completed: !tasks.find((task) => task.id === id).is_completed, // Toggle the completion status
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setTasks(
          tasks.map((task) =>
            task.id === id
              ? { ...task, is_completed: !task.is_completed } // Update the task with the toggled status
              : task
          )
        );
      } else {
        const errorData = await response.json();
        console.error("Error checking the task completed:", errorData.message); // Log the error message from the server
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }

    console.log("Toggle task completion for id:", id);
  };

  const scrollToUpcomingTasks = () => {
    if (upcomingTasksRef.current) {
      upcomingTasksRef.current.scrollIntoView({ behavior: "smooth" });
    } else {
      console.warn("Upcoming tasks section does not exist.");
    }
  };

  const scrollToCompletedTasks = () => {
    if (completedTasksRef.current) {
      completedTasksRef.current.scrollIntoView({ behavior: "smooth" });
    } else {
      console.warn("Completed tasks section does not exist.");
    }
  };

  return (
    <div>
      <Header />
      <div className="flex h-full bg-gray-50">
        <div className="w-1/4 flex flex-col gap-4 m-6 mr-0 border-2xl border-gray-200">
          <button
            onClick={addTask}
            className="w-full bg-blue-500 text-white py-3 rounded-xl hover:bg-blue-600 transition-colors text-lg"
          >
            Add Task
          </button>
          <button
            onClick={scrollToUpcomingTasks} // Scroll to upcoming tasks
            className="w-full bg-blue-500 text-white py-3 rounded-xl hover:bg-blue-600 transition-colors text-lg"
          >
            Upcoming
          </button>
          <button
            onClick={scrollToCompletedTasks} // Scroll to completed tasks
            className="w-full bg-blue-500 text-white py-3 rounded-xl hover:bg-blue-600 transition-colors text-lg"
          >
            Completed Tasks
          </button>
        </div>
        <TaskList
          incompleteTasks={incompleteTasks}
          completedTasks={completedTasks}
          onDeleteTask={deleteTask}
          onEditTask={editTask}
          onToggleTaskCompletion={toggleTaskCompletion}
          upcomingTasksRef={upcomingTasksRef}
          completedTasksRef={completedTasksRef}
        />
      </div>
    </div>
  );
};

export default TaskManager;
