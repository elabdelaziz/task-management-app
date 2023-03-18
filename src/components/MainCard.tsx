import type { DraggableProvided } from "@hello-pangea/dnd";

type CardProps = {
  title: string;
  sub: {
    title: string;
    isCompleted: boolean;
  }[];
  taskIndex: number;
  colIndex: number;
  provided: DraggableProvided;
};

const MainCard = ({ title, sub, taskIndex, colIndex, provided }: CardProps) => {
  const count = sub?.filter((item) => item.isCompleted === true).length;
  function handleOnDrag(e: React.DragEvent, widgetType: string) {
    e.dataTransfer.setData(
      "text",
      JSON.stringify({ taskIndex, prevColIndex: colIndex })
    );
  }
  return (
    <div
      draggable
      // onDragStart={(e) => handleOnDrag(e, "widget B")}
      className="flex flex-col last:mb-[8rem] text-left w-full min-h-[5.5rem] [&_p]:word-break p-[1.5rem_1rem] rounded-[8px] shadow-[0_4px_6px_#364e7e1a] mb-[1.5rem] bg-mainDark min-h-[5.5rem] transition-[filter_.2s_ease] cursor-grab"
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      {title && <p className="font-[700] text-[.9375rem]">{title}</p>}
      <p className="font-[700] text-[.75rem] text-[#828fa3]">
        {count} of {sub?.length}
      </p>
    </div>
  );
};

export default MainCard;
