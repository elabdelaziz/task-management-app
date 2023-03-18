import { Dispatch, SetStateAction } from "react";

type EditBoardProps = {
  setShowNewColumnModal: Dispatch<SetStateAction<boolean>>;
};

const NewColumnModal = ({ setShowNewColumnModal }: EditBoardProps) => {
  return (
    <>
      <div
        onClick={() => setShowNewColumnModal(false)}
        className="absolute z-[3] overlay w-[100vw] h-[100vh] bg-black bg-opacity-[0.5]"
      ></div>
      <div className="absolute flex items-center justify-center w-[100vw] h-[100vh]">
        <div className="rounded-[10px] z-[4] flex flex-col [&>div]:mb-[1rem] [&>div>label]:mb-[0.5rem] p-[2rem] bg-mainDark w-[100%] max-w-[30rem] max-h-[60rem] h-[fit]">
          <div className="flex flex-col">
            <div className="flex flex-col mb-[1rem]">
              <label className="mb-[0.5rem]" htmlFor="editname">
                Name
              </label>
              <input
                placeholder="Ex. Platform Launch"
                className="bg-transparent text-[0.8125rem] p-[0.5rem] rounded-[4px] border-[1px] border-solid border-inputBorder transition-[border_.2s_ease]"
                id="editname"
              />
            </div>
            <label htmlFor="subtasks">Columns</label>
            <div className="flex items-center mb-[1rem]">
              <input
                placeholder="Todo"
                className="bg-transparent flex-1 text-[0.8125rem] p-[0.5rem_0.5rem] rounded-[4px] border-[1px] border-solid border-inputBorder transition-[border_.2s_ease]"
                id="subtasks"
              />
              <button className="ml-[1rem] text-[22px] opacity-[0.5]">x</button>
            </div>
            <div className="flex items-center mb-[1rem]">
              <input
                placeholder="Doing"
                className="bg-transparent flex-1 text-[0.8125rem] p-[0.5rem_0.5rem] rounded-[4px] border-[1px] border-solid border-inputBorder transition-[border_.2s_ease]"
                id="subtasks"
              />
              <button className="ml-[1rem] text-[22px] opacity-[0.5]">x</button>
            </div>
            <div className="flex items-center mb-[1rem]">
              <input
                placeholder="Done"
                className="bg-transparent flex-1 text-[0.8125rem] p-[0.5rem_0.5rem] rounded-[4px] border-[1px] border-solid border-inputBorder transition-[border_.2s_ease]"
                id="subtasks"
              />
              <button className="ml-[1rem] text-[22px] opacity-[0.5]">x</button>
            </div>
            <button className="mt-[1rem] rounded-[20px] text-mainText bg-white text-[.8125rem] p-[0.5rem_1rem] h-auto font-[700] transition-[all_.2s_ease]">
              Add New Column
            </button>
            <button className="mt-[1rem] rounded-[20px] bg-mainText text-[.8125rem] p-[0.5rem_1rem] h-auto font-[700] transition-[all_.2s_ease]">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default NewColumnModal;
