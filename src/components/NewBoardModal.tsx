import { useState, Dispatch, SetStateAction } from "react";

type BoardProps = {
  setShowNewBoardModal: Dispatch<SetStateAction<boolean>>;
};

const NewBoardModal = ({ setShowNewBoardModal }: BoardProps) => {
  return (
    <>
      <div
        onClick={() => setShowNewBoardModal(false)}
        className="absolute z-[3] overlay w-[100vw] h-[100vh] bg-black bg-opacity-[0.5]"
      ></div>
      <div className="absolute flex items-center justify-center w-[100vw] h-[100vh]">
        <div className="rounded-[10px] z-[4] flex flex-col [&>div]:mb-[1rem] [&>div>label]:mb-[0.5rem] p-[2rem] bg-mainDark w-[100%] max-w-[30rem] max-h-[60rem] h-[fit]">
          <div className="flex flex-col">
            <label htmlFor="name">Name</label>
            <input
              className="bg-transparent text-[0.8125rem] p-[1rem_0.5rem] rounded-[4px] border-[1px] border-solid border-inputBorder transition-[border_.2s_ease]"
              id="name"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="col">Column</label>
            <input
              className="bg-transparent text-[0.8125rem] p-[1rem_0.5rem] rounded-[4px] border-[1px] border-solid border-inputBorder transition-[border_.2s_ease]"
              id="col"
            />
          </div>
          <button className="mt-[1rem] rounded-[20px] text-mainText bg-white text-[.8125rem] p-[0.5rem_1rem] h-auto font-[700] transition-[all_.2s_ease]">
            Add New Column
          </button>
          <button className="mt-[1rem] rounded-[20px] bg-mainText text-[.8125rem] p-[0.5rem_1rem] h-auto font-[700] transition-[all_.2s_ease]">
            Create New Board
          </button>
        </div>
      </div>
    </>
  );
};

export default NewBoardModal;
