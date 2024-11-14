import React from "react";
import taskImage from "../../assets/images/task.jpg";
import taskImage2 from "../../assets/images/task2.jpg";
import taskImage3 from "../../assets/images/task3.jpg";

const Analytics = () => {
  return (
    <div className="p-6 w-full h-full">
      {/* Header with Title and Search Bar */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Analytics</h1>
        <input
          type="search"
          placeholder="Search"
          className="border border-gray-300 rounded-lg px-4 py-2 w-1/3 md:w-1/4"
        />
      </div>

      {/* Template Gallery Section */}
      <div>
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Templates</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center justify-center text-center font-medium text-gray-700">
            <img src={taskImage} alt="Project Management" className="w-full h-32 object-cover rounded-md mb-2" />
            Project Management
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center justify-center text-center font-medium text-gray-700">
            <img src={taskImage2} alt="Kanban Template" className="w-full h-32 object-cover rounded-md mb-2" />
            Kanban Template
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center justify-center text-center font-medium text-gray-700">
            <img src={taskImage3} alt="Simple Project Board" className="w-full h-32 object-cover rounded-md mb-2" />
            Simple Project Board
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center justify-center text-center font-medium text-gray-700">
            <img src={taskImage} alt="Remote Team Hub" className="w-full h-32 object-cover rounded-md mb-2" />
            Remote Team Hub
          </div>
        </div>
        <p className="text-sm text-blue-500 mt-3 cursor-pointer hover:underline">
          Browse the full template gallery
        </p>
      </div>

      {/* Admin Warning Message */}
      <div className="flex items-center justify-center mt-6">
        <p className="text-gray-500 text-center italic">Seems like you are not an admin</p>
      </div>
    </div>
  );
};

export default Analytics;
