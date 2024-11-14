import React from "react";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";

const workflows = [
  {
    id: 1,
    title: "Client Onboarding",
    description: "Guides for the initial onboarding process with new clients.",
    status: "Completed",
    icon: <AiOutlineCheckCircle size={30} className="text-green-500" />,
  },
  {
    id: 2,
    title: "Project Setup",
    description: "Instructions for setting up new projects in the system.",
    status: "In Progress",
    icon: <AiOutlineCheckCircle size={30} className="text-blue-500" />,
  },
  {
    id: 3,
    title: "Data Collection",
    description: "Workflow for collecting data from clients.",
    status: "Pending",
    icon: <AiOutlineCloseCircle size={30} className="text-yellow-500" />,
  },
  {
    id: 4,
    title: "Final Review",
    description: "Checklist for final project review before client delivery.",
    status: "Pending",
    icon: <AiOutlineCloseCircle size={30} className="text-yellow-500" />,
  },
];

const Workflows = () => {
  return (
    <div className="p-6 w-full h-full">
      {/* Header */}
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Workflows</h1>

      {/* Workflows List */}
      <div className="flex flex-col gap-4">
        {workflows.map((workflow) => (
          <div
            key={workflow.id}
            className="flex items-start justify-between p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 ease-in-out"
          >
            <div className="flex items-start gap-4">
              {/* Icon */}
              <div className="mt-1">{workflow.icon}</div>

              {/* Title, Description, and Status */}
              <div>
                <h2 className="text-gray-800 font-semibold">{workflow.title}</h2>
                <p className="text-gray-700 mt-1">{workflow.description}</p>
                <p className={`text-sm mt-1 ${workflow.status === "Completed" ? "text-green-500" : workflow.status === "In Progress" ? "text-blue-500" : "text-yellow-500"}`}>
                  {workflow.status}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Workflows;
