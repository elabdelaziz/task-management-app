import { useState, Dispatch, SetStateAction } from "react";
type NewTaskTypes = {
  setNewTaskMode: Dispatch<SetStateAction<boolean>>;
};

const NewTaskModal = ({ setNewTaskMode }: NewTaskTypes) => {
  const [isDropOpen, setIsDropOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setNewTaskMode(false)}
        className="absolute z-[3] overlay w-[100vw] h-[100vh] bg-black bg-opacity-[0.5]"
      ></div>
      <div className="absolute flex items-center justify-center w-[100vw] h-[100vh]">
        <div className="rounded-[10px] z-[4] flex flex-col [&>div]:mb-[1rem] [&>div>label]:mb-[0.5rem] p-[2rem] bg-mainDark w-[100%] max-w-[30rem] max-h-[60rem] h-[fit]">
          <div className="flex flex-col">
            <label htmlFor="title">title</label>
            <input
              className="bg-transparent text-[0.8125rem] p-[1rem_0.5rem] rounded-[4px] border-[1px] border-solid border-inputBorder transition-[border_.2s_ease]"
              id="title"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="textarea">Description</label>
            <textarea
              id="textarea"
              rows={4}
              spellCheck="false"
              name="description"
              className="bg-transparent text-[.8125rem] p-[0.5rem_1rem] rounded-[4px] border-[2px] border-solid border-inputBorder transition-[border_.2s_ease]"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="subtasks">Subtasks</label>
            <div className="flex items-center mb-[1rem]">
              <input
                className="bg-transparent flex-1 text-[0.8125rem] p-[1rem_0.5rem] rounded-[4px] border-[1px] border-solid border-inputBorder transition-[border_.2s_ease]"
                id="subtasks"
              />
              <button className="ml-[1rem] text-[22px] opacity-[0.5]">x</button>
            </div>
            <button className="mt-[0.5rem] rounded-[20px] text-[#635fc7] bg-white text-[.8125rem] p-[0.5rem_1rem] h-auto font-[700] transition-[all_.2s_ease]">
              Add New Subtask
            </button>
          </div>
          <div className="flex flex-col relative">
            <div
              id="myDropdown"
              onClick={() => setIsDropOpen(!isDropOpen)}
              className="flex items-center w-[100%] font-[500] justify-between text-[.8125rem] p-[1rem_1rem] bg-transparent rounded-[4px] border-[2px] border-solid border-inputBorder capitalize transition-[border_.2s_ease]"
            >
              <span>Todo</span>
              <img
                className="w-[10px] h-[7px]"
                src="/assets/icon-chevron-down.svg"
              />
            </div>
            {isDropOpen && (
              <div className="flex absolute top-[64px] items-start [&>*]:opacity-[0.6] [&>*]:font-[400] [&>*]:mb-[1rem] last:[&>*]:mb-0 text-[0.9rem] flex-col w-[100%] h-fit rounded-[4px] p-[1rem] bg-bgDark animation-[fadeIn_.2s_ease-in-out] whitespace-nowrap text-ellipsis overflow-hidden border-[1px] border-solid border-mainDark shadow-[0_0_8px_#364e7e1a]">
                <button>Todo</button>
                <button>Doing</button>
                <button>Done</button>
              </div>
            )}

            <button className="mt-[1rem] rounded-[20px] bg-mainText text-[.8125rem] p-[0.5rem_1rem] h-auto font-[700] transition-[all_.2s_ease]">
              Create Task
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewTaskModal;
