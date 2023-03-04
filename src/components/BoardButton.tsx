import { Dispatch, SetStateAction } from "react";

type BoardProps = {
  title: string;
  isActive?: boolean;
  activeTitle: string;
  setActiveTitle: Dispatch<SetStateAction<string>>;
};

const BoardButton = ({
  title,
  isActive,
  activeTitle,
  setActiveTitle,
}: BoardProps) => {
  return (
    <button
      onClick={() => setActiveTitle(title)}
      className={`${
        activeTitle === title ? "bg-buttonsMain" : ""
      } flex items-center mb-[0.2rem] px-[2rem] py-[0.8rem] w-[17rem] text-[16px] font-[500] rounded-r-[25px]`}
    >
      <img className="mr-[1rem]" src="assets/icon-board.svg"></img>
      <span>{title}</span>
    </button>
  );
};

export default BoardButton;
