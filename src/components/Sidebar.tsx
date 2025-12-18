"use client";
import React from "react";
import BoardSection, { Board } from "./SidebarCommon/BoardSesction";
import Hide from "../assets/icon/hide";
import Sun from "../assets/icon/sun";
import Toggle from "../assets/icon/toggle";
import Moon from "../assets/icon/moon";
import BoardIcon from "../assets/icon/board";
import { useMantineColorScheme } from "@mantine/core";

export interface SidebarProps {
  boards: Board[];
  currentBoardId: string;
  onSelectBoard: (boardId: string) => void;
  onHideSidebar: () => void;
  onCreateBoard: () => void;
}

const Sidebar = ({
  boards,
  currentBoardId,
  onHideSidebar,
  onCreateBoard,
  onSelectBoard,
}: SidebarProps) => {
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";

  const toggleTheme = () => {
    const newScheme = isDark ? "light" : "dark";
    const htmlElement = document.documentElement;

    // Immediately update the dark class on HTML element FIRST
    // This ensures Tailwind dark: classes work right away
    if (newScheme === "dark") {
      htmlElement.classList.add("dark");
    } else {
      htmlElement.classList.remove("dark");
    }

    // Update Mantine's colorScheme
    setColorScheme(newScheme);
  };

  return (
    <div className="w-[300px] border-r border-[#E4EBFA] dark:border-[#979797] h-screen bg-white dark:bg-[#2B2C37]">
      <div className="p-[33px] flex flex-col justify-between h-full">
        <div>
          <BoardSection
            title="all boards"
            boards={boards}
            onSelect={onSelectBoard}
            count={boards.length}
            currentBoardId={currentBoardId}
          />

          <div className="flex items-center gap-[8px] whitespace-nowrap">
            <h4
              className="cursor-pointer flex items-center gap-[10px] text-[#635FC7] font-semibold whitespace-nowrap"
              onClick={() => {
                console.log("Create Board clicked");
                onCreateBoard();
              }}
            >
              {/* <span className='w-4 h-4'>{CreateBoardIcon}</span>  */}
              <BoardIcon color="#635FC7" width={16} height={16} />
              <span className="whitespace-nowrap">+ Create New Board</span>
            </h4>
          </div>
        </div>
        <div className="flex flex-col gap-[14px] items-centre">
          <div
            className="flex items-center justify-between cursor-pointer py-[8px] px-[44px] bg-[#F4F7FD] dark:bg-[#20212C] rounded-[6px]"
            onClick={toggleTheme}
          >
            <div className="w-[15px] h-[15px]">
              <Sun color="#828FA3" />
            </div>
            <div className="w-[40px] h-[20px]">
              <Toggle
                primaryColor={isDark ? "#635FC7" : "#fff"}
                secondaryColor={isDark ? "#fff" : "#635FC7"}
                isDark={false}
              />
            </div>
            <div className="w-[15px] h-[15px]">
              <Moon color="#828FA3" />
            </div>
          </div>
          <div
            className="flex items-center cursor-pointer font-bold gap-[6px] text-[#828FA3] px-[26px]"
            onClick={onHideSidebar}
          >
            <Hide color="#828FA3" width={18} height={16} />{" "}
            <h4>Hide Sidebar</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
