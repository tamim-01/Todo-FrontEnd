import React from "react";
import { Trash2, PenSquare } from "lucide-react";

const TaskItem = ({ task, onDelete, onEdit }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow flex items-center justify-between">
      <div>
        <h3 className="font-semibold">{task.title}</h3>
        <p className="text-sm text-gray-500">{task.description}</p>
      </div>
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          className="form-checkbox h-5 w-5 text-blue-600"
        />
        <button
          className="text-red-500 hover:text-red-700"
          onClick={() => onDelete(task.id)}
        >
          <Trash2 size={18} />
        </button>
        <button
          className="text-blue-500 hover:text-blue-700"
          onClick={() => onEdit(task.id)}
        >
          <PenSquare size={18} />
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
