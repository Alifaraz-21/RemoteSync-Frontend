import React, { useState } from "react";
import { getRandomColors } from "../../helpers/getRandomColors";
import { getTime } from "../../helpers/gettime";
import { v4 as uuidv4 } from "uuid";
import './AddModal.css'; // Import custom styles

const AddModal = ({ isOpen, onClose, setOpen, handleAddTask }) => {
  const initialTaskData = {
    id: uuidv4(),
    title: "",
    description: "",
    priority: "2",  // Default priority set to medium
    deadline: 0,
    image: "",
    alt: "",
    tags: [],
  };

  const [taskData, setTaskData] = useState(initialTaskData);
  const [tagTitle, setTagTitle] = useState("");
  const [days, setDays] = useState("");
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData({ ...taskData, [name]: value });
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = function (e) {
        if (e.target) {
          setTaskData({ ...taskData, image: e.target.result });
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleAddTag = () => {
    if (tagTitle.trim() !== "") {
      const { bg, text } = getRandomColors();
      const newTag = { title: tagTitle.trim(), bg, text };
      setTaskData({ ...taskData, tags: [...taskData.tags, newTag] });
      setTagTitle("");
    }
  };

  const closeModal = () => {
    setOpen(false);
    onClose();
    setTaskData(initialTaskData);
    setDays("");
    setHours("");
    setMinutes("");
  };

  const handleSubmit = () => {
    const totalMinutes = parseInt(days || "0") * 24 * 60 + parseInt(hours || "0") * 60 + parseInt(minutes || "0");
    const updatedTaskData = { ...taskData, deadline: totalMinutes };
    handleAddTask(updatedTaskData);
    closeModal();
  };

  const handleTimeInputChange = (setter) => (e) => {
    const { value } = e.target;
    if (/^\d*$/.test(value)) {
      setter(value);
    }
  };

  return (
    <div className={`w-screen h-screen place-items-center fixed top-0 left-0 z-50 ${isOpen ? "grid" : "hidden"}`}>
      <div className="w-full h-full bg-[#786FB9] opacity-50 absolute left-0 top-0 z-40" onClick={closeModal}></div>
      <div className="md:w-[30vw] w-[90%] bg-white rounded-lg shadow-md z-50 flex flex-col items-center gap-3 px-5 py-6 relative">
        <input
          type="text"
          name="title"
          value={taskData.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm font-medium"
        />
        <textarea
          name="description"
          value={taskData?.description || ""}
          onChange={handleChange}
          placeholder="Description"
          className="w-full h-24 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm font-medium"
        />
        
        {/* Priority Selector */}
        <label className="w-full text-left text-sm">Priority:</label>
        <input
          type="range"
          name="priority"
          min="1"
          max="3"
          value={taskData.priority || "2"} // Default to "Medium"
          onChange={handleChange}
          className="w-full priority-range"
        />
        <p className="text-sm text-gray-600">
          Priority Level: {taskData.priority === "1" ? "Low" : taskData.priority === "2" ? "Medium" : "High"}
        </p>

        {/* Time input fields */}
        <div className="w-full flex gap-2">
          <input
            type="text"
            value={days}
            onChange={handleTimeInputChange(setDays)}
            placeholder="Days"
            className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm"
            inputMode="numeric"
            pattern="\d*"
          />
          <input
            type="text"
            value={hours}
            onChange={handleTimeInputChange(setHours)}
            placeholder="Hours"
            className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm"
            inputMode="numeric"
            pattern="\d*"
          />
          <input
            type="text"
            value={minutes}
            onChange={handleTimeInputChange(setMinutes)}
            placeholder="Minutes"
            className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm"
            inputMode="numeric"
            pattern="\d*"
          />
        </div>

        <div className="w-full mt-2 text-sm font-medium">
          <p>Total Time: {getTime(parseInt(days || "0") * 24 * 60 + parseInt(hours || "0") * 60 + parseInt(minutes || "0"))}</p>
        </div>

        <input
          type="text"
          value={tagTitle}
          onChange={(e) => setTagTitle(e.target.value)}
          placeholder="Tag Title"
          className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm"
        />
        <button
          className="w-full rounded-md h-9 bg-slate-500 text-amber-50 font-medium"
          onClick={handleAddTag}
        >
          Add Tag
        </button>
        <div className="w-full">
          {taskData.tags.length > 0 && <span>Tags:</span>}
          {taskData.tags.map((tag, index) => (
            <div
              key={index}
              className="inline-block mx-1 px-[10px] py-[2px] text-[13px] font-medium rounded-md"
              style={{ backgroundColor: tag.bg, color: tag.text }}
            >
              {tag.title}
            </div>
          ))}
        </div>
        <div className="w-full flex items-center gap-4 justify-between">
          <input
            type="text"
            name="alt"
            value={taskData.alt}
            onChange={handleChange}
            placeholder="Image Alt"
            className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm"
          />
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            className="w-full"
          />
        </div>

        {/* Buttons for Submit and Cancel */}
        <div className="w-full flex justify-between mt-4">
          <button
            className="w-[48%] rounded-md h-9 bg-[#786FB9] text-blue-50 font-medium hover:bg-slate-300 duration-300 ease-in-out hover:text-[#786FB9]"
            onClick={handleSubmit}
          >
            Submit Task
          </button>
          <button
            className="w-[48%] rounded-md h-9 bg-red-500 text-white font-medium hover:bg-red-700 duration-300 ease-in-out"
            onClick={closeModal}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddModal;
