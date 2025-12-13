import React from 'react';
import BoardSection, { Board } from './SidebarCommon/BoardSesction';
import Hide from '../assets/icon/hide';
import Sun from '../assets/icon/sun';
import Toggle from '../assets/icon/toggle';
import Moon from '../assets/icon/moon';
import BoardIcon from '../assets/icon/board';

export interface SidebarProps {
    boards: Board[]; 
    currentBoardId: string; 
    onSelectBoard: (boardId: string) => void; 
    onHideSidebar: () => void;
    onCreateBoard: () => void;
}

const Sidebar = ({boards, currentBoardId, onHideSidebar, onCreateBoard, onSelectBoard}:SidebarProps) => {
  return (
    <div className='flex flex-col justify-between bg-white w-[300px] p-7 shadow-md'>
      <div className='flex flex-col gap-8'>
        <div className='flex gao-2 items-centre'>
            <img src='/logo.svg' alt='Kanban Logo' width={25} height={25}/>
            <h1 className='text-xl font-bold text-[#000112]'>Kanban</h1>
        </div>
        <div>
            <BoardSection 
                title='ALL BOARDS' 
                boards={boards} 
                onSelect={onSelectBoard}
                count={boards.length} 
                currentBoardId={currentBoardId}
            />
        </div>
        <div className='flex items-centre gap-2 '>
            <li 
                className='cursor-pointer rounded-r-full px-6 py-2 flex items-center gap-3 transition-colors duration-200 text-[#635FC7] hover:bg-[#A8A4FF] hover:text-[#635FC7] font-semibold'
                onClick={onCreateBoard}
            >
                {/* <span className='w-4 h-4'>{CreateBoardIcon}</span>  */}
                <span className='w-4 h-4'><BoardIcon color="#635FC7"/></span> 
                <span>+ Create New Board</span>
            </li>
        </div>
      </div>
      <div className='flex flex-col gap-4'>
        <div className='flex items-centre gap-2 cursor-pointer bg-[#E4EBFA] px-2 py-4'>
            <Sun color='#828FA3' />
            <Toggle color='#635FC7'/>
            <Moon color='#828FA3' />
        </div>
        <div className='flex items-centre cursor-pointer gap-2 text-[#828FA3]'>
          <Hide color='#828FA3' /> <span>Hide Sidebar</span>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
