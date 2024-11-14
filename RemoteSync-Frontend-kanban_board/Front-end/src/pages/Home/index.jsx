import React, { useState } from "react";
import { IoCheckboxOutline } from "react-icons/io5";
import { FiClock } from "react-icons/fi";

// Import images directly
import taskImage from "../../assets/images/task.jpg";
import taskImage2 from "../../assets/images/task2.jpg";
import taskImage3 from "../../assets/images/task3.jpg";

const Home = () => {
  const [boards, setBoards] = useState([]);
  const [boardTitle, setBoardTitle] = useState("");

  const images = [taskImage, taskImage2, taskImage3];

  const handleCreateBoard = () => {
    if (boardTitle.trim() !== "") {
      const newBoard = {
        id: boards.length + 1,
        title: boardTitle,
        createdAt: new Date().toLocaleDateString(),
        image: images[boards.length % images.length], // Cycle through images
      };
      setBoards([...boards, newBoard]);
      setBoardTitle("");
    } else {
      alert("Please enter a title for your board.");
    }
  };

  return (
    <div className="p-6 w-full h-full flex justify-center items-center">
      <div className="flex flex-col md:flex-row gap-8 w-full max-w-6xl">
        
        {/* Checklist and Organize Section */}
        <div className="md:w-2/3 w-full bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4 text-gray-700">
            <IoCheckboxOutline size={20} />
            <span className="ml-2 font-medium">Your Items</span>
          </div>
          <p className="text-gray-500 mb-8">
            When you're added to a checklist item, it'll show up here.
          </p>

          {/* Organize Anything Section */}
          <div className="bg-purple-50 p-6 rounded-lg flex flex-col items-center justify-center">
            <img
              src={taskImage}  // Using taskImage for illustration here
              alt="Organize illustration"
              className="w-32 h-32 object-cover rounded-md mb-4"
            />
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Organize anything
            </h2>
            <p className="text-gray-600 text-center mb-4">
              Put everything in one place and start moving things forward with
              your first board!
            </p>
            <input
              type="text"
              placeholder="What are you working on?"
              value={boardTitle}
              onChange={(e) => setBoardTitle(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 w-full mb-4"
            />
            <button
              className="bg-purple-600 text-white px-4 py-2 rounded-lg w-full hover:bg-purple-700"
              onClick={handleCreateBoard}
            >
              Create your board
            </button>
            <p className="text-gray-500 text-sm mt-4 cursor-pointer hover:underline">
              Got it! Dismiss this.
            </p>
          </div>
        </div>

        {/* Recently Viewed Section */}
        <div className="md:w-1/3 w-full bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4 text-gray-700">
            <FiClock size={20} />
            <span className="ml-2 font-medium">Recently viewed</span>
          </div>
          {boards.length === 0 ? (
            <p className="text-gray-500">No boards created yet.</p>
          ) : (
            boards.map((board) => (
              <div key={board.id} className="flex items-start gap-4 mb-4">
                {board.image && (
                  <img
                    src={board.image}
                    alt={board.title}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                )}
                <div>
                  <p className="text-gray-800 font-medium">{board.title}</p>
                  <p className="text-gray-500 text-sm">Created on {board.createdAt}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
