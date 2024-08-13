import React from "react";
import { Trash2, PenSquare } from "lucide-react";

const TaskItem = ({ task, onDelete, onEdit, onToggleCompletion }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow flex items-center justify-between">
      <div>
        <h3 className="font-medium text-xl mb-1">{task.title}</h3>
        <p className="text-lg text-gray-500">{task.description}</p>
      </div>
      <div className="flex items-center gap-2">
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
