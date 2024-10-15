import React, { useState, useEffect } from "react";
import { getRandomColors } from "../../helpers/getRandomColors";
import "./AddModal.css"; // Assuming you already have your slider styles in this file

const EditModal = ({ isOpen, onClose, task, handleEditTask, handleDeleteTask }) => {
  const [taskData, setTaskData] = useState(null);
  const [tagTitle, setTagTitle] = useState("");
  const [comment, setComment] = useState("");
  const [memberInput, setMemberInput] = useState(""); // Input field for new members
  const [members, setMembers] = useState([]); // Initialize as an array
  const [attachments, setAttachments] = useState([]);
  const [comments, setComments] = useState([]);

  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);

  useEffect(() => {
    if (task) {
      setTaskData(task);
      setComments(task.comments || []);
      setMembers(task.members || []); // Initialize members correctly as an array
      setAttachments(task.attachments || []);
      
      const totalMinutes = task.deadline || 0;
      setDays(Math.floor(totalMinutes / (24 * 60)));
      setHours(Math.floor((totalMinutes % (24 * 60)) / 60));
      setMinutes(totalMinutes % 60);
    }
  }, [task]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData({ ...taskData, [name]: value });
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      const file = e.target.files[0];
      reader.onload = function (e) {
        const newFile = {
          url: e.target.result,
          name: file.name,
        };
        setAttachments([...attachments, newFile]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddTag = () => {
    if (tagTitle.trim() !== "") {
      const { bg, text } = getRandomColors();
      const newTag = { title: tagTitle.trim(), bg, text };
      setTaskData({ ...taskData, tags: [...(taskData.tags || []), newTag] });
      setTagTitle("");
    }
  };

  const removeTag = (indexToRemove) => {
    const newTags = taskData.tags.filter((_, index) => index !== indexToRemove);
    setTaskData({ ...taskData, tags: newTags });
  };

  const handleAddComment = () => {
    if (comment.trim() !== "") {
      const newComment = { text: comment, date: new Date() };
      setComments([...comments, newComment]);
      setComment("");
    }
  };

  const removeComment = (indexToRemove) => {
    const updatedComments = comments.filter((_, index) => index !== indexToRemove);
    setComments(updatedComments);
  };

  const handleAddMember = () => {
    if (memberInput.trim() !== "") {
      setMembers([...members, memberInput]); // Add the new member to the array
      setMemberInput(""); // Clear the input field
    }
  };

  const removeMember = (indexToRemove) => {
    const updatedMembers = members.filter((_, index) => index !== indexToRemove);
    setMembers(updatedMembers);
  };

  const removeAttachment = (indexToRemove) => {
    const updatedAttachments = attachments.filter((_, index) => index !== indexToRemove);
    setAttachments(updatedAttachments);
  };

  const closeModal = () => {
    onClose();
  };

  const handleSubmit = () => {
    const totalMinutes = days * 24 * 60 + hours * 60 + minutes;
    const updatedTaskData = { ...taskData, deadline: totalMinutes, attachments, comments, members };
    handleEditTask(updatedTaskData);
    closeModal();
  };

  const handleTaskDelete = () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      handleDeleteTask(taskData.id);  // Assuming taskData.id is the unique ID
      closeModal();
    }
  };

  if (!isOpen || !taskData) {
    return null;
  }

  return (
    <div className={`w-screen h-screen place-items-center fixed top-0 left-0 z-50 ${isOpen ? "grid" : "hidden"}`}>
      <div className="w-full h-full bg-gray-800 opacity-50 absolute left-0 top-0 z-40" onClick={closeModal}></div>
      <div className="relative md:w-[70vw] w-[90%] bg-white rounded-lg shadow-md z-50 p-6 flex">
        
        {/* Left Side - Task Edit Section */}
        <div className="w-2/3 pr-5">
          <button
            onClick={closeModal}
            className="absolute top-3 right-3 text-red-500 hover:text-red-700 hover:scale-150"
          >
            &times;
          </button>

          <h2 className="text-xl font-bold mb-4">Edit Task</h2>

          <input
            type="text"
            name="title"
            value={taskData?.title || ""}
            onChange={handleChange}
            placeholder="Title"
            className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm font-medium mb-3"
          />
          <textarea
            name="description"
            value={taskData?.description || ""}
            onChange={handleChange}
            placeholder="Description"
            className="w-full h-24 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm font-medium mb-3"
          />

          {/* Priority Selector */}
          <label className="w-full text-left text-sm">Priority:</label>
          <input
            type="range"
            name="priority"
            min="1"
            max="3"
            value={taskData.priority || 2}
            onChange={handleChange}
            className="w-full priority-range mb-3" 
          />
          <p className="text-sm text-gray-600 mb-3">
            Priority Level: {taskData.priority === "1" ? "Low" : taskData.priority === "2" ? "Medium" : "High"}
          </p>

          {/* Time Input Fields for Days, Hours, and Minutes */}
          <div className="w-full flex gap-2 mb-3">
            <input
              type="text"
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
              placeholder="Days"
              className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm"
            />
            <input
              type="text"
              value={hours}
              onChange={(e) => setHours(Number(e.target.value))}
              placeholder="Hours"
              className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm"
            />
            <input
              type="text"
              value={minutes}
              onChange={(e) => setMinutes(Number(e.target.value))}
              placeholder="Minutes"
              className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm"
            />
           
          </div>
          

          {/* Tag Input */}
          <input
            type="text"
            value={tagTitle}
            onChange={(e) => setTagTitle(e.target.value)}
            placeholder="Tag Title"
            className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm mb-3"
          />
          <button
            className="w-[200px] rounded-md h-9 bg-slate-500 text-amber-50 font-medium mb-3"
            onClick={handleAddTag}
          >
            Add Tag
          </button>

          {/* Existing Tags with Remove Functionality */}
          <div className="w-full flex flex-wrap">
            {taskData?.tags?.length > 0 ? (
              <>
                <span className="w-full text-left">Tags:</span>
                {taskData?.tags.map((tag, index) => (
                  <div
                    key={index}
                    className="inline-block mx-1 my-1 px-[10px] py-[2px] text-[13px] font-medium rounded-md cursor-pointer"
                    style={{ backgroundColor: tag.bg, color: tag.text }}
                    onClick={() => removeTag(index)}
                  >
                    {tag.title}
                  </div>
                ))}
              </>
            ) : (
              <p className="text-gray-500">No tags added yet.</p>
            )}
          </div>

          {/* Tag and Button Row */}
          <div className="flex justify-between items-center mb-3">
            <button
              className="w-[200px] rounded-md h-9 bg-[#786FB9] text-blue-50 font-medium"
              onClick={handleSubmit}
            >
              Save Changes
            </button>
            <button
              className="w-[200px] rounded-md h-9 bg-red-600 text-white font-medium"
              onClick={handleTaskDelete}
            >
              Delete Task
            </button>
          </div>
        </div>

        {/* Right Side - Members, Attachments, Comments */}
        <div className="w-1/3 pl-5 border-l">
          <h3 className="font-bold text-lg mb-2">Members</h3>
          <input
            type="text"
            value={memberInput} // Use the memberInput for input field
            onChange={(e) => setMemberInput(e.target.value)}
            placeholder="Add Member"
            className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm mb-3"
          />
          <button
            className="w-full rounded-md h-9 bg-blue-500 text-white font-medium mb-3"
            onClick={handleAddMember}
          >
            Add Member
          </button>
          <div>
            {members?.length > 0 ? (
              members.map((member, index) => (
                <div key={index} className="flex justify-between items-center">
                  <p className="text-sm text-gray-800">{member}</p>
                  <button
                    className="text-red-600 hover:underline"
                    onClick={() => removeMember(index)}
                  >
                    Remove
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No members added yet.</p>
            )}
          </div>

          <h3 className="font-bold text-lg mt-5 mb-2">Attachments</h3>
          <input
            type="file"
            onChange={handleImageChange}
            className="w-full mb-3"
          />
          <div>
            {attachments?.length > 0 ? (
              attachments.map((file, index) => (
                <div key={index} className="flex justify-between items-center">
                  <a href={file.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    {file.name}
                  </a>
                  <button
                    className="text-red-600 hover:underline"
                    onClick={() => removeAttachment(index)}
                  >
                    Remove
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No attachments added yet.</p>
            )}
          </div>

          <h3 className="font-bold text-lg mt-5 mb-2">Comments</h3>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment"
            className="w-full h-20 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm mb-3"
          />
          <button
            className="w-full rounded-md h-9 bg-[#786FB9] text-white font-medium mb-3"
            onClick={handleAddComment}
          >
            Add Comment
          </button>
          <div>
            {comments?.length > 0 ? (
              comments.map((comment, index) => (
                <div key={index} className="flex justify-between items-center">
                  <p className="text-sm text-gray-800">{comment.text}</p>
                  <button
                    className="text-red-600 hover:underline"
                    onClick={() => removeComment(index)}
                  >
                    Remove
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No comments added yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
