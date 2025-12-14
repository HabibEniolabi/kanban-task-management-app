// import React from 'react';
// import { mockBoards } from '../app/layout';
// import { useState } from 'react';
// import Ellipsis from '../assets/icon/ellipsis';

// const Header = () => {
//     const [selectBoardId, isSelectBoardId] = useState<string>('1');
//   return (
//     <div className='flex items-center justify-between p-4 h-[97px] bg-white'>
//         <h1 className='text-2xl font-bold text-[#000112]'> {mockBoards.find(board => board.id === selectBoardId)?.name} </h1>
//         <div className='flex items-centre gap-2'>
//             <h2 className='bg-[#635FC7] text-white font-bold cursor-pointer rounded-md p-3'>+ Add New Task</h2>
//             <Ellipsis color='#828FA3' />
//         </div>
//     </div>
//   );
// }

// export default Header;

"use client"
import React from 'react';
import { Board } from './SidebarCommon/BoardSesction'; 
import Ellipsis from '../assets/icon/ellipsis';
import Image from "next/image";

export interface HeaderProps {
    currentBoard?: Board; 
    onAddTask: () => void;
    onOpenBoardMenu: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
    currentBoard, 
    onAddTask, 
    onOpenBoardMenu 
}) => {
    const boardName = currentBoard?.name || 'Select a Board'; 
    const hasColumns = currentBoard && currentBoard.id !== '0';
    
    // // In a real application, you'd likely get the theme here too
    // const isDark = false; // Placeholder
    // const textColor = isDark ? 'text-white' : 'text-[#000112]';

    return (
       <div className={`flex items-center px-[16px] bg-[#FFFFFF] border-b border-[#E4EBFA] border-1px-solid flex-1 h-full`}>
        <div className='flex gap-2 items-center'>
          <Image src='/logo.png' alt='Kanban Logo' width={25} height={25}/>
          <h1 className='text-xl font-bold text-[#000112]'>Kanban</h1>
        </div>
        <div className='flex flex-1 justify-between items-center border-l border-[#E4EBFA] border-1px-solid pl-8'>
          <h3 className={`md:text-2xl text-[20px] font-bold text-[#000112]`}> 
            {boardName} 
          </h3>
          <div className='flex items-center gap-[15px]'> 
            <button 
              className='bg-[#635FC7] text-[#FFFFFF] font-bold border-none cursor-pointer rounded-full text-sm p-[12px] hover:bg-[#A8A4FF] disabled:opacity-50 disabled:cursor-not-allowed'
              onClick={onAddTask}
              disabled={!hasColumns}
            >
              + Add New Task
            </button>
            <button 
              className='h-[48px] bg-transparent w-[18px] border-none cursor-pointer flex items-center justify-center'
              onClick={onOpenBoardMenu}
            >
              <Ellipsis color='#828FA3' />
            </button>
          </div>
        </div>    
      </div>
    );
}

export default Header;