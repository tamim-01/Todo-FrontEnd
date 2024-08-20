import React from "react";
import { Trash2, PenSquare } from "lucide-react";

const TaskItem = ({ task, onDelete, onEdit, onToggleCompletion }) => {
  // Function to calculate the days until the task date
  const getDaysLeft = (taskDate) => {
    const today = new Date();
    const taskDate2 = new Date(taskDate);
    const timeDiff = taskDate2.getTime() - today.getTime();
    const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));

    return daysLeft;
  };

  // Function to get the display text based on the task date
  const getDisplayText = (taskDate) => {
    const daysLeft = getDaysLeft(taskDate);
    if (daysLeft > 0) {
      return `${daysLeft} day${daysLeft !== 1 ? "s" : ""} left`;
    } else if (daysLeft === 0) {
      return "Today";
    } else {
      return `${Math.abs(daysLeft)} day${
        Math.abs(daysLeft) !== 1 ? "s" : ""
      } passed`;
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow flex items-center justify-between">
      <div>
        <h3 className="font-medium text-xl mb-1">{task.title}</h3>
        <p className="text-lg text-gray-500">{task.description}</p>
      </div>
      <div className="flex items-center gap-2">
        <p>{getDisplayText(task.taskdate)}</p>
        <input
          type="checkbox"
          checked={task.is_completed}
          onChange={() => onToggleCompletion(task.id)} // Call the prop function
          className="my-auto w-5 h-5 rounded-3xl"
        />
        <button
          className="text-blue-500 hover:text-blue-700 "
          onClick={() => onEdit(task.id)}
        >
          <PenSquare size={24} />
        </button>{" "}
        <button
          className="text-red-500 hover:text-red-700 -ml-0.5"
          onClick={() => onDelete(task.id)}
        >
          <Trash2 size={24} />
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
