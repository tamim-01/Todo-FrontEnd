import React from "react";
import TaskItem from "./TaskItem"; // Import the TaskItem component

const TaskList = ({
  incompleteTasks, // Prop to receive incomplete tasks
  completedTasks, // Prop to receive completed tasks
  onDeleteTask, // Prop to receive deleteTask function
  onEditTask, // Prop to receive editTask function
  onToggleTaskCompletion, // Prop to receive toggleTaskCompletion function
  onOpenModal, // Prop to receive openModal function
  upcomingTasksRef, // Prop to receive ref for upcoming tasks section
  completedTasksRef, // Prop to receive ref for completed tasks section
}) => {
  return (
    <div className="w-3/4 h-min m-6">
      {/* Incomplete Tasks Section */}
      <div
        ref={upcomingTasksRef} // Attach the ref to the upcoming tasks section
        className="border-2 border-gray-200 p-6 rounded-2xl mb-6"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Today</h2>
        </div>
        <div className="space-y-4">
          {incompleteTasks.map((task) => (
            <TaskItem
              key={task.id} // Use task.id as the unique key
              task={task} // Pass the task object to TaskItem
              onDelete={onDeleteTask} // Pass the deleteTask function to TaskItem
              onEdit={onEditTask} // Pass the editTask function to TaskItem
              onToggleCompletion={onToggleTaskCompletion} // Pass the toggleTaskCompletion function to TaskItem
              onOpenModal={onOpenModal} // Pass the openModal function to TaskItem
            />
          ))}
          {incompleteTasks.length === 0 && <p>No upcoming tasks available.</p>}{" "}
          {/* Display a message if there are no upcoming tasks */}
        </div>
      </div>
      {/* Completed Tasks Section */}
      {completedTasks.length > 0 && (
        <div
          ref={completedTasksRef} // Attach the ref to the completed tasks section
          className="border-2 border-gray-200 p-6 rounded-2xl"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Completed Tasks</h2>
          </div>
          <div className="space-y-4">
            {completedTasks.map((task) => (
              <TaskItem
                key={task.id} // Use task.id as the unique key
                task={task} // Pass the task object to TaskItem
                onDelete={onDeleteTask} // Pass the deleteTask function to TaskItem
                onEdit={onEditTask} // Pass the editTask function to TaskItem
                onToggleCompletion={onToggleTaskCompletion} // Pass the toggleTaskCompletion function to TaskItem
                onOpenModal={onOpenModal} // Pass the openModal function to TaskItem
              />
            ))}
          </div>
        </div>
      )}
      {completedTasks.length === 0 && (
        <p className="text-xl ml-7">No completed tasks available.</p>
      )}{" "}
      {/* Display a message if there are no completed tasks */}
    </div>
  );
};

export default TaskList; // Export the TaskList component
