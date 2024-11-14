import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";

const notifications = [
  {
    id: 1,
    message: "Meg Griffin has left you a review. Both of your reviews from this trip are now public.",
    date: "March 1, 2023",
    icon: <FaUserCircle size={30} className="text-blue-500" />,
  },
  {
    id: 2,
    message: "Cleveland Brown has left you a review. Both of your reviews from this trip are now public.",
    date: "February 26, 2023",
    icon: <FaUserCircle size={30} className="text-blue-500" />,
  },
  {
    id: 3,
    message: "Glen accepted your invite to co-host Cheerful 2-bedroom home in the heart of Quahog.",
    date: "April 25, 2022",
    icon: <FaUserCircle size={30} className="text-green-500" />,
  },
  {
    id: 4,
    message: "Please confirm your email address by clicking on the link we just emailed you.",
    date: "March 1, 2022",
    icon: <FaUserCircle size={30} className="text-blue-500" />,
  },
  {
    id: 5,
    message: "Glen accepted your invite to co-host Cozy 3BR home minutes from downtown Quahog.",
    date: "March 6, 2022",
    icon: <FaUserCircle size={30} className="text-green-500" />,
  },
];

const Notifications = () => {
  return (
    <div className="p-6 w-full h-full">
      {/* Header */}
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Notifications</h1>

      {/* Notifications List */}
      <div className="flex flex-col gap-4">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className="flex items-start justify-between p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 ease-in-out"
          >
            <div className="flex items-start gap-4">
              {/* Icon */}
              <div className="mt-1">{notification.icon}</div>

              {/* Message and Date */}
              <div>
                <p className="text-gray-700">{notification.message}</p>
                <p className="text-sm text-gray-500 mt-1">{notification.date}</p>
              </div>
            </div>

            {/* Delete Icon */}
            <button className="text-gray-400 hover:text-red-600">
              <AiOutlineClose size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
