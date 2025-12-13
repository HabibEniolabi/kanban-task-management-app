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
        <div className={`flex items-center justify-between p-4 h-[97px] bg-white shadow-md`}>
            
            {/* Display Board Name */}
            <h1 className={`text-2xl font-bold text-[#000112]`}> 
                {boardName} 
            </h1>
            
            <div className='flex items-center gap-4'> 
                
                {/* Add New Task Button */}
                <button 
                    className='bg-[#635FC7] text-white font-bold cursor-pointer rounded-full h-[48px] px-6 text-sm hover:bg-[#A8A4FF] transition-colors duration-200'
                    // onClick={onAddTask}
                    disabled={!hasColumns}
                >
                    + Add New Task
                </button>
                
                {/* Ellipsis Menu */}
                <button 
                    className='h-[48px] w-[20px] flex items-center justify-center'
                    onClick={onOpenBoardMenu}
                >
                    <Ellipsis color='#828FA3' />
                </button>
            </div>
        </div>
    );
}

export default Header;