import BoardButton from "./BoardButton";
import TodoColumn from "./columns/Column";
import { useEffect } from "react";
import NewColumn from "./columns/New";
import { getLocalData, setActiveColumn } from "@/reducers/dataSlice";
import { useTypedDispatch, useTypedSelector } from "@/hooks/useRedux";

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
  const {data} = useTypedSelector((state) => state.data);
  const activeColIndex = useTypedSelector((state) => state.data.activeColIndex);

  const activeColName = data.find((_item, i) => i === activeColIndex)?.name;
  

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
      const activeItem = data.find(item => item.isActive)
      if (!activeItem) dispatch(setActiveColumn(0));
    }
  }, [data]);

  return (
    // <button onClick={toggleDarkMode}>Toggle</button>
    <div className={`page bg-mainDark text-white`}>
      <div className="logo min-w-[300px] flex items-center pl-[2rem] border-r-[1px] border-b-[1px] border-b-borderMain border-r-borderMain">
        <img className="" src="assets/logo-light.svg"></img>
      </div>
      <nav className="min-w-[300px] flex items-center px-[2rem] justify-between border-b-[1px] border-b-borderMain">
        <h2 className="text-[clamp(1.2rem,3vw,1.5rem)] font-[700] ">
          {activeColName || ""}
        </h2>
        <div className="flex items-center">
          <button className="mr-[1rem] p-[0.7rem_1rem] rounded-[24px] bg-buttonsMain font-[500]">
            + Add New Task
          </button>
          <i>
            <img src="/assets/icon-vertical-ellipsis.svg" />
          </i>
        </div>
      </nav>
      <aside className="pt-[1rem] border-r-[1px] border-r-borderMain">
        <h3 className="pl-[2rem] mb-[1rem]">All Boards {"(3)"}</h3>
        {data &&
          data.map((item, i) => (
            <BoardButton key={i} boardIndex={i} title={item.name} />
          ))}
        <button className="text-buttonsMain px-[2rem] py-[0.8rem] mt-[10px] font-[500] flex items-center">
          <img className="mr-[1rem]" src="assets/icon-board.svg" />+ Create New
          Board
        </button>
      </aside>
      <section className={`bg-bgDark`}>
        <section className="bg-bgDark max-h-[calc(100vh-96px)] flex min-w-full min-h-full overflow-scroll left-[18.75rem] transition-[left_.2s_ease] cursor-move p-[1.5rem_2rem]">
          <>
            {data &&
              data.map((item) => {
                if (item.isActive) {
                  return item.columns.map((col, i) => {
                    return (
                      <TodoColumn key={i} data={data} column={col} index={i} />
                    );
                  });
                }
              })}

            <NewColumn />
          </>
        </section>
      </section>
    </div>
  );
};

export default AppLayout;
