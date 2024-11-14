import { IoTimeOutline } from "react-icons/io5";
import { getTime } from "../../helpers/gettime";  // Ensure this imports your helper function

const Task = ({ task, provided }) => {
  const { title, description, priority, deadline, image, alt, tags } = task;

  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      className="w-full cursor-grab bg-[#fff] hover:scale-105 duration-200 ease-in-out flex flex-col justify-between gap-3 items-start shadow-sm rounded-xl px-3 py-4"
    >
      {image && alt && (
        <img
          src={image}
          alt={alt}
          className="w-full h-[170px] rounded-lg"
        />
      )}
      <div className="flex items-center gap-2">
        {tags.map((tag) => (
          <span
            key={tag.title}
            className="px-[10px] py-[2px] text-[13px] font-medium rounded-md"
            style={{ backgroundColor: tag.bg, color: tag.text }}
          >
            {tag.title}
          </span>
        ))}
      </div>
      <div className="w-full flex items-start flex-col gap-0">
        <span className="text-[15.5px] font-medium text-[#555]">{title}</span>
        <span className="text-[13.5px] text-gray-500">{description}</span>
      </div>
      <div className="w-full border border-dashed"></div>
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-1">
          <IoTimeOutline
            color={"#666"}
            size={19}
          />
          <span className="text-[16px] text-gray-700">{getTime(deadline)}</span>
        </div>
        <div
          className={`w-[60px] rounded-full h-[5px] ${
            priority === "high"
              ? "bg-red-500"       // High priority: Red
              : priority === "medium"
              ? "bg-orange-500"    // Medium priority: Orange
              : priority === "low"
              ? "bg-blue-500"      // Low priority: Blue
              : "bg-green-300"      // Default if priority is not set
          }`}
        ></div>
      </div>
    </div>
  );
};

export default Task;
