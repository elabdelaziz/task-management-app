import MainCard from "../MainCard";

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
};

const TodoColumn = ({ column, index }: TodoTypes) => {
  const handleBgColor = () => {
    return index === 0
      ? "bg-[#49C4E5]"
      : index === 1
      ? "bg-[#8471F2]"
      : "bg-[#67E2AE]";
  };
  return (
    <div className="flex w-[17.5rem] mr-[2rem] h-[100%] flex-col">
      <>
        <div className="flex items-center w-[17.5rem] text-[#828fa3] mb-[1.5rem] leading-[2.4px] font-[500] uppercase">
          <span
            className={`flex w-[15px] h-[15px] rounded-full mr-[12px] ${handleBgColor()}`}
          ></span>
          {column.name}
        </div>
        {column.tasks &&
          column.tasks.map((task) => (
            <MainCard title={task.title} sub={task.subtasks} />
          ))}
      </>
    </div>
  );
};

export default TodoColumn;
