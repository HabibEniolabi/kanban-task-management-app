import React from "react";
import { Task } from "@/src/types/task";

export interface Board {
  id: string;
  name: string;
  icon: React.ReactNode;
  columns?: Array<{
    id: string;
    name: string;
    tasks: Task[];
  }>;
}

export interface BoardSectionProps {
  title: string;
  count: number;
  boards: Board[];
  currentBoardId?: string;
  onSelect: (boardId: string) => void;
}

const BoardSection = ({
  title,
  count,
  boards,
  currentBoardId,
  onSelect,
}: BoardSectionProps) => {
  return (
    <div className="flex flex-col gap-[5px]">
      <div className="flex items-center gap-[5px] whitespace-nowrap">
        <h4 className="text-sm font-bold text-[#828FA3] uppercase tracking-[2.4px] whitespace-nowrap">
          {title}
        </h4>
        {count !== undefined && (
          <span className="text-xs font-bold text-[#828FA3] whitespace-nowrap">({count})</span>
        )}
      </div>
      <div className="flex flex-col">
        {boards.map((board) => {
          const isActive = board.id === currentBoardId;

          return (
            <div
              key={board.id}
              onClick={() => onSelect(board.id)}
              className={`
                flex flex-col
                cursor-pointer
                transition-all duration-200
                rounded-r-full
                py-[8px]
                -ml-[33px]
                ${
                  isActive
                    ? "bg-[#635FC7] text-[#FFFFFF] border-l-4 border-l-[#635FC7] pl-[29px] pr-[24px]"
                    : "text-[#828FA3] hover:bg-[#EFEFF9] hover:text-[#635FC7] pl-[33px] pr-[24px]"
                }
              `}
            >
              <div
                className="
                  gap-[12px]
                  flex items-center
                  py-[3px]
                  whitespace-nowrap
                "
              >
                <span className="w-[16px] h-[16px] flex items-center justify-center flex-shrink-0">
                  {board.icon}
                </span>

                <span className="font-semibold text-[15px] whitespace-nowrap font-bold overflow-hidden text-ellipsis">{board.name}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BoardSection;
