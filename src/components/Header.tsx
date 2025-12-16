"use client";
import React from "react";
import { Board } from "./SidebarCommon/BoardSesction";
import Ellipsis from "../assets/icon/ellipsis";
import Image from "next/image";
import Logo from "../assets/images/logo.png";
import { Menu } from "@mantine/core";

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

  // // In a real application, you'd likely get the theme here too
  // const isDark = false; // Placeholder
  // const textColor = isDark ? 'text-white' : 'text-[#000112]';

  return (
    <div
      className={`flex items-center bg-[#FFFFFF] border-b border-[#E4EBFA] flex-1 h-[92px] px-[33px]`}
    >
      <div className="flex gap-[7px] pr-[70px] flex-shrink-0 items-center h-full">
        <Image
          src={Logo}
          alt="Kanban Logo"
          width={25}
          height={25}
          className="flex-shrink-0"
        />
        <h1 className="text-xl font-bold text-[#000112] whitespace-nowrap">
          Kanban
        </h1>
      </div>
      <div className="flex flex-1 justify-between items-center border-l border-[#E4EBFA] pl-[23px] h-full min-w-0">
        <h3 className={`md:text-2xl text-[20px] font-bold text-[#000112]`}>
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
              <button className="h-[48px] w-[18px] bg-transparent border-none cursor-pointer flex items-center justify-center">
                <Ellipsis color="#828FA3" />
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
