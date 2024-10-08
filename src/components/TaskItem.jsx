import React from "react"; // Import React
import { Trash2, PenSquare } from "lucide-react"; // Import icons from lucide-react

const TaskItem = ({
  task, // Prop to receive the task object
  onDelete, // Prop to receive the delete function
  onEdit, // Prop to receive the edit function
  onToggleCompletion, // Prop to receive the toggle completion function
  onOpenModal, // Prop to receive the open modal function
}) => {
  // Function to calculate the days until the task date
  const getDaysLeft = (taskDate) => {
    const today = new Date(); // Get the current date
    const taskDate2 = new Date(taskDate); // Convert task date to Date object
    const timeDiff = taskDate2.getTime() - today.getTime(); // Calculate the time difference
    const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24)); // Convert time difference to days

    return daysLeft; // Return the number of days left
  };

  // Function to get the display text based on the task date
  const getDisplayText = (taskDate) => {
    const daysLeft = getDaysLeft(taskDate); // Get the number of days left
    if (daysLeft > 0) {
      return `${daysLeft} day${daysLeft !== 1 ? "s" : ""} left`; // Return days left
    } else if (daysLeft === 0) {
      return "Today"; // Return "Today" if the task is due today
    } else {
      return `${Math.abs(daysLeft)} day${
        Math.abs(daysLeft) !== 1 ? "s" : ""
      } passed`; // Return days passed if the task is overdue
    }
  };

  // Function to format the task date
  const formatDate = (date) => {
    // Convert the date string to a Date object
    const dateObj = new Date(date);

    const year = dateObj.getFullYear(); // Get the full year
    const month = String(dateObj.getMonth() + 1).padStart(2, "0"); // Get month (zero-based) and pad with zero
    const day = String(dateObj.getDate()).padStart(2, "0"); // Get day and pad with zero
    return `${year}-${month}-${day}`; // Return formatted date string
  };

  return (
    <div
      className={`${
        task.is_completed ? "bg-gray-100" : "bg-white"
      } p-4 rounded-lg shadow-md flex flex-col md:flex-row items-start md:items-center justify-between`}
    >
      <div onClick={() => onOpenModal(task)} className="flex-1 flex flex-col mb-4 md:mb-0">
        <h3
          className={`font-medium text-lg md:text-xl mb-1 ${
            task.is_completed ? "line-through text-gray-500" : ""
          }`}
          style={{ marginRight: "1rem" }} // Add margin to the right of the title
        >
          {task.title} {/* Display the task title */}
        </h3>
        <p
          className={`text-sm md:text-lg ${
            task.is_completed ? "line-through text-gray-400" : "text-gray-600"
          }`}
          style={{
            // Limit the description to two lines
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            marginRight: "1rem", // Add margin to the right of the description
          }}
        >
          {task.description} {/* Display the task description */}
        </p>
      </div>
      <div className="flex items-center gap-2 min-w-fit">
        {/* Display the due date if the task is completed, otherwise display days left or passed */}
        {task.is_completed ? (
          <p className="line-through text-gray-500">
            {formatDate(task.taskdate)}
          </p>
        ) : (
          <p>{getDisplayText(task.taskdate)}</p>
        )}
        <input
          type="checkbox"
          checked={task.is_completed} // Checkbox reflects completion status
          onChange={() => onToggleCompletion(task.id)} // Call onToggleCompletion when checked
          className="my-auto w-5 h-5 rounded-3xl"
        />
        <button
          className="text-blue-500 hover:text-blue-700"
          onClick={(e) => {
            e.stopPropagation(); // Prevent triggering the modal
            onEdit(task.id); // Call the edit function
          }}
        >
          <PenSquare size={24} />
        </button>
        <button
          className="text-red-500 hover:text-red-700 -ml-0.5"
          onClick={(e) => {
            e.stopPropagation(); 
            onDelete(task.id); // Call the delete function
          }}
        >
          <Trash2 size={24} />
        </button>
      </div>
    </div>
  );
};

export default TaskItem; // Export the TaskItem component
