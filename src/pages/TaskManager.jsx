import React, { useState } from "react";
import Header from "../components/HomePage_Header";
import TaskList from "../components/TaskList";

const TaskManager = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Design weekly report",
      description: "Discussion about the design schema with teammate",
    },
    {
      id: 2,
      title: "Implement new feature",
      description: "Start working on the new authentication system",
    },
    {
      id: 3,
      title: "Review pull requests",
      description: "Go through open PRs and provide feedback",
    },
    {
      id: 4,
      title: "Plan sprint meeting",
      description: "Prepare agenda for the upcoming sprint planning",
    },
    {
      id: 5,
      title: "Update documentation",
      description: "Review and update project documentation",
    },
  ]);

  const addTask = () => {
    // Implement add task functionality
    console.log("Add task clicked");
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const editTask = (id) => {
    // Implement edit task functionality
    console.log("Edit task clicked for id:", id);
  };

  return (
    <div>
      <Header />
      <div className="flex h-screen bg-gray-100">
        <div className="w-1/4 m-6 mr-0 border-2xl border-gray-200">
          <button
            onClick={addTask}
            className="w-full bg-blue-500 text-white py-3 rounded-xl hover:bg-blue-600 transition-colors text-lg"
          >
            Add Task
          </button>
        </div>
        <TaskList
          tasks={tasks}
          onDeleteTask={deleteTask}
          onEditTask={editTask}
        />
      </div>
    </div>
  );
};

export default TaskManager;
