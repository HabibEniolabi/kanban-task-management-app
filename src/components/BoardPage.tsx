"use client";
import { div } from "framer-motion/client";
import PageTaskBoard from "./PageTaskBoard";
import { Board } from "./SidebarCommon/BoardSesction";
import { useMantineColorScheme } from "@mantine/core";
import { getColumnColor } from "../types/colors";
import { Task } from "@/src/types/task";

interface BoardPageProps {
  board: Board;
  onOpenTask: (task: Task) => void;
}

const BoardPage = ({ board, onOpenTask }: BoardPageProps) => {
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <div className="flex gap-[12px] p-[24px]">
      {board.columns?.map((column) => (
        <div className="w-[280px]" key={column.id}>
          <div className="flex items-center gap-3 mb-[12px]">
            {/* Colored dot */}
            <span
              className="w-[15px] h-[15px] rounded-full"
              style={{ backgroundColor: getColumnColor(column.name) }}
            />

            {/* Column name + count */}
            <span className="text-[12px] font-bold tracking-[2.4px] text-[#828FA3] uppercase">
              {column.name} ({column.tasks.length})
            </span>
          </div>

          {column.tasks.map((task) => {
            return (
              <PageTaskBoard
                key={task.title}
                task={task}
                onClick={() => onOpenTask(task)}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default BoardPage;
