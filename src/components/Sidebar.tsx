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
      <div className='flex flex-col bg-white w-[300px] px-[33px] justify-between border-r border-[#E4EBFA] h-screen overflow-hidden'>
        <div>
            <BoardSection 
                title='all boards' 
                boards={boards} 
                onSelect={onSelectBoard}
                count={boards.length} 
                currentBoardId={currentBoardId}
            />
        
        <div className='flex items-center gap-2 whitespace-nowrap'>
            <h4 
                className='cursor-pointer flex items-center gap-[10px] text-[#635FC7] font-semibold whitespace-nowrap'
                onClick={() => {
                  console.log("Create Board clicked");
                  onCreateBoard();
                }}
            >
                {/* <span className='w-4 h-4'>{CreateBoardIcon}</span>  */}
                <BoardIcon color="#635FC7" width={16} height={16} />
                <span className='whitespace-nowrap'>+ Create New Board</span>
            </h4>
        </div>
      </div>
      <div className='flex flex-col gap-[14px] items-centre'>
        <div className='flex items-center justify-between cursor-pointer py-[8px] px-[44px] bg-[#F4F7FD] rounded-[6px]'>
          <div className='w-[19px] h-[19px]'>
            <Sun color='#828FA3' />
          </div>
          <div className='w-[40px] h-[20px]'>
            <Toggle primaryColor='#fff' secondaryColor='#635FC7'/>
          </div>
          <div className='w-[19px] h-[19px]'>
            <Moon color='#828FA3' />
          </div> 
        </div>
        <div className='flex items-center cursor-pointer gap-[6px] text-[#828FA3] px-[26px]' onClick={onHideSidebar}>
          <Hide color='#828FA3'  width={18} height={16}/> <h4>Hide Sidebar</h4>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
