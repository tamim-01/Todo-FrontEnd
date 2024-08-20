import React from "react";
import TaskItem from "./TaskItem";

const TaskList = ({
  incompleteTasks,
  completedTasks,
  onDeleteTask,
  onEditTask,
  onToggleTaskCompletion,
  upcomingTasksRef,
  completedTasksRef,
}) => {
  return (
    <div className="w-3/4 h-min m-6">
      {/* Incomplete Tasks Section */}
      <div
        ref={upcomingTasksRef}
        className="border-2 border-gray-200 p-6 rounded-2xl mb-6"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Today</h2>
        </div>
        <div className="space-y-4">
          {incompleteTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onDelete={onDeleteTask}
              onEdit={onEditTask}
              onToggleCompletion={onToggleTaskCompletion}
            />
          ))}
          {incompleteTasks.length === 0 && <p>No upcoming tasks available.</p>}{" "}
          {/* Message for no upcoming tasks */}
        </div>
      </div>
      {/* Completed Tasks Section */}
      {completedTasks.length > 0 && (
        <div
          ref={completedTasksRef}
          className="border-2 border-gray-200 p-6 rounded-2xl"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Completed Tasks</h2>
          </div>
          <div className="space-y-4">
            {completedTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onDelete={onDeleteTask}
                onEdit={onEditTask}
                onToggleCompletion={onToggleTaskCompletion}
              />
            ))}
          </div>
        </div>
      )}
      {completedTasks.length === 0 && (
        <p className="text-xl ml-7">No completed tasks available.</p>
      )}
    </div>
  );
};

export default TaskList;
