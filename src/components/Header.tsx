"use client";
import React from "react";
import { Board } from "./SidebarCommon/BoardSesction";
import Ellipsis from "../assets/icon/ellipsis";
import Image from "next/image";
import Logo from "../assets/images/logo.png";
import { Menu, useMantineColorScheme } from "@mantine/core";

export interface HeaderProps {
  currentBoard?: Board;
  onAddTask: () => void;
  onEditBoard: () => void;
  onDeleteBoard: () => void;
}

const Header: React.FC<HeaderProps> = ({
  currentBoard,
  onAddTask,
  onEditBoard,
  onDeleteBoard,
}) => {
  const boardName = currentBoard?.name || "Select a Board";
  const hasColumns = currentBoard && currentBoard.id !== "0";

  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";

  // // In a real application, you'd likely get the theme here too
  // const isDark = false; // Placeholder
  const textColor = isDark ? 'text-white' : 'text-[#000112]';

  return (
    <div
      className={`flex justify-between items-center bg-[#FFFFFF] dark:bg-[#2B2C37] px-[32px] border-b border-[#E4EBFA] dark:border-[#979797] flex-1 h-[92px]`}
    >
      <div className="flex gap-[7px] w-[300px] flex-shrink-0 items-center h-full">
        <Image
          src={Logo}
          alt="Kanban Logo"
          width={25}
          height={25}
          className="flex-shrink-0"
        />
        <h1 className={`text-xl font-bold ${textColor} whitespace-nowrap`}>
          Kanban
        </h1>
      </div>
      <div className="flex flex-1 justify-between items-center border-l border-[#E4EBFA] dark:border-[#979797] pl-[32px] h-full w-full">
        <h3 className={`md:text-2xl text-[20px] font-bold ${textColor} truncate`}>
          {boardName}
        </h3>
        <div className="flex items-center gap-[15px]">
          <button
            className="bg-[#635FC7] text-[#FFFFFF] font-bold border-none cursor-pointer rounded-full text-sm p-[12px] hover:bg-[#A8A4FF] disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={onAddTask}
            disabled={!hasColumns}
          >
            + Add New Task
          </button>
          <Menu shadow="md" width={200} position="bottom-end">
            <Menu.Target>
              <button className="h-[18px] w-[18px] bg-transparent border-none cursor-pointer flex items-center justify-center">
                <Ellipsis color="#828FA3" width={48} height={18}/>
              </button>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item color="#828FA3" onClick={onEditBoard}>
                Edit Board
              </Menu.Item>

              <Menu.Item color="red" onClick={onDeleteBoard}>
                Delete Board
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </div>
      </div>
    </div>
  );
};

export default Header;
