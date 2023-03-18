import MainCard from "../MainCard";
import { BoardsEntity, dragAndDrop } from "@/reducers/dataSlice";
import { useTypedDispatch } from "../../hooks/useRedux";
import { Droppable, Draggable } from "@hello-pangea/dnd";

type TodoTypes = {
  column: {
    name: string;
    tasks: {
      title: string;
      id?: number;
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
    <div className="flex w-[17.5rem] mr-[2rem] h-[100%] min-h-[calc(100%+8rem)] w-[17.5rem] flex-col">
      <>
        <div className="flex items-center w-[17.5rem] text-[#828fa3] mb-[1.5rem] leading-[2.4px] font-[500] uppercase">
          <span
            className={`flex w-[15px] h-[15px] rounded-full mr-[12px] ${handleBgColor()}`}
          ></span>
          {column.name}
        </div>
        <Droppable droppableId={index.toString()}>
          {(droppableProvided, droppableSnapshot) => (
            <div
              className="min-h-[calc(100vh+2rem)]"
              ref={droppableProvided.innerRef}
              {...droppableProvided.droppableProps}
            >
              {column?.tasks &&
                column.tasks.map((task, taskIndex) => (
                  <Draggable
                    key={taskIndex}
                    draggableId={task?.id?.toString() || taskIndex.toString()}
                    index={taskIndex}
                  >
                    {(draggableProvided, draggableSnapshot) => (
                      <MainCard
                        key={taskIndex}
                        title={task?.title}
                        taskIndex={taskIndex}
                        colIndex={index}
                        sub={task?.subtasks}
                        provided={draggableProvided}
                      />
                    )}
                  </Draggable>
                ))}
            </div>
          )}
        </Droppable>
      </>
    </div>
  );
};

export default TodoColumn;
