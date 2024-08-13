import React, { useState } from "react";
import Header from "../components/header";
import { DayPicker, getDefaultClassNames } from "react-day-picker";

import "react-day-picker/style.css";

const TaskTracker = () => {
  const [selected, setSelected] = useState(new Date());

  const defaultClassNames = getDefaultClassNames();

  return (
    <div className="min-w-[320px]">
      <Header />
      <div className="max-w-7xl mx-auto mb-28 px-4 sm:px-6 md:px-8 lg:px-16">
        <div className="bg-white shadow-[0_2px_25px_5px_rgb(88,88,88,0.1)] rounded-2xl p-6 sm:p-8 md:p-12 lg:p-16">
          <div className="flex flex-col lg:flex-row gap-8 xl:gap-10">
            <div className="flex-1">
              <h2 className="text-2xl sm:text-3xl font-semibold mb-6 sm:mb-8 text-center">
                Add a new task
              </h2>
              <div className="mb-4">
                <label className="block mb-2 sm:mb-3 text-xl sm:text-2xl font-medium">
                  Title
                </label>
                <input
                  type="text"
                  placeholder="Write a title"
                  className="w-full p-3 border rounded bg-gray-100 text-lg sm:text-xl font-medium"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 sm:mb-3 text-xl sm:text-2xl font-medium">
                  Description
                </label>
                <textarea
                  placeholder="Add Description"
                  className="w-full p-3 border rounded bg-gray-100 h-24 sm:h-32 text-lg sm:text-xl font-medium"
                ></textarea>
              </div>
            </div>
            <div className="flex-1 flex justify-center items-center">
              <DayPicker
                mode="single"
                selected={selected}
                onSelect={setSelected}
                classNames={{
                  today: `border-amber-500`,
                  selected: `bg-blue-500 border-amber-500 text-white rounded-xl`,
                  root: `${defaultClassNames.root} shadow-[0_2px_14px_-1px_rgb(3,3,3,0.1)] p-4 sm:p-7 rounded-2xl`,
                  chevron: `${defaultClassNames.chevron} fill-amber-500`,
                  day: `${defaultClassNames.day} text-sm sm:text-base `,
                }}
              />
            </div>
          </div>
          <div className="mt-8 sm:mt-10 flex justify-center">
            <button
              onClick={() => {
                console.log(selected.toLocaleDateString());
              }}
              className="bg-blue-500 text-white px-4 py-3 rounded-lg w-full sm:w-2/3 text-lg"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskTracker;
