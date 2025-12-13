import React from 'react';

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
  onSelect
}: BoardSectionProps) => {
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex items-center justify-between px-4'>
        <h2 className='text-sm font-semibold text-[#828FA3]'>{title}</h2>
        {count !== undefined && (
          <span className='text-xs font-medium text-[#828FA3]'>{count}</span>
        )}
      </div>
      <ul className='flex flex-col gap-1 pr-6'>
        {boards.map((board) => (
          <li
            key={board.id}
            className={`cursor-pointer rounded-r-full px-3 py-2 items-center flex gap-3 transition-colors duration-200${
              board.id === currentBoardId
                ? 'bg-[#635FC7] font-semibold text-white'
                : 'text-[#828FA3] hover:bg-[#A8A4FF] hover:text-[#635FC7]'
            }`}
            onClick={() => onSelect(board.id)}
          >
           <span className='w-4 h-4'>{board.icon}</span> <span className='font-semibold'>{board.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BoardSection;
