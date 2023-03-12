type CardProps = {
  title: string;
  sub: {
    title: string;
    isCompleted: boolean;
  }[];
  taskIndex: number;
  colIndex: number;
};

const MainCard = ({ title, sub, taskIndex, colIndex }: CardProps) => {
  const count = sub.filter((item) => item.isCompleted === true).length;
  function handleOnDrag(e: React.DragEvent, widgetType: string) {
    e.dataTransfer.setData(
      "text",
      JSON.stringify({ taskIndex, prevColIndex: colIndex })
    );
  }
  return (
    <div
      draggable
      onDragStart={(e) => handleOnDrag(e, "widget B")}
      className="flex flex-col [&_p]:word-break h-fit p-[1.5rem_1rem] rounded-[8px] shadow-[0_4px_6px_#364e7e1a] mb-[1.5rem] bg-mainDark min-h-[5.5rem] w-full transition-[filter_.2s_ease] cursor-grab"
    >
      <p className="font-[700] text-[.9375rem]">{title}</p>
      <p className="font-[700] text-[.75rem] text-[#828fa3]">
        {count} of {sub.length}
      </p>
    </div>
  );
};

export default MainCard;
