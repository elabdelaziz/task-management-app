import BoardButton from "./BoardButton";
import TodoColumn from "./columns/Column";
import { useEffect, useState } from "react";
import NewColumn from "./columns/New";
import {
  dragAndDrop,
  getLocalData,
  setActiveColumn,
  TasksEntity,
} from "@/reducers/dataSlice";
import { useTypedDispatch, useTypedSelector } from "@/hooks/useRedux";
import { DragDropContext, resetServerContext } from "@hello-pangea/dnd";
import NewTaskModal from "./NewTask";
import NewBoardModal from "./NewBoardModal";
import EditBoardModal from "./EditBoardModal";
import DeleteBoardConfirmation from "./DeleteBoardConfirmation";
import NewColumnModal from "./NewColumnModal";
import TaskModal from "./TaskModal";

type AppLayoutProps = {
  darkMode: boolean;
  toggleDarkMode: () => void;
};

export type AppData = {
  data: {
    name: string;
    isActive: boolean;
    columns: {
      name: string;
      tasks: {
        title: string;
        description: string;
        status: string;
        subtasks: {
          title: string;
          isCompleted: boolean;
        }[];
      }[];
    }[];
  }[];
};

const AppLayout = ({ darkMode, toggleDarkMode }: AppLayoutProps) => {
  const dispatch = useTypedDispatch();
  const { data } = useTypedSelector((state) => state.data);
  const activeColIndex = useTypedSelector((state) => state.data.activeColIndex);
  const activeColName = data.find((_item, i) => i === activeColIndex)?.name;

  const [newTaskMode, setNewTaskMode] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [sideBarHidden, setSideBarHidden] = useState(false);
  const [showNewBoardModal, setShowNewBoardModal] = useState(false);
  const [showEditBoard, setShowEditBoard] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showNewColumnModal, setShowNewColumnModal] = useState(false);
  const [renderTaskModal, setRenderTaskModal] = useState<TasksEntity | null>(
    null
  );

  const activeBoard = data.find((item) => item.isActive) || null;

  console.log(renderTaskModal);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await import("data.json");
        const data = response.boards;
        dispatch(getLocalData(data));
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      const activeItem = data.find((item) => item.isActive);
      if (!activeItem) dispatch(setActiveColumn(0));
    }
  }, [data]);

  const onDragEnd = (result: any) => {
    const { destination, source } = result;
    //unknown position
    if (!destination) return;
    //same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;
    dispatch(
      dragAndDrop({
        colIndex: Number(destination.droppableId),
        prevColIndex: Number(source.droppableId),
        taskIndex: source.index,
        droppableAreaIndex: destination.index,
      })
    );
  };

  function getRandomHexColor() {
    const hexLetters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += hexLetters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  return (
    // <button onClick={toggleDarkMode}>Toggle</button>
    <>
      <div
        className={`page ${
          sideBarHidden && "sideBarHidden"
        } transition-[transform_.2s_ease] bg-mainDark text-white`}
      >
        <div className="logo min-w-[300px] flex items-center pl-[2rem] border-r-[1px] border-b-[1px] border-b-borderMain border-r-borderMain">
          <img className="" src="assets/logo-light.svg"></img>
        </div>
        <nav className="min-w-[300px] flex items-center px-[2rem] justify-between border-b-[1px] border-b-borderMain">
          <h2 className="text-[clamp(1.2rem,3vw,1.5rem)] font-[700] ">
            {activeColName || ""}
          </h2>
          <div className="flex items-center">
            <button
              onClick={() => setNewTaskMode(true)}
              className="mr-[1rem] p-[0.7rem_1rem] rounded-[24px] bg-buttonsMain font-[500]"
            >
              + Add New Task
            </button>
            <i className="relative cursor-pointer">
              <img
                onClick={() => setEditMode(!editMode)}
                src="/assets/icon-vertical-ellipsis.svg"
              />
              {editMode && (
                <div className="absolute [&>button]:w-full [&>button]:text-left top-[65px] min-w-[10rem] right-0 whitespace-nowrap flex flex-col items-start rounded-[10px] p-[1rem] bg-mainDark w-fit h-fit">
                  <button
                    onClick={() => setShowEditBoard(true)}
                    className="opacity-[0.5] mb-[10px]"
                  >
                    Edit Board
                  </button>
                  <button
                    onClick={() => setShowDelete(true)}
                    className="text-[#ea5555]"
                  >
                    Delete Board
                  </button>
                </div>
              )}
            </i>
          </div>
        </nav>
        {!sideBarHidden && (
          <aside className="pt-[1rem] transition-[transform_.2s_ease] border-r-[1px] border-r-borderMain">
            <div className="flex flex-col h-full justify-between">
              <div>
                <h3 className="pl-[2rem] mb-[1rem]">All Boards {"(3)"}</h3>
                {data &&
                  data.map((item, i) => (
                    <BoardButton key={i} boardIndex={i} title={item.name} />
                  ))}
                <button
                  onClick={() => setShowNewBoardModal(true)}
                  className="text-buttonsMain px-[2rem] py-[0.8rem] mt-[10px] font-[500] flex items-center"
                >
                  <img className="mr-[1rem]" src="assets/icon-board.svg" />+
                  Create New Board
                </button>
              </div>
              <div className="mb-[3rem] pl-[2rem]">
                <div
                  onClick={() => setSideBarHidden(true)}
                  className="opacity-[0.5] cursor-pointer flex items-center before:content-[''] before:mr-[10px] before:bg-no-repeat before:bg-center before:bg-contain before:bg-[url('/assets/icon-hide-sidebar.svg')] before:block before:w-[16px] before:h-[16px]"
                >
                  Hide Sidebar
                </div>
              </div>
            </div>
          </aside>
        )}
        {sideBarHidden && (
          <div
            onClick={() => setSideBarHidden(false)}
            className="fixed cursor-pointer flex items-center justify-center left-0 bottom-[2rem] w-[3.5rem] h-[3rem] bg-[#635FC7] rounded-[0_25px_25px_0] animation-[fadeIn_.3s_ease-in] transition-[background-color_.2s_ease]"
          >
            <img src="/assets/icon-show-sidebar.svg" />
          </div>
        )}
        <section onClick={() => setEditMode(false)} className={`bg-bgDark`}>
          <section
            className={`${
              sideBarHidden && "[&>*]:flex-1"
            } bg-bgDark max-h-[calc(100vh-96px)] flex min-w-full min-h-full overflow-scroll left-[18.75rem] transition-[left_.2s_ease] cursor-move p-[1.5rem_2rem]`}
          >
            <>
              <DragDropContext onDragEnd={onDragEnd}>
                {data &&
                  data.map((item) => {
                    if (item.isActive) {
                      return item?.columns?.map((col, i) => {
                        return (
                          <TodoColumn
                            key={i}
                            data={data}
                            column={col}
                            index={i}
                            setRenderTaskModal={setRenderTaskModal}
                          />
                        );
                      });
                    }
                  })}
              </DragDropContext>
              <NewColumn setShowNewColumnModal={setShowNewColumnModal} />
            </>
          </section>
        </section>
        {newTaskMode && (
          <NewTaskModal
            activeBoard={activeBoard}
            setNewTaskMode={setNewTaskMode}
          />
        )}
        {showNewBoardModal && (
          <NewBoardModal setShowNewBoardModal={setShowNewBoardModal} />
        )}
        {showEditBoard && (
          <EditBoardModal
            activeBoard={activeBoard}
            setShowEditBoard={setShowEditBoard}
          />
        )}
        {showDelete && (
          <DeleteBoardConfirmation
            setShowDelete={setShowDelete}
            setEditMode={setEditMode}
          />
        )}
        {showNewColumnModal && (
          <NewColumnModal setShowNewColumnModal={setShowNewColumnModal} />
        )}
        {renderTaskModal !== null && (
          <TaskModal
            activeBoard={activeBoard}
            task={renderTaskModal}
            setShowTaskModal={setRenderTaskModal}
          />
        )}
      </div>
    </>
  );
};

export default AppLayout;
