import React from "react";

export interface Board {
  id: string;
  name: string;
  icon: React.ReactNode;
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
    <div className="flex flex-col gap-[5px] pr-[15px]">
      <div className="flex items-center gap-[5px] px-[24px]">
        <h4 className="text-sm font-bold text-[#828FA3] uppercase tracking-[2.4px]">
          {title}
        </h4>
        {count !== undefined && (
          <span className="text-xs font-bold text-[#828FA3]">({count})</span>
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
                 py-[8px] px-[24px]
                ${
                  isActive
                    ? "bg-[#635FC7] text-[#FFFFFF]"
                    : "text-[#828FA3] hover:bg-[#EFEFF9] hover:text-[#635FC7]"
                }
              `}
            >
              <div
                className="
                  gap-[12px]
                  flex items-center
                  py-[3px]
                "
              >
                <span className="w-[16px] h-[16px] flex items-center justify-center">
                  {board.icon}
                </span>

                <span className="font-semibold text-[15px]">{board.name}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BoardSection;
