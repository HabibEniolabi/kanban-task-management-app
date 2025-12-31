"use client";
import React from "react";
import { Board } from "./SidebarCommon/BoardSesction";
import Ellipsis from "../assets/icon/ellipsis";
import Image from "next/image";
import Logo from "../assets/images/logo.png";
import { Menu, useMantineColorScheme } from "@mantine/core";
import Plus from "../assets/icon/Plus";

export interface HeaderProps {
  currentBoard?: Board;
  onAddTask: () => void;
  onEditBoard: () => void;
  onDeleteBoard: () => void;
  isSidebarVisible?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  currentBoard,
  onAddTask,
  onEditBoard,
  onDeleteBoard,
  isSidebarVisible = true,
}) => {
  const boardName = currentBoard?.name || "Select a Board";
  const hasColumns = currentBoard && currentBoard.id !== "0";

  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";
  const textColor = isDark ? "text-white" : "text-[#000112]";

  return (
    <header className="flex h-[92px] w-full bg-[#FFFFFF] dark:bg-[#2B2C37]">
      <div
        className={`flex items-center gap-[7px] px-[24px] h-full
      w-[260px] md:w-[300px]
      border-r border-[#E4EBFA] dark:border-[#979797]
      ${
        !isSidebarVisible
          ? "border-b border-[#E4EBFA] dark:border-[#979797]"
          : ""
      }
    `}
      >
        <Image src={Logo} alt="Kanban Logo" width={25} height={25} />
        <h1 className={`text-xl font-bold ${textColor}`}>Kanban</h1>
      </div>

      <div
        className={`flex flex-1 items-center justify-between h-full
          pr-[32px]
          border-b border-[#E4EBFA] dark:border-[#979797]
          ${isSidebarVisible ? "pl-[32px]" : "pl-[24px]"}
        `}
      >
        <h3 className={`md:text-2xl text-xl font-bold ${textColor} truncate`}>
          {boardName}
        </h3>

        <div className="flex items-center gap-[15px]">
          <button
            className="bg-[#635FC7] text-white font-bold rounded-full text-sm
              px-[14px] py-[10px] hover:bg-[#A8A4FF] cursor-pointer
              disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={onAddTask}
            disabled={!hasColumns}
          >
            <span className="block sm:hidden">
              <Plus color="#fff" width={12} height={12} />
            </span>

            <span className="hidden sm:block">+ Add New Task</span>
          </button>

          <Menu shadow="md" width={200} position="bottom-end">
            <Menu.Target>
              <button className="h-[18px] w-[18px] flex items-center justify-center">
                <Ellipsis color="#828FA3" width={48} height={18} />
              </button>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item onClick={onEditBoard}>Edit Board</Menu.Item>
              <Menu.Item color="red" onClick={onDeleteBoard}>
                Delete Board
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </div>
      </div>
    </header>
  );
};

export default Header;
