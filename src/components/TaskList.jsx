import React from "react";
import TaskItem from "./TaskItem";

const TaskList = ({
  tasks,
  onDeleteTask,
  onEditTask,
  onToggleTaskCompletion,
}) => {
  return (
    <div className="w-3/4 h-min p-6 m-6 border-2 rounded-2xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Today</h2>
      </div>
      <div className="space-y-4">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onDelete={onDeleteTask}
            onEdit={onEditTask}
            onToggleCompletion={onToggleTaskCompletion} // Pass the new prop
          />
        ))}
      </div>
    </div>
  );
};

export default TaskList;
