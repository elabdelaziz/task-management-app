import BoardButton from "./BoardButton";
import TodoColumn from "./columns/Column";
import dataList from "data.json";
import { useEffect, useState } from "react";
import NewColumn from "./columns/New";

type AppLayoutProps = {
  darkMode: boolean;
  toggleDarkMode: () => void;
};

export type AppData = {
  boards?: {
    name: string;
    isActive: boolean;
    columns?: {
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
  const [data, setData] = useState<AppData>({});
  const [activeTitle, setActiveTitle] = useState("");

  useEffect(() => {
    if (data?.boards && activeTitle.length === 0) {
      setActiveTitle(data.boards[0].name);
    }
  }, [data, activeTitle]);

  console.log(data.boards);
  useEffect(() => {
    if (dataList.boards.length > 0) {
      setData(dataList);
    }
  }, [dataList]);

  // if (data?.boards) console.log(data?.boards[0]);
  return (
    // <button onClick={toggleDarkMode}>Toggle</button>
    <div className={`page bg-mainDark text-white`}>
      <div className="logo min-w-[300px] flex items-center pl-[2rem] border-r-[1px] border-b-[1px] border-b-borderMain border-r-borderMain">
        <img className="" src="assets/logo-light.svg"></img>
      </div>
      <nav className="min-w-[300px] flex items-center px-[2rem] justify-between border-b-[1px] border-b-borderMain">
        <h2 className="text-[clamp(1.2rem,3vw,1.5rem)] font-[700] ">
          {activeTitle || ""}
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
        {data?.boards &&
          data?.boards.map((item, i) => (
            <BoardButton
              key={i}
              activeTitle={activeTitle}
              setActiveTitle={setActiveTitle}
              title={item.name}
            />
          ))}
        <button className="text-buttonsMain px-[2rem] py-[0.8rem] mt-[10px] font-[500] flex items-center">
          <img className="mr-[1rem]" src="assets/icon-board.svg" />+ Create New
          Board
        </button>
      </aside>
      <section className={`bg-bgDark`}>
        <section className="bg-bgDark max-h-[calc(100vh-96px)] flex min-w-full min-h-full overflow-scroll left-[18.75rem] transition-[left_.2s_ease] cursor-move p-[1.5rem_2rem]">
          <>
            {data?.boards &&
              data?.boards.map((item) => {
                if (activeTitle.length > 0) {
                  if (item.name === activeTitle) {
                    return item.columns?.map((col, i) => {
                      return <TodoColumn column={col} index={i} />;
                    });
                  }
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
