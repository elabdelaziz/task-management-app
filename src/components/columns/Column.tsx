import MainCard from "../MainCard";
import { BoardsEntity, dragAndDrop } from "@/reducers/dataSlice";
import { useTypedDispatch } from "../../hooks/useRedux";

type TodoTypes = {
  column: {
    name: string;
    tasks: {
      title: string;
      subtasks: {
        title: string;
        isCompleted: boolean;
      }[];
    }[];
  };
  index: number;
  data: BoardsEntity[];
};

const TodoColumn = ({ column, index, data }: TodoTypes) => {
  const dispatch = useTypedDispatch();

  const handleBgColor = () => {
    return index === 0
      ? "bg-[#49C4E5]"
      : index === 1
      ? "bg-[#8471F2]"
      : "bg-[#67E2AE]";
  };

  function handleOnDrop(e: React.DragEvent) {
    const { prevColIndex, taskIndex } = JSON.parse(
      e.dataTransfer.getData("text")
    );
    dispatch(dragAndDrop({ colIndex: index, prevColIndex, taskIndex }));
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
  }

  return (
    <div
      onDrop={handleOnDrop}
      onDragOver={handleDragOver}
      className="flex w-[17.5rem] mr-[2rem] h-[100%] min-h-[100vh] flex-col"
    >
      <>
        <div className="flex items-center w-[17.5rem] text-[#828fa3] mb-[1.5rem] leading-[2.4px] font-[500] uppercase">
          <span
            className={`flex w-[15px] h-[15px] rounded-full mr-[12px] ${handleBgColor()}`}
          ></span>
          {column.name}
        </div>
        {column.tasks &&
          column.tasks.map((task, taskIndex) => (
            <MainCard
              key={taskIndex}
              title={task.title}
              taskIndex={taskIndex}
              colIndex={index}
              sub={task.subtasks}
            />
          ))}
      </>
    </div>
  );
};

export default TodoColumn;
