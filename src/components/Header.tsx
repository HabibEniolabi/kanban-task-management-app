"use client";
import React, { useState } from "react";
import BoardSection, { Board } from "./SidebarCommon/BoardSesction";
import Ellipsis from "../assets/icon/ellipsis";
import Image from "next/image";
import Logo from "../assets/images/logo.png";
import { Menu, useMantineColorScheme } from "@mantine/core";
import Plus from "../assets/icon/Plus";
import Select from "../assets/icon/select";
import Sun from "../assets/icon/sun";
import Toggle from "../assets/icon/toggle";
import Moon from "../assets/icon/moon";
import BoardIcon from "../assets/icon/board";

export interface HeaderProps {
  boards: Board[];
  currentBoard?: Board;
  onAddTask: () => void;
  onEditBoard: () => void;
  onDeleteBoard: () => void;
  isSidebarVisible?: boolean;
  currentBoardId: string;
  onSelectBoard: (boardId: string) => void;
  onCreateBoard: () => void;
}

const Header: React.FC<HeaderProps> = ({
  currentBoard,
  onAddTask,
  onEditBoard,
  onDeleteBoard,
  currentBoardId,
  onSelectBoard,
  boards,
  onCreateBoard,
  isSidebarVisible = true,
}) => {
  const boardName = currentBoard?.name || "Select a Board";
  const hasColumns = currentBoard && currentBoard.id !== "0";

  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";
  const textColor = isDark ? "text-white" : "text-[#000112]";

  const [checked, setChecked] = useState(false);

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

  const [opened, setOpened] = useState(false);

  return (
    <header className="flex h-[92px] w-full bg-[#FFFFFF] dark:bg-[#2B2C37]">
      <div
        className={`flex items-center gap-[7px] px-[24px] h-full
      w-[260px] md:w-[300px] md:border-b-0 hidden md:flex
      md:border-r border-[#E4EBFA] dark:border-[#979797]
      ${
        !isSidebarVisible
          ? "border-b border-[#E4EBFA] dark:border-[#979797]"
          : ""
      }
    `}
      >
        <Image src={Logo} alt="Kanban Logo" width={25} height={25} />
        <h1 className={`text-xl font-bold hidden md:block ${textColor}`}>
          Kanban
        </h1>
      </div>

      <div
        className={`flex flex-1 items-center justify-between h-full
          pr-[32px]
          md:border-b border-[#E4EBFA] dark:border-[#979797]
          ${isSidebarVisible ? "pl-[32px]" : "pl-[24px]"}
        `}
      >
        <h3
          className={`md:text-2xl hidden md:block text-xl font-bold ${textColor} truncate`}
        >
          {boardName}
        </h3>

        <div className="flex items-center gap-[9px] md:hidden">
          <Image src={Logo} alt="Kanban Logo" width={24} height={24} />

          <Menu
            shadow="md"
            opened={opened}
            onOpen={() => setOpened(true)}
            onClose={() => setOpened(false)}
            width={159}
            position="bottom-start"
            styles={{
              dropdown: {
                width: 270,
                borderRadius: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                paddingTop: 8,
                paddingBottom: 8,
                gap: 15,
              },
              item: {
                backgroundColor: "transparent",
                "&[data-hovered]": {
                  backgroundColor: "transparent",
                },
                "&[data-active]": {
                  backgroundColor: "transparent",
                },
                "&:hover": {
                  backgroundColor: "transparent",
                },
                "&:active": {
                  backgroundColor: "transparent",
                },
                "&:focus-visible": {
                  backgroundColor: "transparent",
                },
              },
            }}
          >
            <Menu.Target>
              <button className="flex items-center gap-[10px] cursor-pointer">
                <span
                  className={`text-[18px] font-bold ${textColor} truncate max-w-[143px]`}
                >
                  {boardName}
                </span>

                <Select
                  color={"#635FC7"}
                  width={11}
                  height={7}
                  className={`
    transition-transform duration-200 ease-in-out
    ${opened ? "rotate-180" : "rotate-0"}
  `}
                />
              </button>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item>
                <div className="flex flex-col gap-[8px]">
                  <BoardSection
                    title="all boards"
                    boards={boards}
                    onSelect={onSelectBoard}
                    count={boards.length}
                    currentBoardId={currentBoardId}
                  />

                  <div className="flex items-center gap-[8px] whitespace-nowrap ml-[17px]">
                    <h4
                      className="cursor-pointer flex items-center gap-[10px] text-[#635FC7] font-semibold whitespace-nowrap"
                      onClick={() => {
                        onCreateBoard();
                      }}
                    >
                      <BoardIcon color="#635FC7" width={16} height={16} />
                      <span className="whitespace-nowrap font-bold">
                        + Create New Board
                      </span>
                    </h4>
                  </div>
                </div>
              </Menu.Item>
              <div
                className="flex items-center w-[235px] justify-between cursor-pointer  py-[14px] px-[44px] bg-[#F4F7FD] dark:bg-[#20212C] rounded-[6px]"
                onClick={toggleTheme}
              >
                <div className="w-[15px] h-[15px]">
                  <Sun color="#828FA3" />
                </div>
                <div className="w-[40px] h-[20px]">
                  <Toggle
                    checked={checked}
                    onToggle={() => setChecked((v) => !v)}
                  />
                </div>
                <div className="w-[15px] h-[15px]">
                  <Moon color="#828FA3" />
                </div>
              </div>
            </Menu.Dropdown>
          </Menu>
        </div>

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
