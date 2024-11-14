import React from "react";
import taskImage from "../../assets/images/task.jpg";
import taskImage2 from "../../assets/images/task2.jpg";
import taskImage3 from "../../assets/images/task3.jpg";

const templates = [
  {
    id: 1,
    title: "Project Management",
    description: "Organize and manage all your projects in one place.",
    image: taskImage,
  },
  {
    id: 2,
    title: "Kanban Template",
    description: "A visual approach to manage your workflow effectively.",
    image: taskImage2,
  },
  {
    id: 3,
    title: "Simple Project Board",
    description: "A simple board to track tasks and assignments.",
    image: taskImage3,
  },
  {
    id: 4,
    title: "Remote Team Hub",
    description: "Collaborate with your remote team effortlessly.",
    image: taskImage,
  },
];

const Projects = () => {
  return (
    <div className="p-6 w-full h-full">
      {/* Header */}
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Projects</h1>

      {/* Project Templates Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {templates.map((template) => (
          <div
            key={template.id}
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 ease-in-out"
          >
            <img
              src={template.image}
              alt={template.title}
              className="w-full h-32 object-cover rounded-md mb-4"
            />
            <h2 className="text-lg font-semibold text-gray-800">{template.title}</h2>
            <p className="text-gray-600 text-sm mb-2">{template.description}</p>
            <button className="mt-4 bg-purple-600 text-white px-4 py-2 rounded-lg w-full hover:bg-purple-700">
              Use Template
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
