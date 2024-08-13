import React, { useState } from "react";
import Header from "../components/HomePage_Header";
import TaskList from "../components/TaskList";

const TaskManager = () => {
  const [tasks, setTasks] = useState([
    {
      id: 13,
      user_id: 14,
      title: "new task",
      description: "random text",
      taskdate: "2024-07-11T20:30:00.000Z",
      is_completed: false,
    },
    {
      id: 14,
      user_id: 14,
      title: "test",
      description: "random text",
      taskdate: "2024-07-11T20:30:00.000Z",
      is_completed: false,
    },
    {
      id: 15,
      user_id: 14,
      title: "Task 15",
      description: "Random text 15",
      taskdate: "2024-07-11T20:30:00.000Z",
      is_completed: false,
    },
    {
      id: 16,
      user_id: 14,
      title: "Task 16",
      description: "Random text 16",
      taskdate: "2024-07-12T20:30:00.000Z",
      is_completed: false,
    },
    {
      id: 17,
      user_id: 14,
      title: "Task 17",
      description: "Random text 17",
      taskdate: "2024-07-13T20:30:00.000Z",
      is_completed: false,
    },
    {
      id: 18,
      user_id: 14,
      title: "Task 18",
      description: "Random text 18",
      taskdate: "2024-07-14T20:30:00.000Z",
      is_completed: false,
    },
    {
      id: 19,
      user_id: 14,
      title: "Task 19",
      description: "Random text 19",
      taskdate: "2024-07-15T20:30:00.000Z",
      is_completed: false,
    },
    {
      id: 20,
      user_id: 14,
      title: "Task 20",
      description: "Random text 20",
      taskdate: "2024-07-16T20:30:00.000Z",
      is_completed: false,
    },
    {
      id: 21,
      user_id: 14,
      title: "Task 21",
      description: "Random text 21",
      taskdate: "2024-07-17T20:30:00.000Z",
      is_completed: false,
    },
    {
      id: 22,
      user_id: 14,
      title: "Task 22",
      description: "Random text 22",
      taskdate: "2024-07-18T20:30:00.000Z",
      is_completed: false,
    },
    {
      id: 23,
      user_id: 14,
      title: "Task 23",
      description: "Random text 23",
      taskdate: "2024-07-19T20:30:00.000Z",
      is_completed: false,
    },
    {
      id: 24,
      user_id: 14,
      title: "Task 24",
      description: "Random text 24",
      taskdate: "2024-07-20T20:30:00.000Z",
      is_completed: false,
    },
    {
      id: 25,
      user_id: 14,
      title: "Task 25",
      description: "Random text 25",
      taskdate: "2024-07-21T20:30:00.000Z",
      is_completed: false,
    },
    {
      id: 26,
      user_id: 14,
      title: "Task 26",
      description: "Random text 26",
      taskdate: "2024-07-22T20:30:00.000Z",
      is_completed: false,
    },
    {
      id: 27,
      user_id: 14,
      title: "Task 27",
      description: "Random text 27",
      taskdate: "2024-07-23T20:30:00.000Z",
      is_completed: false,
    },
    {
      id: 28,
      user_id: 14,
      title: "Task 28",
      description: "Random text 28",
      taskdate: "2024-07-24T20:30:00.000Z",
      is_completed: false,
    },
    {
      id: 29,
      user_id: 14,
      title: "Task 29",
      description: "Random text 29",
      taskdate: "2024-07-25T20:30:00.000Z",
      is_completed: false,
    },
    {
      id: 30,
      user_id: 14,
      title: "Task 30",
      description: "Random text 30",
      taskdate: "2024-07-26T20:30:00.000Z",
      is_completed: false,
    },
    {
      id: 31,
      user_id: 14,
      title: "Task 31",
      description: "Random text 31",
      taskdate: "2024-07-27T20:30:00.000Z",
      is_completed: false,
    },
    {
      id: 32,
      user_id: 14,
      title: "Task 32",
      description: "Random text 32",
      taskdate: "2024-07-28T20:30:00.000Z",
      is_completed: false,
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

  const toggleTaskCompletion = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, is_completed: !task.is_completed } : task
      )
    );
    console.log("Edit task clicked for id:", id); // Log when checkbox is toggled
  };

  return (
    <div>
      <Header />
      <div className="flex h-full bg-gray-100">
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
          onToggleTaskCompletion={toggleTaskCompletion} // Pass the new function
        />
      </div>
    </div>
  );
};

export default TaskManager;
