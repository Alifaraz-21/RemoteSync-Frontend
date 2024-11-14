import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useState } from "react";
import { Board } from "../../data/board";
import { onDragEnd } from "../../helpers/onDragEnd";
import { IoAddOutline } from "react-icons/io5";
import AddModal from "../../components/Modals/AddModal";
import EditModal from "../../components/Modals/EditModal";
import Task from "../../components/Task";

const Home = () => {
  const [columns, setColumns] = useState(Board);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState("");
  const [selectedTask, setSelectedTask] = useState(null);

  const openModal = (columnId) => {
    setSelectedColumn(columnId);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleAddTask = (taskData) => {
    const newBoard = { ...columns };
    newBoard[selectedColumn].items.push(taskData);
    setColumns(newBoard); // Update columns after adding the task
  };

  const openEditModal = (task) => {
    setSelectedTask(task);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
  };

  const handleEditTask = (updatedTask) => {
    const newColumns = { ...columns };
    for (let columnId in newColumns) {
      const taskIndex = newColumns[columnId].items.findIndex(
        (item) => item.id === updatedTask.id
      );
      if (taskIndex > -1) {
        newColumns[columnId].items[taskIndex] = updatedTask;
        break;
      }
    }
    setColumns(newColumns);
  };

  const handleDeleteTask = (taskId) => {
    const newColumns = { ...columns };
    for (let columnId in newColumns) {
      const taskIndex = newColumns[columnId].items.findIndex(
        (item) => item.id === taskId
      );
      if (taskIndex > -1) {
        newColumns[columnId].items.splice(taskIndex, 1);
        break;
      }
    }
    setColumns(newColumns);
    closeEditModal();
  };

  return (
    <div>
      <DragDropContext onDragEnd={(result) => onDragEnd(result, columns, setColumns)}>
        <div className="w-full flex items-start justify-between px-5 pb-8 md:gap-2 gap-10">
          {Object.entries(columns).map(([columnId, column]) => (
            <div className="w-full flex flex-col gap-0" key={columnId}>
              <Droppable droppableId={columnId} key={columnId}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="flex flex-col md:w-[290px] w-[250px] gap-3 items-center py-5 bg-transparent"
                  >
                    <div className="flex items-center justify-center py-[10px] w-full bg-white rounded-lg shadow-sm text-[#555] font-medium text-[15px] hover:text-[#786FB9] cursor-pointer hover:scale-110 duration-300 ease-in-out">
                      {column.name}
                    </div>
                    {column.items.map((task, index) => (
                      <Draggable
                        key={task.id.toString()}
                        draggableId={task.id.toString()}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            onClick={() => openEditModal(task)}
                            style={{
                              ...provided.draggableProps.style, // Ensure react-beautiful-dnd is controlling the style
                              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)", // Example of adding a subtle shadow for better visual
                            }}
                            className="task-card"
                          >
                            <Task provided={provided} task={task} />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
              <div
                onClick={() => openModal(columnId)}
                className="hover:scale-105 duration-300 hover:shadow-md shadow-indigo-400 flex cursor-pointer items-center justify-center gap-1 py-[10px] md:w-[90%] w-full opacity-90 bg-white rounded-lg shadow-sm text-[#555] font-medium text-[15px] z-10"
              >
                <IoAddOutline color={"#555"} />
                Add Task
              </div>
            </div>
          ))}
        </div>
      </DragDropContext>

      <AddModal
        isOpen={modalOpen}
        onClose={closeModal}
        setOpen={setModalOpen}
        handleAddTask={handleAddTask}
      />

      <EditModal
        isOpen={editModalOpen}
        onClose={closeEditModal}
        task={selectedTask}
        handleEditTask={handleEditTask}
        handleDeleteTask={handleDeleteTask}
      />
    </div>
  );
};

export default Home;
