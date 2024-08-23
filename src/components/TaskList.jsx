import React from "react";
import TaskItem from "./TaskItem"; // Import the TaskItem component

const TaskList = ({
  incompleteTasks, // Prop to receive incomplete tasks
  completedTasks, // Prop to receive completed tasks
  onDeleteTask, // Prop to receive deleteTask function
  onEditTask, // Prop to receive editTask function
  onToggleTaskCompletion, // Prop to receive toggleTaskCompletion function
  onOpenModal, // Prop to receive openModal function
  tasksDueRef, // Prop to receive ref for tasks due section
  pastDueTasksRef, // Prop to receive ref for past due tasks section
  completedTasksRef, // Prop to receive ref for completed tasks section
}) => {
  // Helper function to set time of a date object to midnight
  const setToMidnight = (date) => {
    const newDate = new Date(date);
    newDate.setHours(0, 0, 0, 0);
    return newDate;
  };

  // Filter tasks into tasks due, past due, and completed
  const tasksDueTasks = incompleteTasks
    .filter((task) => {
      const taskDate = setToMidnight(new Date(task.taskdate));
      const today = setToMidnight(new Date());
      return taskDate >= today; // Include today's tasks in upcoming
    })
    .sort((a, b) => {
      const aDate = setToMidnight(new Date(a.taskdate));
      const bDate = setToMidnight(new Date(b.taskdate));
      const today = setToMidnight(new Date());

      if (aDate.getTime() === today.getTime()) return -1; // 'a' is today, move it up
      if (bDate.getTime() === today.getTime()) return 1;  // 'b' is today, move it up
      return aDate - bDate; // Otherwise, sort by date
    });

  const pastDueTasks = incompleteTasks.filter((task) => {
    const taskDate = setToMidnight(new Date(task.taskdate));
    const today = setToMidnight(new Date());
    return taskDate < today;
  });

  return (
    <div className="w-full h-min p-6">
      {/* Tasks Due Section */}
      <div
        ref={tasksDueRef} // Attach the ref to the tasks due section
        className="border-2 border-gray-200 p-6 rounded-2xl mb-6"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Upcoming</h2>
        </div>
        <div className="space-y-4">
          {tasksDueTasks.map((task) => (
            <TaskItem
              key={task.id} // Use task.id as the unique key
              task={task} // Pass the task object to TaskItem
              onDelete={onDeleteTask} // Pass the deleteTask function to TaskItem
              onEdit={onEditTask} // Pass the editTask function to TaskItem
              onToggleCompletion={onToggleTaskCompletion} // Pass the toggleTaskCompletion function to TaskItem
              onOpenModal={onOpenModal} // Pass the openModal function to TaskItem
            />
          ))}
          {tasksDueTasks.length === 0 && <p>No tasks due available.</p>}{" "}
          {/* Display a message if there are no tasks due */}
        </div>
      </div>
      {/* Past Due Tasks Section */}
      <div
        ref={pastDueTasksRef} // Attach the ref to the past due tasks section
        className="border-2 border-gray-200 p-6 rounded-2xl mb-6"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Past Due</h2>
        </div>
        <div className="space-y-4">
          {pastDueTasks.map((task) => (
            <TaskItem
              key={task.id} // Use task.id as the unique key
              task={task} // Pass the task object to TaskItem
              onDelete={onDeleteTask} // Pass the deleteTask function to TaskItem
              onEdit={onEditTask} // Pass the editTask function to TaskItem
              onToggleCompletion={onToggleTaskCompletion} // Pass the toggleTaskCompletion function to TaskItem
              onOpenModal={onOpenModal} // Pass the openModal function to TaskItem
            />
          ))}
          {pastDueTasks.length === 0 && <p>No past due tasks available.</p>}{" "}
          {/* Display a message if there are no past due tasks */}
        </div>
      </div>
      {/* Completed Tasks Section */}
      <div
        ref={completedTasksRef} // Attach the ref to the past due tasks section
        className="border-2 border-gray-200 p-6 rounded-2xl mb-6"
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
          {completedTasks.length === 0 && <p>No Completed tasks available.</p>}{" "}
          {/* Display a message if there are no past due tasks */}
        </div>
      </div>
    </div>
  );
};

export default TaskList; // Export the TaskList component
