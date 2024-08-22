import React from "react"; // Import React

const TaskModal = ({ isOpen, onClose, task }) => {
  // If the modal is not open or no task is provided, return null (do not render anything)
  if (!isOpen || !task) return null;

  // Function to calculate the days until the task date
  const getDaysLeft = (taskDate) => {
    const today = new Date(); // Get the current date
    const taskDate2 = new Date(taskDate); // Convert the task date to a Date object
    const timeDiff = taskDate2.getTime() - today.getTime(); // Calculate the time difference in milliseconds
    const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24)); // Convert milliseconds to days

    return daysLeft; // Return the number of days left
  };

  const daysLeft = getDaysLeft(task.taskdate); // Calculate days left for the current task

  // Format the task date to a local date string
  const formattedDate = new Date(task.taskdate).toLocaleDateString();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-10">
      {/* Modal background with a semi-transparent black overlay */}
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-3xl w-full">
        {/* Modal content container */}
        <h2 className="text-4xl font-bold mb-4">{task.title}</h2>{" "}
        {/* Task title */}
        <p className="text-gray-700 text-2xl mb-4">{task.description}</p>{" "}
        {/* Task description */}
        <p className="text-gray-600 text-lg mb-2">
          Due Date: {formattedDate}
        </p>{" "}
        {/* Formatted due date */}
        <p className="text-gray-600 text-lg mb-4">
          Days Until Due: {daysLeft}
        </p>{" "}
        {/* Days until due */}
        <button
          onClick={onClose} // Call onClose function when the button is clicked
          className="bg-blue-500 text-white py-2 px-4 w-full rounded-lg"
        >
          Close {/* Button text */}
        </button>
      </div>
    </div>
  );
};

export default TaskModal; // Export the TaskModal component
